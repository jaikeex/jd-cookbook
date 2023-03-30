import { OAuth2Client } from 'google-auth-library';
import { User } from '../../../models/index.js';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import httpErrors from '../../errors/index.js';

export const googleLogin = async (req, res) => {
  const client = new OAuth2Client(
    '854100885684-3mio5lih0n2gjmir3f2p5i62q4j8p14g.apps.googleusercontent.com'
  );

  const ticket = await client.verifyIdToken({
    idToken: req.query.credential,
    audience:
      '854100885684-3mio5lih0n2gjmir3f2p5i62q4j8p14g.apps.googleusercontent.com',
  });
  const payload = ticket.getPayload();

  const existingUserByEmail = await User.findOne({ email: payload.email });

  console.log(existingUserByEmail);

  if (!existingUserByEmail) {
    const user = new User({
      username: payload.name,
      email: payload.email,
      roles: ['user'],
      created: moment().toISOString(),
      updated: moment().toISOString(),
    });

    const createdUser = await User.create(user);
    res.send({ ...createdUser._doc, _id: createdUser._id.toString() });
    return;
  }

  const token = jwt.sign(
    {
      userId: existingUserByEmail._id.toString(),
      userRoles: existingUserByEmail.roles,
    },
    'secret',
    { expiresIn: '1h' }
  );

  req.session.user = existingUserByEmail;

  res.send({ token, userId: existingUserByEmail._id.toString() });
};
