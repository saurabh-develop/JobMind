import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyOtp from "../pages/auth/VerifyOtp";

import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";

import UploadResume from "../pages/resume/UploadResume";
import ResumeOptimizer from "../pages/resume/ResumeOptimizer";

import JobSearch from "../pages/jobs/JobSearch";
import JobDetails from "../pages/jobs/JobDetails";
import Recommendations from "../pages/jobs/Recommendations";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />

      {/* Protected */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume/upload"
        element={
          <ProtectedRoute>
            <UploadResume />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume/optimizer"
        element={
          <ProtectedRoute>
            <ResumeOptimizer />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs/search"
        element={
          <ProtectedRoute>
            <JobSearch />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs/recommendations"
        element={
          <ProtectedRoute>
            <Recommendations />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs/:jobId"
        element={
          <ProtectedRoute>
            <JobDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
