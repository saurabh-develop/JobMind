import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import AuthCard from "../../components/auth/AuthCard";
import GoogleButton from "../../components/auth/GoogleButton";
import Button from "../../components/common/Button";
import { registerApi } from "../../api/auth.api";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerApi(form);
      navigate("/verify-otp", { state: { email: form.email } });
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start your AI-powered job journey"
    >
      <GoogleButton />

      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-slate-700" />
        <span className="text-xs text-slate-400">OR</span>
        <div className="h-px flex-1 bg-slate-700" />
      </div>

      <form onSubmit={submit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <Input
          label="Password"
          type="password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button className="w-full">Register</Button>
      </form>
    </AuthCard>
  );
};

export default Register;
