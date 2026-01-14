import { useState } from "react";

import useSound from "@/hooks/useSound";

import NavButton from "@/components/ui/NavButton";
import DifficultySelectionModal from "@/components/DifficultySelectionModal";

interface Route {
  text: string;
  path: string;
}

const routes: Route[] = [
  { text: "Classic", path: "/play/classic" },
  { text: "Daily", path: "/play/daily" },
  { text: "How to Play", path: "/how-to-play" }
];

const WelcomeScreen = () => {
  const { isSoundOn, toggleSound } = useSound();
  const [isDifficultyModalOpen, setIsDifficultyModalOpen] =
    useState<boolean>(false);

  return (
    <main className="w-full flex flex-col items-center gap-4 mt-14">
      <h1
        className="inline-block text-center text-accent text-4xl
         [-webkit-text-stroke:2px_rgb(var(--foreground))]
         [text-shadow:4px_4px_8px_rgba(0,0,0,0.3)]
         -rotate-3"
      >
        Solve <br />
        Emoji <br />
        Puzzles!
      </h1>

      <div className="w-full flex flex-col items-center gap-8 mt-24">
        <div
          arial-label="Navigations"
          className="relative w-full flex items-center justify-center flex-wrap gap-x-3 gap-y-4 p-4 pt-8 border rounded-xl"
        >
          <span className="absolute -top-5 left-4 bg-background p-2 z-20">
            Navigations:
          </span>

          {routes.map(route => (
            <NavButton key={route.path} to={route.path}>
              {route.text}
            </NavButton>
          ))}
        </div>

        <div
          arial-label="Game Settings"
          className="relative w-full flex items-center justify-center flex-wrap gap-x-3 gap-y-4 p-4 pt-8 border rounded-xl"
        >
          <span className="absolute -top-5 left-4 bg-background p-2 z-20">
            Game Settings:
          </span>

          <NavButton onClick={() => setIsDifficultyModalOpen(prev => !prev)}>
            Difficulty
          </NavButton>

          <NavButton onClick={toggleSound}>
            sound: <strong>{isSoundOn ? "on" : "off"}</strong>
          </NavButton>
        </div>
      </div>

      {isDifficultyModalOpen && (
        <DifficultySelectionModal
          setIsDifficultyModalOpen={setIsDifficultyModalOpen}
        />
      )}
    </main>
  );
};

export default WelcomeScreen;
