import crypto from "crypto";
import RefreshToken from "../models/refreshToken.model.js";
import { signAccessToken } from "../config/jwt.js";

const REFRESH_TOKEN_EXPIRY_DAYS = 15;

export const generateRefreshToken = async (user) => {
  const token = crypto.randomBytes(64).toString("hex");

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);

  await RefreshToken.create({
    userId: user._id,
    token,
    expiresAt,
  });

  return token;
};

export const rotateRefreshToken = async (oldToken, user) => {
  const existingToken = await RefreshToken.findOne({ token: oldToken });

  if (!existingToken || existingToken.isRevoked) {
    throw new Error("Invalid refresh token");
  }

  existingToken.isRevoked = true;

  const newToken = crypto.randomBytes(64).toString("hex");

  existingToken.replacedByToken = newToken;
  await existingToken.save();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);

  await RefreshToken.create({
    userId: user._id,
    tokenVersion: user.tokenVersion,
  });

  const accessToken = signAccessToken({
    userId: user._id,
    tokenVersion: user.tokenVersion,
  });

  return { accessToken, refreshToken: newToken };
};
