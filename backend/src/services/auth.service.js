import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import * as otpService from "./otp.service.js";
import { signAccessToken } from "../config/jwt.js";
import { generateRefreshToken } from "./token.service.js";
import RefreshToken from "../models/refreshToken.model.js";

export const register = async ({ email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({ email, password: hashedPassword });
  await otpService.sendOTP(user._id, email, "email_verification");
  return {
    message: "Registeration successful. OTP sent to email",
  };
};

export const verifyEmailOTP = async ({ email, otp }) => {
  await otpService.verifyOTP(email, otp);

  await User.updateOne({ email }, { isEmailVerified: true });

  return { message: "Email verified successfully" };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("invalid credentails");
  }

  if (!user.isEmailVerified) {
    throw new Error("Email not verified");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

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

export const logout = async (refreshToken) => {
  await RefreshToken.updateOne({ token: refreshToken }, { isRevoked: true });

  return { message: "Logged out succcessfully" };
};

export const logoutAll = async (userId) => {
  await User.updateOne({ _id: userId }, { $inc: { tokenVersion: 1 } });

  await RefreshToken.updateMany({ userId }, { isRevoked: true });

  return {
    message: "Logged out from all devices",
  };
};
