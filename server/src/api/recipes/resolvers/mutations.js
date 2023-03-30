import { Recipe } from '../../../models/index.js'
import httpErrors from '../../errors/index.js'
import { ObjectId } from 'mongodb'

const resolvers = {
  Mutation: {
    createRecipe: async (root, args, req, info) => {
      try {
        const {
          userId,
          name,
          ingredients,
          description,
          instructions,
          picturePath,
          userAvatarPath
        } = args.input

        const recipe = new Recipe({
          userId,
          name,
          ingredients,
          description: description || '',
          instructions: instructions || '',
          picturePath: picturePath || '',
          userAvatarPath: userAvatarPath || '',
          likesCount: 0,
          likes: [],
          comments: []
        })

        const createdRecipe = await recipe.save()
        return createdRecipe
      } catch (error) {
        throw new httpErrors.E500(err.message)
      }
    },

    updateRecipe: async (root, args, req, info) => {
      try {
        const { id, userId, ...rest } = args.input

        const recipe = Recipe.findById(id)

        const updatedRecipe = { ...recipe, ...rest }

        await updatedRecipe.save()
        return updatedRecipe
      } catch (error) {
        throw new httpErrors.E500(err.message)
      }
    },

    deleteRecipe: async (root, args, req, info) => {
      try {
        const { id } = args
        await Recipe.findByIdAndDelete(id)
        return `Sucessfully deleted recipe with id=${id}`
      } catch (error) {
        throw new httpErrors.E500(err.message)
      }
    },

    likeRecipe: async (root, args, req, info) => {
      try {
        const { id, userId } = args
        const recipe = await Recipe.findById(id)
        const isLiked = recipe.likes.includes(userId)

        if (isLiked) {
          recipe.likesCount -= 1
          recipe.likes = recipe.likes.filter(id => id !== userId)
        } else {
          recipe.likesCount += 1
          recipe.likes.push(userId)
        }

        const updatedRecipe = await recipe.save()

        return updatedRecipe
      } catch (error) {
        throw new httpErrors.E500(error.message)
      }
    }
  }
}

export default resolvers
