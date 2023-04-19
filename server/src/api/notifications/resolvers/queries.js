import { Notification } from '../../../models/index.js';
import { isAuthenticated, hasRole } from '../../auth/resolvers/index.js';
import { composeResolvers } from '@graphql-tools/resolvers-composition';
import httpErrors from '../../errors/index.js';

const resolvers = {
  Query: {
    getNotifications: async (root, args, req, info) => {
      try {
        const { _id: userId } = req.session.user;

        return await Notification.find({ user: userId }).sort({
          seen: 1,
          createdAt: -1
        });
      } catch (error) {
        throw new httpErrors.E500(error.message);
      }
    }
  }
};

const resolversComposition = {
  'Query.getNotifications': [isAuthenticated()]
};

const composedResolvers = composeResolvers(resolvers, resolversComposition);

export default composedResolvers;
