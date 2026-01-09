import { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const OAuthSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      localStorage.setItem("accessToken", token);
      navigate("/jobs");
    }
  }, []);

  return null;
};

export default OAuthSuccess;
