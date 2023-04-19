import { User } from '../../../models/index.js';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import GraphQLUpload from 'express-graphql';
import jwt from 'jsonwebtoken';
import { transporter } from '../../../server/email-transporter.js';

const resolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    register: async (root, args, req, info) => {
      try {
        const { username, email, password } = args.input;

        if (!validator.isEmail(email)) {
          throw new Error('Invalid email.');
        }

        if (!validator.isLength(password, { min: 6 })) {
          throw new Error('Password must be atleast 6 characters long.');
        }

        const emailLC = email.toLowerCase();
        const existingUserByEmail = await User.findOne({
          email: emailLC
        });

        if (existingUserByEmail) {
          throw new Error('User with that email already exists.');
        }

        const existingUserByUsername = await User.findOne({
          username: { '$regex': `^${username}$`, $options: 'i' }
        });

        if (existingUserByUsername) {
          throw new Error('User with that username already exists.');
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
          username: username,
          email: emailLC,
          password: passwordHash,
          roles: ['user']
        });

        const createdUser = await user.save();

        jwt.sign(
          {
            userId: createdUser._id.toString()
          },
          process.env.EMAIL_SECRET,
          { expiresIn: '24h' },
          (_, emailToken) => {
            const confirmationUrl = `${process.env.PROJECT_BASE_URL}/auth/verify-email/${emailToken}`;
            transporter.sendMail({
              from: 'CookBook',
              to: emailLC,
              subject: 'Verify e-mail',
              html: `Please click the following link to verify your email:\n\n ${confirmationUrl}`
            });
          }
        );

        return { ...createdUser._doc, _id: createdUser._id.toString() };
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

export default resolvers;
