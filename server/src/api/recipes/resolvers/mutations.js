import { Recipe, RecipeComment, User } from '../../../models/index.js'
import httpErrors from '../../errors/index.js'
import { ObjectId } from 'mongodb'

const resolvers = {
  Mutation: {
    createRecipe: async (root, args, req, info) => {
      try {
        const {
          name,
          ingredients,
          description,
          instructions,
          picturePath,
          cookingTime,
          difficulty
        } = args.input

        const user = req.session.user

        const recipe = new Recipe({
          name,
          ingredients,
          difficulty,
          cookingTime,
          user: user._id,
          description: description || '',
          instructions: instructions || '',
          picturePath: picturePath || '',
          likesCount: 0,
          likes: [],
          comments: []
        })

        const createdRecipe = await recipe.save()
        return createdRecipe
      } catch (error) {
        throw new httpErrors.E500(error.message)
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

    commentRecipe: async (root, args, req, info) => {
      try {
        const { id, text } = args.input
        const { _id: userId } = req.session.user

        const comment = new RecipeComment({
          text,
          recipe: id,
          user: userId
        })

        await comment.save()

        return await RecipeComment.find({ comment: id })
          .populate('user', '-password', User)
          .exec()
      } catch (error) {
        throw new httpErrors.E500(error.message)
      }
    },

    likeRecipe: async (root, args, req, info) => {
      try {
        const { id } = args
        const { _id: userId } = req.session.user
        const recipe = await Recipe.findById(id)
        const isLiked = recipe.likes.includes(userId)

        if (isLiked) {
          recipe.likesCount -= 1
          recipe.likes = recipe.likes.filter(
            id => id.toString() !== userId.toString()
          )
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
