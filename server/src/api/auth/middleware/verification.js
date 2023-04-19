import jwt from 'jsonwebtoken';
import { User } from '../../../models/index.js';

export const verifyEmail = async (req, res, next) => {
  try {
    const { userId } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    await User.findByIdAndUpdate(userId, { confirmed: true }, { new: true });

    return res.redirect(`${process.env.CORS_ORIGIN}/auth/login?redirect=true`);
  } catch (error) {
    throw new Error(error.message);
  }
};
