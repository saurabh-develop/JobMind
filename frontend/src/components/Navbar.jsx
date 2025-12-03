import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full py-4 px-6 md:px-12 lg:px-20 flex justify-between items-center bg-transparent">
      <Link to="/" className="text-2xl font-bold text-indigo-600">
        JobMind
      </Link>

      <div className="flex items-center gap-6 text-slate-700 font-medium">
        <Link to="/jobs" className="hover:text-indigo-600">
          Jobs
        </Link>
        <Link to="/tracker" className="hover:text-indigo-600">
          Tracker
        </Link>

        {user ? (
          <>
            <Link to="/profile" className="hover:text-indigo-600">
              Profile
            </Link>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-indigo-600">
              Login
            </Link>

            <Link
              to="/registration"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
