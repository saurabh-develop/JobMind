const baseStyles =
  "inline-flex items-center justify-center font-semibold rounded-lg transition focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  primary:
    "bg-sky-400/90 text-slate-950 hover:bg-sky-300 shadow-glow hover:shadow-glowSoft",
  secondary:
    "border border-sky-400/40 text-sky-400 hover:bg-sky-400/10 backdrop-blur-md",
  glass:
    "bg-white/10 dark:bg-slate-800/30 backdrop-blur-xl border border-white/10 text-white hover:bg-white/20",
  danger: "bg-red-500 text-white hover:bg-red-400",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
