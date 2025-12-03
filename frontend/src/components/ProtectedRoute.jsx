import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { auth } = useContext(AuthContext);

  return auth.accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
