import crypto from "crypto";
import RefreshToken from "../models/refreshToken.model.js";
import { signAccessToken } from "../config/jwt.js";

const REFRESH_TOKEN_EXPIRY_DAYS = 15;

export const generateRefreshToken = async (user) => {
  const refreshToken = crypto.randomBytes(64).toString("hex");

  const expiresAt = new Date(
    Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000
  );

  await RefreshToken.create({
    userId: user._id,
    token: refreshToken,
    expiresAt,
  });

  const accessToken = signAccessToken({ userId: user._id });

  return { accessToken, refreshToken };
};

export const rotateRefreshToken = async (oldToken, user) => {
  const existingToken = await RefreshToken.findOne({ token: oldToken });

  if (!existingToken || existingToken.isRevoked) {
    throw new Error("Invalid refresh token");
  }

  existingToken.isRevoked = true;

  const newRefreshToken = crypto.randomBytes(64).toString("hex");
  existingToken.replacedByToken = newRefreshToken;

  await existingToken.save();

  const expiresAt = new Date(
    Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000
  );

  await RefreshToken.create({
    userId: user._id,
    token: newRefreshToken,
    expiresAt,
  });

  const accessToken = signAccessToken({ userId: user._id });

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};
