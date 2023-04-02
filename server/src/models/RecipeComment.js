import mongoose from 'mongoose'

const RecipeCommentSchema = new mongoose.Schema(
  {
    recipe: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    text: String
  },
  { timestamps: true }
)

const RecipeComment = mongoose.model('RecipeComment', RecipeCommentSchema)

export default RecipeComment
