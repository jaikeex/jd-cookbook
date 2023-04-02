import { Recipe, User, RecipeComment } from '../../../models/index.js'
import { isAuthenticated, hasRole } from '../../auth/resolvers/index.js'
import { composeResolvers } from '@graphql-tools/resolvers-composition'
import httpErrors from '../../errors/index.js'

const resolvers = {
  Query: {
    getAllRecipes: async (root, args, req, info) => {
      const { userId } = args

      if (userId) {
        return await Recipe.find({ user: userId })
          .populate('user', '-password', User)
          .sort({ likesCount: -1, createdAt: -1 })
          .exec()
      }

      return await Recipe.find()
        .populate('user', '-password', User)
        .sort({ likesCount: -1, createdAt: -1 })
        .exec()
    },

    getComments: async (root, args, req, info) => {
      const { id } = args

      return await RecipeComment.find({ recipe: id })
        .populate('user', '-password', User)
        .exec()
    },

    getRecipesByIngredients: async (root, args, req, info) => {
      try {
        const { ingredients, matchAll } = args

        const recipes = await Recipe.find({
          'ingredients.name': matchAll
            ? { $all: ingredients }
            : { $in: ingredients }
        })
        return recipes
      } catch (error) {
        throw new httpErrors.E500(err.message)
      }
    },

    getRecipe: async (root, args, req, info) => {
      try {
        const { id } = args
        const { _id: userId } = req.session.user

        const recipe = await Recipe.findById(id)
          .populate('user', '-password', User)
          .exec()

        recipe.likedByUser = recipe.likes.includes(userId)
        return recipe
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
