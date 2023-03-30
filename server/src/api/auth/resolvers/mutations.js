import { User } from '../../../models/index.js'
import bcrypt from 'bcryptjs'
import validator from 'validator'
import httpErrors from '../../errors/index.js'

const resolvers = {
  Mutation: {
    register: async (root, args, req, info) => {
      try {
        const { username, email, password, avatar } = args

        if (!validator.isEmail(email)) {
          throw new httpErrors.E400('Invalid email.')
        }

        if (!validator.isLength(password, { min: 6 })) {
          throw new httpErrors.E400(
            'Password must be atleast 6 characters long.'
          )
        }

        const emailLC = email.toLowerCase()
        const existingUserByEmail = await User.findOne({
          email: emailLC
        })
        if (existingUserByEmail) {
          throw new httpErrors.E400('User with that email already exists.')
        }

        const existingUserByUsername = await User.findOne({
          username: { '$regex': `^${username}$`, $options: 'i' }
        })
        if (existingUserByUsername) {
          throw new httpErrors.E400('User with that username already exists.')
        }

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User({
          username: username,
          email: emailLC,
          password: passwordHash,
          roles: ['user']
        })

        const createdUser = await user.save()
        return { ...createdUser._doc, _id: createdUser._id.toString() }
      } catch (error) {
        throw new httpErrors.E500(err.message)
      }
    }
  }
}

export default resolvers
