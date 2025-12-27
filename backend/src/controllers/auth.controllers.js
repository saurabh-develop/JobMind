import * as authService from "../services/auth.service.js";
import RefreshToken from "../models/refreshToken.model.js";
import User from "../models/user.model.js";
import { rotateRefreshToken } from "../services/token.service.js";

export const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const result = await authService.verifyEmailOTP(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const tokenDoc = await RefreshToken.findOne({ token: refreshToken });

    if (!tokenDoc) {
      throw new Error("Invalid refresh token");
    }

    const user = await User.findById(tokenDoc.userId);

    const result = await rotateRefreshToken(refreshToken, user);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
