import { OAuth2Client } from 'google-auth-library'
import { User } from '../../../models/index.js'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import httpErrors from '../../errors/index.js'
import { getGoogleOauthToken, getGoogleUser } from '../utils/google-utils.js'

export const googleLogin = async (req, res) => {
  const code = req.query.code
  const pathUrl = req.query.state || '/'

  if (!code) {
    throw new httpErrors.E401('Authorization code not provided!')
  }

  const { id_token, access_token } = await getGoogleOauthToken({ code })

  const { name, verified_email, email, picture } = await getGoogleUser({
    id_token,
    access_token
  })

  if (!verified_email) {
    throw new httpErrors.E403('Google account not verified')
  }

  let userByEmail = await User.findOne({ email })

  if (!userByEmail) {
    const user = new User({
      username: name,
      email: email,
      roles: ['user']
    })

    userByEmail = await User.create(user)
  }

  const token = jwt.sign(
    {
      userId: userByEmail._id.toString(),
      userRoles: userByEmail.roles
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )

  req.session.user = userByEmail

  res.send({ token, userId: userByEmail._id.toString() })
}
