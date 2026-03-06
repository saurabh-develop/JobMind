import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../../components/auth/AuthCard";
import GoogleButton from "../../components/auth/GoogleButton";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { loginApi } from "../../api/auth.api";
import { AuthContext } from "../../context/AuthContext";
import { setAccessToken } from "../../api/axiosClient";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginApi(form);

      setAccessToken(data.accessToken);
      setUser(data.user);

      navigate("/jobs");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <AuthCard title="Welcome back">
      <GoogleButton />

      <div className="my-6 text-center text-slate-400 text-xs">OR</div>

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
