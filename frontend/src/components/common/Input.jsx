const Input = ({ label, error, className = "", ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-slate-300">
          {label}
        </label>
      )}

      <input
        className={`
    w-full rounded-xl px-4 py-2.5
    bg-white/5 dark:bg-slate-900/40
    backdrop-blur-xl
    border border-white/10
    text-white placeholder-slate-400
    focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:shadow-glow
    ${error ? "border-red-500" : ""}
    ${className}
  `}
        {...props}
      />

      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default Input;
