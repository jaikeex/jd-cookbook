import { Notification, Recipe, Comment, User } from '../../../models/index.js';
import httpErrors from '../../errors/index.js';
import { ObjectId } from 'mongodb';

const resolvers = {
  Mutation: {
    markNotificationAsSeen: async (root, args, req, info) => {
      try {
        const { id } = args;

        const notification = await Notification.findById(id);
        notification.seen = true;

        return await notification.save();
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

export default resolvers;
