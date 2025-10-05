const LetterDisplay = ({ letter = "A", size = "xl" }) => {
  const fontSize = size === "lg" ? "text-[8rem]" : size === "md" ? "text-[6rem]" : "text-[14rem]";
  return (
    <div className="glassmorphism-inner rounded-lg flex items-center justify-center">
      <span className={`${fontSize} font-bold text-gray-800 dark:text-gray-200 leading-none`}>{letter}</span>
    </div>
  );
};

export default LetterDisplay;



