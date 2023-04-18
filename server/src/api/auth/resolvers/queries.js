import { User } from '../../../models/index.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import httpErrors from '../../errors/index.js'

const resolvers = {
  Query: {
    login: async (root, args, req, info) => {
      try {
        const { email, password } = args
        const user = await User.findOne({ email })

        if (!user) {
          throw new httpErrors.E401('User not found.')
        }

        const passwordsMatch = await bcrypt.compare(password, user.password)
        if (!passwordsMatch) {
          throw new httpErrors.E401('Password is incorrect')
        }

        const token = jwt.sign(
          {
            userId: user._id.toString(),
            userRoles: user.roles
          },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        )

        req.session.user = user

        return { token, user }
      } catch (error) {
        throw new httpErrors.E500(error.message)
      }
    },

    logout: (root, args, req, info) => {
      req.session.destroy()

      return 'You have been logged out.'
    }
  }
}

export default resolvers
