import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import authApi from "../api/authApi";

export default function OtpVerification({ userId }) {
  const { loginWithTokens } = useAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(60); // 60 sec cooldown for resend

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await authApi.verifyOtp({ userId, otp });
      loginWithTokens(
        res.data.user,
        res.data.accessToken,
        res.data.refreshToken
      );
      navigate("/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return; // prevent spamming
    try {
      await authApi.resendOtp(userId);
      setCooldown(60); // reset cooldown
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-50 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-200/30 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-slate-300/30 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />

      <div className="relative z-10 w-full max-w-md p-10 bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_8px_40px_rgb(0,0,0,0.04)] rounded-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-600 tracking-tight mb-2">
            Verification
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            We sent a secure code to your email.
            <br />
            Please enter it below.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="123456"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full pl-12 pr-5 py-4 rounded-xl border border-slate-200 bg-white/50 text-slate-900 placeholder-slate-300 font-bold text-2xl tracking-[0.25em] text-center focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 shadow-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-4 rounded-xl font-bold text-lg shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {loading ? "Verifying..." : "Confirm & Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleResend}
            disabled={cooldown > 0}
            className={`text-sm font-medium transition-colors ${
              cooldown > 0
                ? "text-slate-400"
                : "text-indigo-600 hover:text-indigo-700"
            }`}
          >
            {cooldown > 0
              ? `Resend OTP in ${cooldown}s`
              : "Didn't receive code? Resend"}
          </button>
        </div>
      </div>
    </div>
  );
}
