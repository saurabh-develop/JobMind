const GoogleButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="
        w-full flex items-center justify-center gap-3
        py-2.5 rounded-xl border border-white/10
        bg-white/5 hover:bg-white/10
        transition backdrop-blur
      "
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      <span className="text-sm font-medium">Continue with Google</span>
    </button>
  );
};

export default GoogleButton;
