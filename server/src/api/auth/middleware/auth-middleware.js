import jwt from 'jsonwebtoken'
import { User } from '../../../models/index.js'
import MongoDBStore from 'connect-mongodb-session'
import session from 'express-session'

const setFailed = (req, next) => {
  req.isAuthenticated = false
  return next()
}

export const auth = (req, res, next) => {
  try {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
      return setFailed(req, next)
    }

    const token = authHeader.split(' ')[1]
    const decodeToken = jwt.verify(token, process.env.JWT_TOKEN)
    if (!decodeToken) {
      return setFailed(req, next)
    }

    req.isAuthenticated = true
    req.userId = decodeToken.userId
    req.userRoles = decodeToken.userRoles

    return next()
  } catch (err) {
    return setFailed(req, next)
  }
}

export const createSession = () => {
  return session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 86400000
    }
  })
}

const createSessionStore = () => {
  const storeConstructor = new MongoDBStore(session)
  const store = storeConstructor({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
  })

  return store
}

export const manageSessions = () => {
  return async (req, res, next) => {
    if (req.session?.user) {
      const user = await User.findById(req.session?.user?._id)
      req.session.user = user
    }
    next()
  }
}
