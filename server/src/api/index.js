import userSchema from './users/index.js'
import authSchema from './auth/index.js'
import recipeSchema from './recipes/index.js'
import { mergeSchemas } from '@graphql-tools/schema'

const schema = mergeSchemas({
  schemas: [userSchema, authSchema, recipeSchema]
})

export default schema
