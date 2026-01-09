import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../../components/auth/AuthCard.jsx";
import GoogleButton from "../../components/auth/GoogleButton.jsx";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { loginApi } from "../../api/auth.api";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginApi(form);
      localStorage.setItem("accessToken", data.accessToken);
      setUser(data.user);
      navigate("/jobs");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <AuthCard title="Welcome back" subtitle="Log in to continue your journey">
      <GoogleButton />

      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-slate-700" />
        <span className="text-xs text-slate-400">OR</span>
        <div className="h-px flex-1 bg-slate-700" />
      </div>

      <form onSubmit={submit} className="space-y-4">
        <Input
          label="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button className="w-full">Login</Button>
      </form>
    </AuthCard>
  );
};

export default Login;
