import { Recipe, User, Comment } from '../../../models/index.js'
import { isAuthenticated, hasRole } from '../../auth/resolvers/index.js'
import { composeResolvers } from '@graphql-tools/resolvers-composition'
import httpErrors from '../../errors/index.js'
import { Types } from 'mongoose'

function decodeCursor(cursor) {
  const decoded = Buffer.from(cursor, 'base64').toString('ascii')
  const [type, createdAt] = decoded.split(':')
  if (type !== 'Recipe') {
    throw new Error('Invalid cursor type')
  }
  return { type, createdAt }
}

function encodeCursor(type, createdAt) {
  const cursor = `${type}:${createdAt}`
  return Buffer.from(cursor, 'ascii').toString('base64')
}

const resolvers = {
  Query: {
    getRecipes: async (root, args, req, info) => {
      const {
        query,
        userId,
        ingredients,
        matchAll,
        difficulty,
        first = 12,
        after
      } = args
      console.log(args)

      const pipeline = [
        { $addFields: { user: { '$toObjectId': '$user' } } },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
          }
        },
        { $unwind: '$user' }
      ]

      if (after) {
        const { createdAt } = decodeCursor(after)
        pipeline.unshift({
          $match: { createdAt: { $lt: new Date(parseInt(createdAt)) } }
        })
      }

      if (userId) {
        pipeline.unshift({ $match: { user: userId } })
      }

      if (ingredients && ingredients.length > 0) {
        pipeline.unshift({
          $match: {
            'ingredients.name': matchAll
              ? { $all: ingredients }
              : { $in: ingredients }
          }
        })
      }

      if (difficulty) {
        pipeline.unshift({ $match: { difficulty: difficulty } })
      }

      if (query) {
        pipeline.unshift({ $match: { $text: { $search: query } } })
      }

      let sort = { createdAt: -1 }

      const recipes = await Recipe.aggregate(pipeline)
        .sort(sort)
        .limit(first)
        .exec()

      const edges = recipes.map(recipe => ({
        node: recipe,
        cursor: encodeCursor('Recipe', recipe.createdAt.getTime().toString())
      }))

      const pageInfo = {
        hasNextPage: recipes.length === first,
        endCursor: edges[edges.length - 1]?.cursor || null
      }

      return {
        edges,
        pageInfo
      }
    },

    getComments: async (root, args, req, info) => {
      const { id } = args

      return await Comment.find({ recipe: id })
        .populate('user', '-password', User)
        .exec()
    },

    getAllIngredients: async (root, args, req, info) => {
      try {
        const pipeline = [
          { $unwind: '$ingredients' },
          { $group: { _id: '$ingredients.name' } },
          { $sort: { _id: 1 } }
        ]

        const ingredients = await Recipe.aggregate(pipeline)
        return ingredients.map(ingredient => ({ name: ingredient._id }))
      } catch (error) {
        throw new httpErrors.E500(error.message)
      }
    },

    getRecipe: async (root, args, req, info) => {
      try {
        const { id } = args

        const recipe = await Recipe.findById(id)
          .populate('user', '-password', User)
          .exec()

        if (req.session.user) {
          const { _id: userId } = req.session.user
          recipe.likedByUser = recipe.likes.includes(userId)
        }

        return recipe
      } catch (error) {
        throw new httpErrors.E500(error.message)
      }
    },

    searchRecipes: async (root, args, req, info) => {
      try {
        const { userId, query, first = 12, after } = args

        const filter = { $text: { $search: query } }

        const pipeline = [
          { $match: { $text: { $search: query } } },
          { $addFields: { score: { $meta: 'textScore' } } },
          { $addFields: { user: { '$toObjectId': '$user' } } },
          {
            $lookup: {
              from: 'users',
              localField: 'user',
              foreignField: '_id',
              as: 'user'
            }
          },
          { $unwind: '$user' }
        ]

        let sort = { score: { $meta: 'textScore' } }

        if (userId) {
          pipeline.push({ $match: { 'user._id': Types.ObjectId(userId) } })
        }

        if (after) {
          const { score } = decodeCursor(after)
          pipeline.push({
            $match: { createdAt: { $lt: score } }
          })
        }

        if (after) {
          const { score } = decodeCursor(after)
          filter.score = { $lt: score }
        }

        const recipes = await Recipe.aggregate(pipeline)
          .sort(sort)
          .skip(after ? decodeCursor(after).index : 0)
          .limit(first)
          .exec()

        const edges = recipes.map(recipe => ({
          node: recipe,
          cursor: encodeCursor('Recipe', recipe.score.toString())
        }))

        const pageInfo = {
          hasNextPage: recipes.length === first,
          endCursor: edges[edges.length - 1]?.cursor || null
        }

        return {
          edges,
          pageInfo
        }
      } catch (error) {
        throw new httpErrors.E500(error.message)
      }
    }
  }
}

const resolversComposition = {
  'Query.getAllRecipes': [isAuthenticated()]
}

const composedResolvers = composeResolvers(resolvers, resolversComposition)

export default composedResolvers
