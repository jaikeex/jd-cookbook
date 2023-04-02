import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import csrf from 'csurf'
import {
  auth,
  createSession,
  manageSessions
} from '../api/auth/middleware/auth-middleware.js'
import schema from '../api/index.js'
import { googleLogin } from '../api/auth/middleware/google-oauth-middleware.js'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'

export const initServer = () => {
  const app = express()
  //const csrfProtection = csrf();

  /* SERVER CONFIGURATION */
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
  app.use(morgan('common'))
  app.use(bodyParser.json({ limit: '30mb', extended: true }))
  app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
  app.use(
    cors({
      origin: 'http://localhost:3000',
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['set-cookie'],
      credentials: true
    })
  )

  //TODO: implement after frontend is ready
  //app.use(csrfProtection);
  app.post('/google-login', googleLogin)
  app.use(createSession())
  app.use(manageSessions())
  app.use(auth)

  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 500000000 }),
    graphqlHTTP({
      schema: schema,
      graphiql: true,
      customFormatErrorFn(err) {
        if (!err.originalError) {
          return err
        }
        const data = err.originalError.data
        const message = err.message || 'An unexpected error occurred.'
        const status = err.originalError.code || 500
        return { message, status, data }
      }
    })
  )

  return app
}
