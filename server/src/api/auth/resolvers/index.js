import httpErrors from '../../errors/index.js';
import authQueries from './queries.js';
import authMutations from './mutations.js';

export const isAuthenticated = () => (next) => (root, args, req, info) => {
  if (req.isAuthenticated || req.session?.user) {
    return next(root, args, req, info);
  }
  throw new httpErrors.E401();
};

export const hasRole = (role) => (next) => (root, args, req, info) => {
  if (req.session?.user.roles.includes(role)) {
    return next(root, args, req, info);
  }
  throw new httpErrors.E401();
};

export const idMatches = (user) => (next) => (root, args, req, info) => {
  if (req.session?.user._id === user?._id) {
    return next(root, args, req, info);
  }
  throw new httpErrors.E401();
};

const resolvers = { ...authQueries, ...authMutations };

export default resolvers;
