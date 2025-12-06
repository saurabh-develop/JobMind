import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import ProfileSetup from "../pages/ProfileSetup";
import Profile from "../pages/Profile";
import ResumeUpload from "../pages/ResumeUpload";
import Jobs from "../pages/Jobs";
import Tracker from "../pages/Tracker";
import Notifications from "../pages/Notifications";
import Settings from "../pages/Settings";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AuthProvider from "../context/AuthContext";
import OtpVerification from "../pages/OtpVerification";

const AppRouter = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/otp" element={<OtpVerification />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload-resume" element={<ResumeUpload />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRouter;
