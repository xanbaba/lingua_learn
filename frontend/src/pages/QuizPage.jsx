import { useState, useMemo, useCallback } from "react";
import ArrowButton from "../components/ArrowButton";
import VideoFeed from "../components/VideoFeed";
import LetterDisplay from "../components/LetterDisplay";

const alphabet = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);

const QuizPage = () => {
  const [index, setIndex] = useState(0);
  const letter = useMemo(() => alphabet[index], [index]);
  const [showCheck, setShowCheck] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handlePrediction = useCallback(
    ({ letter: predicted, probability }) => {
      if (!predicted) return;
      // Basic confidence gate to avoid flicker; adjust as needed
      if (predicted.toUpperCase() === letter && probability > 0.5) {
        setShowCheck(true);
        setCorrect(true);
        setTimeout(() => setShowCheck(false), 800);
      }
    },
    [letter]
  );

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % alphabet.length);
    setCorrect(false);
  }, []);
  const skip = next;
  return (
    <main className="flex flex-1 justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            Learn Sign Language
          </h1>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            Practice the signs or switch to 'Quiz' mode to test your knowledge.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 grid grid-cols-2 gap-6 p-6 glassmorphism rounded-xl shadow-lg aspect-[16/9]">
            <div className="glassmorphism-inner rounded-lg overflow-hidden flex items-center justify-center relative">
              <VideoFeed onPrediction={handlePrediction} />
              {showCheck && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-green-500/80 flex items-center justify-center shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      className="w-12 h-12"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <LetterDisplay letter={letter} size="lg" />
          </div>
          <div className="flex items-center gap-3">
            <ArrowButton
              direction="right"
              size="sm"
              disabled={!correct}
              onClick={next}
            />
            <button
              onClick={skip}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default QuizPage;
