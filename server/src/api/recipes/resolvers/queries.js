import { Recipe } from '../../../models/index.js'

const resolvers = {
  Query: {
    getAllRecipes: (root, args, req, info) => {
      return Recipe.find()
    },

    getRecipesByAuthor: (root, args, req, info) => {
      try {
        const { userId } = args
        return Recipe.find({ userId: userId })
      } catch (error) {
        throw new httpErrors.E500(err.message)
      }
    },

    // getRecipesByIngredients: (root, args, req, info) => {
    //   try {
    //     const { ingredients } = args

    //     return Recipe.find({ ingredients: {name: } })
    //   } catch (error) {
    //     throw new httpErrors.E500(err.message)
    //   }
    // },

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

export default resolvers
