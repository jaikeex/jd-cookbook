import httpErrors from '../../errors/index.js';
import { User } from '../../../models/index.js';
import { composeResolvers } from '@graphql-tools/resolvers-composition';
import { isAuthenticated, hasRole } from '../../auth/resolvers/index.js';

const resolvers = {
  Query: {
    getUserById: (root, args, req, info) => {
      const { id } = args;
      return User.findById(id);
    },

    getUserByEmail: (root, args, req, info) => {
      const { email } = args;
      return User.findOne({ email });
    },

    getUserByUsername: (root, args, req, info) => {
      const { username } = args;
      return User.findOne({
        username: { '$regex': `^${username}$`, $options: 'i' }
      });
    },

    getAllUsers: (root, args, req, info) => {
      return User.find();
    },

    filterUsers: (root, args, req, info) => {
      return User.find(args.filter);
    }
  }
};

const resolversComposition = {
  'Query.getAllUsers': [isAuthenticated(), hasRole('admin')]
};

const composedResolvers = composeResolvers(resolvers, resolversComposition);

export default composedResolvers;
