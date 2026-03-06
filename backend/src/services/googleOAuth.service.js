import axios from "axios";
import qs from "qs";
import { OAuth2Client } from "google-auth-library";

const GOOGLE_OAUTH_BASE = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// STEP 1: Redirect URL
export const getGoogleAuthURL = () => {
  const params = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: ["openid", "email", "profile"].join(" "),
    access_type: "offline",
    prompt: "consent",
  };

  return `${GOOGLE_OAUTH_BASE}?${qs.stringify(params)}`;
};

// STEP 2: Exchange code for tokens
export const exchangeCodeForTokens = async (code) => {
  const response = await axios.post(
    GOOGLE_TOKEN_URL,
    qs.stringify({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
      code,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );

  return response.data;
};

// STEP 3: VERIFY ID TOKEN (MOST IMPORTANT)
export const googleLogin = async (code) => {
  const tokenData = await exchangeCodeForTokens(code);

  if (!tokenData.id_token) {
    throw new Error("Google ID token missing");
  }

  const ticket = await client.verifyIdToken({
    idToken: tokenData.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  return {
    email: payload.email,
    googleId: payload.sub, // ⭐ THE REAL USER ID
    name: payload.name,
    avatar: payload.picture,
    emailVerified: payload.email_verified,
  };
};
