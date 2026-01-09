import axios from "axios";
import qs from "qs";
import User from "../models/user.model.js";
import { generateRefreshToken } from "./token.service.js";
import RefreshToken from "../models/refreshToken.model.js";

const GOOGLE_OAUTH_BASE = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo";

export const getGoogleAuthURL = () => {
  const params = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    access_type: "offline",
    prompt: "consent",
  };

  return `${GOOGLE_OAUTH_BASE}?${qs.stringify(params)}`;
};

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
    }
  );

  return response.data;
};

export const getGoogleUserProfile = async (accessToken) => {
  const response = await axios.get(GOOGLE_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const googleLogin = async (code) => {
  const tokenData = await exchangeCodeForTokens(code);

  const googleUser = await getGoogleUserProfile(tokenData.access_token);

  if (!googleUser.email) {
    throw new Error("Google account email not found");
  }

  let user = await User.findOne({ email: googleUser.email });

  if (!user) {
    user = await User.create({
      email: googleUser.email,
      name: googleUser.name,
      avatar: googleUser.picture,
      authProvider: "google",
      isEmailVerified: true,
    });
  }

  const { accessToken, refreshToken } = await generateRefreshToken(user);

  return {
    user,
    accessToken,
    refreshToken,
  };
};
