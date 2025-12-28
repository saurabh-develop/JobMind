import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"JobMind" <${(process, env.EMAIL_USER)}`,
    to: email,
    subject: "Verify your email",
    html: `
        <h2>Email Verification</h2>
        <p>You OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
    `,
  });
};
