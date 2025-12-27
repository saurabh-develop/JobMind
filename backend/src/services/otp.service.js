import OTP from "../models/otp.model.js";
import { getRedis } from "../config/redis.js";
import { generateOTP } from "../utils/otp.js";
import { sendOTPEmail } from "../utils/email.js";

const OTP_TTL = 300;

export const sendOTP = async (userId, email, purpose) => {
  const redis = getRedis();
  const otp = generateOTP();

  await redis.set(`otp:${email}`, otp, { EX: OTP_TTL });
  await OTP.create({
    userId,
    email,
    otp,
    purpose,
    expiresAt: new Date(Date.now() + OTP_TTL * 1000),
  });
  await sendOTPEmail(email, otp);
};

export const verifyOTP = async (email, inputOtp) => {
  const redis = getRedis();
  const storedOtp = await redis.get(`otp:${email}`);

  if (!storedOtp || storedOtp != inputOtp) {
    throw new Error("Invalid or expired OTP");
  }

  await redis.del(`otp${email}`);
};
