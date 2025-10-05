import { useState, useMemo, useCallback } from "react";
import ArrowButton from "../components/ArrowButton";
import VideoFeed from "../components/VideoFeed";
import LetterDisplay from "../components/LetterDisplay";

const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

const QuizPage = () => {
  const [index, setIndex] = useState(0);
  const letter = useMemo(() => alphabet[index], [index]);

  const prev = useCallback(() => setIndex((i) => (i - 1 + alphabet.length) % alphabet.length), []);
  const next = useCallback(() => setIndex((i) => (i + 1) % alphabet.length), []);
  const skip = next;
  return (
    <main className="flex flex-1 justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Learn Sign Language</h1>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">Practice the signs or switch to 'Quiz' mode to test your knowledge.</p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="flex-1 grid grid-cols-2 gap-6 p-6 glassmorphism rounded-xl shadow-lg aspect-[16/9]">
            <div className="glassmorphism-inner rounded-lg overflow-hidden flex items-center justify-center">
              <VideoFeed />
            </div>
            <LetterDisplay letter={letter} size="lg" />
          </div>
          <div className="flex items-center gap-3">
            <ArrowButton direction="right" size="sm" disabled onClick={undefined} />
            <button onClick={skip} className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary">Skip</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default QuizPage;


