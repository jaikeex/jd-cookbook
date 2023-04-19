import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OAuth2 = google.auth.OAuth2;

dotenv.config({
  path: join(__dirname, `../../env/.env`)
});

const oauth2Client = new OAuth2(
  process.env.GOOGLE_OAUTH_CLIENT_ID,
  process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  process.env.GOOGLE_OAUTH_REDIRECT_URL
);

oauth2Client.credentials = {
  refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN
};

const access_token = await oauth2Client.getAccessToken();

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    type: 'OAuth2',
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
    accessToken: access_token.token,
    user: process.env.EMAIL_USER
  }
});
