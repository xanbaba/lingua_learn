const ArrowButton = ({ direction = "left", size = "lg", disabled = false, onClick }) => {
  const isLeft = direction === "left";
  const sizeClass = size === "sm" ? "size-12" : "size-16";
  const icon = isLeft ? "arrow_back_ios_new" : "arrow_forward_ios";
  return (
    <button
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={`flex items-center justify-center ${sizeClass} rounded-full glassmorphism shadow-lg transition-colors ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-white/40 dark:hover:bg-slate-700/50"
      }`}
      aria-disabled={disabled}
      aria-label={isLeft ? "Previous letter" : "Next letter"}
    >
      <span className="material-symbols-outlined text-gray-700 dark:text-gray-200" style={{ fontSize: size === "sm" ? 24 : 36 }}>
        {icon}
      </span>
    </button>
  );
};

export default ArrowButton;


