import { useState } from "react";
import SiteHeader from "./components/Header";
import SiteFooter from "./components/Footer";
import ModeSwitcher from "./components/ModeSwitcher";
import PracticePage from "./pages/PracticePage";
import QuizPage from "./pages/QuizPage";
import "./index.css";

function App() {
  const [mode, setMode] = useState("practice");
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      <div className="relative flex h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <SiteHeader />
          <ModeSwitcher mode={mode} onChange={setMode} />
          {mode === "quiz" ? <QuizPage /> : <PracticePage />}
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}

export default App;
