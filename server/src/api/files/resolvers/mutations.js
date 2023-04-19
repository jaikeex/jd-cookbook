import { gcBucket } from '../../../server/gc-storage.js';
import { isAuthenticated } from '../../auth/resolvers/index.js';
import { composeResolvers } from '@graphql-tools/resolvers-composition';

const resolvers = {
  Mutation: {
    uploadFile: async (root, args, req, info) => {
      const { createReadStream, filename } = await args.file.file;

      await new Promise((res) =>
        createReadStream()
          .pipe(
            gcBucket.file(filename).createWriteStream({
              resumable: false,
              gzip: true
            })
          )
          .on('finish', res)
      );

      const imageUrl = `https://storage.googleapis.com/jd-cookbook-images/${filename}`;

      return imageUrl;
    }
  }
};

const resolversComposition = {
  'Mutation.uploadFile': [isAuthenticated()]
};

const composedResolvers = composeResolvers(resolvers, resolversComposition);

export default composedResolvers;
