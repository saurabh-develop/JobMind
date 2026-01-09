const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        w-[600px] h-[600px] bg-sky-400/20 blur-3xl rounded-full"
        />
      </div>

      <div
        className="w-full max-w-md bg-white/5 backdrop-blur-xl 
                      border border-white/10 rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center">{title}</h2>
        {subtitle && (
          <p className="text-slate-400 text-sm text-center mt-1">{subtitle}</p>
        )}

        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
};

export default AuthCard;
