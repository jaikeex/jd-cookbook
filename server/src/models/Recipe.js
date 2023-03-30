import mongoose from 'mongoose'

const RecipeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      min: 3,
      max: 70
    },
    ingredients: [
      {
        name: {
          type: String,
          required: [true, 'Name is required'],
          max: 50
        },
        amount: String
      }
    ],
    description: String,
    instructions: String,
    picturePath: String,
    userAvatarPath: String,
    likesCount: Number,
    likes: [String],
    comments: [
      {
        userId: {
          type: String,
          required: true
        },
        text: String
      }
    ]
  },
  { timestamps: true }
)

const Recipe = mongoose.model('Recipe', RecipeSchema)

export default Recipe
