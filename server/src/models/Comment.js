import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema(
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

const Comment = mongoose.model('Comment', CommentSchema)

export default Comment
