import { Recipe, User } from '../../../models/index.js'
import { isAuthenticated, hasRole } from '../../auth/resolvers/index.js'
import { composeResolvers } from '@graphql-tools/resolvers-composition'

const resolvers = {
  Query: {
    getAllRecipes: async (root, args, req, info) => {
      console.log(req.session)

      return await Recipe.find().populate('user', '-password', User).exec()
    },

    getRecipesByAuthor: (root, args, req, info) => {
      try {
        const { userId } = args
        return Recipe.find({ userId: userId })
      } catch (error) {
        throw new httpErrors.E500(err.message)
      }
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

    getRecipe: (root, args, req, info) => {
      try {
        const { id } = args
        return Recipe.findById(id)
      } catch (error) {
        throw new httpErrors.E500(err.message)
      }
    }
  }
}

const resolversComposition = {
  'Query.getAllRecipes': [isAuthenticated()]
}

const composedResolvers = composeResolvers(resolvers, resolversComposition)

export default composedResolvers
