import User from "../models/User.js";
import Otp from "../models/Otp.js";
import { generateOtp } from "../utils/constants.js";
import { sendEmail } from "../utils/emailClient.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";

// SIGNUP
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  console.log(email, password, name);
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: "Email exists" });

  user = new User({ name, email, password });
  await user.save();
  console.log("Reached here");
  const code = generateOtp();
  await new Otp({
    userId: user._id,
    code,
    expiresAt: Date.now() + 5 * 60 * 1000,
  }).save();
  await sendEmail({ to: email, subject: "Your OTP", text: `OTP: ${code}` });
  console.log("Send mail");
  res.status(201).json({ userId: user._id });
};

// VERIFY OTP
export const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;
  const record = await Otp.findOne({ userId, code: otp });
  if (!record) return res.status(400).json({ message: "Invalid OTP" });
  if (record.expiresAt < Date.now())
    return res.status(400).json({ message: "OTP expired" });

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.isVerified = true;
  await user.save();
  await Otp.deleteMany({ userId });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.json({ user, accessToken, refreshToken });
};

// RESEND OTP
export const resendOtp = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const lastOtp = await Otp.findOne({ userId }).sort({ createdAt: -1 });
  if (
    lastOtp &&
    Date.now() - lastOtp.createdAt <
      (process.env.RESEND_OTP_COOLDOWN || 30) * 1000
  )
    return res
      .status(429)
      .json({ message: "Please wait before resending OTP" });

  const code = generateOtp();
  await new Otp({ userId, code, expiresAt: Date.now() + 5 * 60 * 1000 }).save();
  await sendEmail({
    to: user.email,
    subject: "Your OTP",
    text: `OTP: ${code}`,
  });

  res.json({ message: "OTP sent" });
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });
  if (!user.isVerified)
    return res.status(403).json({ message: "Email not verified" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.json({ user, accessToken, refreshToken });
};
