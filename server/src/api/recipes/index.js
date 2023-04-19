import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { loadSchema } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import resolvers from './resolvers/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const schema = await loadSchema(join(__dirname, './type-defs/Recipe.gql'), {
  loaders: [new GraphQLFileLoader()]
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers
});

export default schemaWithResolvers;
