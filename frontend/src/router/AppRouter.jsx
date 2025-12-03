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

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

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
  );
};

export default AppRouter;
