import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Name is required'],
      min: 3,
      max: 50
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true
    },
    password: {
      type: String,
      required: true,
      min: 6
    },
    roles: [String],
    avatar: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', UserSchema)

export default User
