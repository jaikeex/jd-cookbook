import { User } from '../../../models/index.js'
import httpErrors from '../../errors/index.js'
import { composeResolvers } from '@graphql-tools/resolvers-composition'
import { isAuthenticated, hasRole } from '../../auth/resolvers/index.js'

const resolvers = {
  Mutation: {
    deleteUser: async (root, args, req, info) => {
      const { id } = args
      return `Sucessfully deleted user with id=${id}`
    },

    updateUser: async (root, args, req, info) => {
      const { id, input } = args

      const user = await User.findById(id)

      if (!user) {
        throw new httpErrors.E400('User does not exist')
      }

      user.email = input?.email || user.email
      user.username = input?.username || user.username
      user.roles = input?.roles || user.roles

      const updatedUser = await user.save()

      return updatedUser
    }
  }
}

const resolversComposition = {
  'Mutation.deleteUser': [isAuthenticated(), hasRole('admin')],
  'Mutation.updateUser': [isAuthenticated(), hasRole('admin')]
}

const composedResolvers = composeResolvers(resolvers, resolversComposition)

export default composedResolvers
