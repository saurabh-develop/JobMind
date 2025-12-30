import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Button from "./Button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/10">
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-sky-400/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold text-white">
          Job<span className="text-sky-400">Mind</span>
        </Link>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/profile"
                className="text-slate-300 hover:text-white transition"
              >
                Profile
              </Link>

              <Button variant="secondary" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-300 hover:text-white transition"
              >
                Login
              </Link>

              <Button
                onClick={(e) => {
                  navigate("/register");
                }}
                className="cursor-pointer"
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
