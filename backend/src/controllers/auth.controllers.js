import * as authService from "../services/auth.service.js";
import RefreshToken from "../models/refreshToken.model.js";
import User from "../models/user.model.js";
import { rotateRefreshToken } from "../services/token.service.js";
import { googleLogin } from "../services/auth.service.js";
import { getGoogleAuthURL } from "../services/googleOAuth.service.js";

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

    if (!tokenDoc || tokenDoc.isRevoked) {
      throw new Error("Invalid refresh token");
    }

    const user = await User.findById(tokenDoc.userId);

    const result = await rotateRefreshToken(refreshToken, user);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const googleAuth = (req, res) => {
  const url = getGoogleAuthURL();
  res.redirect(url);
};

export const googleCallback = async (req, res, next) => {
  try {
    const { code } = req.query;

    const { user, accessToken, refreshToken } = await googleLogin(code);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.FRONTEND_URL}/auth/success`);
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.logout(refreshToken);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const logoutAll = async (req, res, next) => {
  try {
    const result = await authService.logoutAll(req.user.userId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
