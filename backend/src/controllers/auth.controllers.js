import * as authService from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const result = await authService.register(res.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = async () => {
  try {
    const result = await authService.login(res.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
