import { Notification, Recipe, Comment, User } from '../../../models/index.js'
import httpErrors from '../../errors/index.js'
import { isAuthenticated } from '../../auth/resolvers/index.js'
import { composeResolvers } from '@graphql-tools/resolvers-composition'

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
        const { id, input } = args
        const { _id: userId } = req.session.user

        const recipe = await Recipe.findById(id)

        if (userId !== recipe.user) {
          throw new httpErrors.E401('Only the recipe author can update it')
        }

        await Recipe.findByIdAndUpdate(id, input)
        const updatedRecipe = await Recipe.findById(id)

        return updatedRecipe
      } catch (error) {
        throw new httpErrors.E500(error.message)
      }
    },

    deleteRecipe: async (root, args, req, info) => {
      try {
        const { id } = args
        const { _id: userId } = req.session.user

        const recipe = await Recipe.findById(id)

        if (userId !== recipe.user) {
          throw new httpErrors.E401('Only the recipe author can delete it')
        }

        await Recipe.findByIdAndDelete(id)
        return `Sucessfully deleted recipe with id=${id}`
      } catch (error) {
        throw new httpErrors.E500(error.message)
      }
    },

    commentRecipe: async (root, args, req, info) => {
      try {
        const { id, text } = args.input
        const { _id: userId, username } = req.session.user
        const commentedRecipe = await Recipe.findById(id)

        const comment = new Comment({
          text,
          recipe: id,
          user: userId
        })
        await comment.save()

        if (commentedRecipe.user !== userId) {
          const notification = new Notification({
            recipe: id,
            user: commentedRecipe.user,
            text: `${username} left a comment on your ${commentedRecipe.name} recipe!`
          })
          await notification.save()
        }

        return await Comment.find({ comment: id })
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

const resolversComposition = {
  'Mutation.createRecipe': [isAuthenticated()],
  'Mutation.updateRecipe': [isAuthenticated()],
  'Mutation.deleteRecipe': [isAuthenticated()],
  'Mutation.likeRecipe': [isAuthenticated()],
  'Mutation.commentRecipe': [isAuthenticated()]
}

const composedResolvers = composeResolvers(resolvers, resolversComposition)

export default composedResolvers
