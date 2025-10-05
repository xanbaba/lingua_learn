import { useState, useMemo, useCallback } from "react";
import VideoFeed from "../components/VideoFeed";
import ArrowButton from "../components/ArrowButton";
import LetterDisplay from "../components/LetterDisplay";

const ImagePanel = () => (
  <div className="h-1/2 glassmorphism-inner rounded-lg overflow-hidden">
    <img
      alt="Sign language for 'A'" height={"60%"}
      className="object-cover w-full h-full"
      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAL4J2Ur-1wVK32eHzQ6Te3BuwXmtT5_sUiksHa8NcTAEcL2wdxji_7SpawpWaph955uOV9qhSx6uOE7e70fMjC6zBh3CwRaJEeDTDFOuO_8Ft0kMB1bxD8FtY6WtTUwzZXsuNu_5G5F-Fppl7Tz8iT8Y7181J1dMYgUBrAaXvf7t0-3CtjZwoeOm9usR0w4qAhl2_18kr5k_d_caF6SGzci6OACegYUVEZ6DGk0woX1T5x4DpW0WfAdZPTBg-1vgPasDfGzuSx0Xc"
    />
  </div>
);

const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

const PracticePage = () => {
  const [index, setIndex] = useState(0);
  const letter = useMemo(() => alphabet[index], [index]);

  const prev = useCallback(() => setIndex((i) => (i - 1 + alphabet.length) % alphabet.length), []);
  const next = useCallback(() => setIndex((i) => (i + 1) % alphabet.length), []);

  return (
    <main className="flex flex-1 items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-center gap-8">
          <ArrowButton direction="left" onClick={prev} />
          <div className="flex-1 max-w-9xl grid grid-cols-1 md:grid-cols-2 gap-8 p-8 glassmorphism rounded-xl shadow-lg aspect-[16/9]">
            <div className="glassmorphism-inner rounded-lg overflow-hidden flex items-center justify-center">
              <VideoFeed />
            </div>
            <div className="flex flex-col gap-8">
              <ImagePanel />
              <LetterDisplay letter={letter} size="lg" />
            </div>
          </div>
          <ArrowButton direction="right" onClick={next} />
        </div>
      </div>
    </main>
  );
};

export default PracticePage;
