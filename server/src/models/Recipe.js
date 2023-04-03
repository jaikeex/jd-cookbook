import mongoose from 'mongoose'

const RecipeSchema = new mongoose.Schema(
  {
    user: {
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
    cookingTime: Number,
    difficulty: String,
    description: String,
    instructions: String,
    picturePath: String,
    likesCount: Number,
    likes: [String]
  },
  { timestamps: true }
)

RecipeSchema.index({
  name: 'text',
  'ingredients.name': 'text'
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

export default Recipe
