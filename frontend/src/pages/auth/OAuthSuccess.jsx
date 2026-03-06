import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { refreshApi, getMeApi } from "../../api/auth.api";
import { setAccessToken } from "../../api/axiosClient";
import { AuthContext } from "../../context/AuthContext";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await refreshApi();
        setAccessToken(data.accessToken);

        const me = await getMeApi();
        setUser(me.data.user);

        navigate("/jobs");
      } catch {
        navigate("/login");
      }
    };

    init();
  }, []);

  return <div className="text-white text-center mt-20">Signing you in...</div>;
};

export default OAuthSuccess;
