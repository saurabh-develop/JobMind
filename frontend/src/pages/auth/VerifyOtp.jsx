import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { verifyOtpApi } from "../../api/auth.api";

const VerifyOtp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      verifyOtpApi({ email: state.email, otp });
      navigate("/login");
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Verify Email</h2>

        <Input
          label="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <Button className="w-full mt-6">Verify</Button>
      </form>
    </div>
  );
};

export default VerifyOtp;
