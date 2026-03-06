import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { verifyOtpApi } from "../../api/auth.api";

const VerifyOtp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (!state?.email) navigate("/register");
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await verifyOtpApi({ email: state.email, otp });
      navigate("/login");
    } catch {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form onSubmit={submit} className="p-8 bg-white/5 rounded-2xl">
        <h2 className="text-white mb-4 text-center">Verify Email</h2>

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
