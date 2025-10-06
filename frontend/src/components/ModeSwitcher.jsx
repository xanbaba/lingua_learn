const ModeSwitcher = ({ mode, onChange }) => {
  return (
    <div className="max-w-md mx-auto mb-8">
      <div className="flex h-14 flex-1 items-center justify-center rounded-lg p-1 glassmorphism shadow-inner">
        <label className="flex cursor-pointer h-full flex-1 items-center justify-center rounded-lg px-4 text-lg font-medium transition-colors duration-200 has-[:checked]:bg-primary has-[:checked]:text-white text-gray-700 dark:text-gray-300 has-[:checked]:dark:text-white has-[:checked]:shadow-lg">
          <span className="truncate">Practice</span>
          <input
            className="invisible w-0"
            name="mode"
            type="radio"
            value="practice"
            checked={mode === "practice"}
            onChange={() => onChange && onChange("practice")}
          />
        </label>
        <label className="flex cursor-pointer h-full flex-1 items-center justify-center rounded-lg px-4 text-lg font-medium transition-colors duration-200 has-[:checked]:bg-primary has-[:checked]:text-white text-gray-700 dark:text-gray-300 has-[:checked]:dark:text-white has-[:checked]:shadow-lg">
          <span className="truncate">Quiz</span>
          <input
            className="invisible w-0"
            name="mode"
            type="radio"
            value="quiz"
            checked={mode === "quiz"}
            onChange={() => onChange && onChange("quiz")}
          />
        </label>
      </div>
    </div>
  );
};

export default ModeSwitcher;




