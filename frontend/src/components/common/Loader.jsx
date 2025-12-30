const Loader = ({ size = 32 }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="animate-spin rounded-full border-4 border-slate-700 border-t-sky-400"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default Loader;
