import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import * as otpService from "./otp.service.js";
import { signAccessToken } from "../config/jwt.js";
import { generateRefreshToken } from "./token.service.js";
import RefreshToken from "../models/refreshToken.model.js";
import * as googleOAuthService from "./googleOAuth.service.js";

export const register = async ({ email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  await otpService.sendOTP(user._id, email, "email_verification");

  return {
    message: "Registration successful. OTP sent to email",
  };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Invalid credentials");

  if (!user.password) {
    throw new Error("Please login using Google");
  }

  if (!user.isEmailVerified) {
    throw new Error("Email not verified");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const accessToken = signAccessToken({
    userId: user._id,
    tokenVersion: user.tokenVersion,
  });

  const refreshToken = await generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      email: user.email,
    },
  };
};

export const googleLogin = async (code) => {
  const googleData = await googleOAuthService.googleLogin(code);

  const { email, googleId, name, avatar } = googleData;

  let user = await User.findOne({ email });

  // CASE 1 — user doesn't exist
  if (!user) {
    user = await User.create({
      email,
      isEmailVerified: true,
      oauthProviders: [
        {
          provider: "google",
          providerId: googleId,
        },
      ],
    });
  } else {
    // CASE 2 — user exists but google not linked
    const alreadyLinked = user.oauthProviders.find(
      (p) => p.provider === "google",
    );

    if (!alreadyLinked) {
      user.oauthProviders.push({
        provider: "google",
        providerId: googleId,
      });

      user.isEmailVerified = true;
      await user.save();
    }
  }

  const accessToken = signAccessToken({
    userId: user._id,
    tokenVersion: user.tokenVersion,
  });

  const refreshToken = await generateRefreshToken(user);

  return { user, accessToken, refreshToken };
};

export const verifyEmailOTP = async ({ email, otp }) => {
  await otpService.verifyOTP(email, otp);

  await User.updateOne({ email }, { isEmailVerified: true });

  return { message: "Email verified successfully" };
};

export const logout = async (refreshToken) => {
  await RefreshToken.updateOne({ token: refreshToken }, { isRevoked: true });

  return { message: "Logged out successfully" };
};

export const logoutAll = async (userId) => {
  await User.updateOne({ _id: userId }, { $inc: { tokenVersion: 1 } });

  await RefreshToken.updateMany({ userId }, { isRevoked: true });

  return { message: "Logged out from all devices" };
};
