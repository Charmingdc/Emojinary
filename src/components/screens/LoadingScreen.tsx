import { useEffect, useRef, useState } from "react";

const steps = [
  "Generating puzzles…",
  "Preparing a clever hint…",
  "Shuffling the letters…",
  "Setting the timer…",
  "Almost ready — hang tight...",
];

const tips = [
  "Focus on what the emojis describe, not the emojis themselves.",
  "Think in phrases, not single letters.",
  "If letters feel wrong, rethink the emoji meaning.",
  "Daily puzzles often use common expressions.",
  "Saying the answer out loud can help.",
  "Simplify the emoji meaning when stuck.",
  "Short words often hide inside longer ones.",
  "Hints help — but they reduce your score.",
  "Rearranging letters mentally can unlock patterns.",
  "Difficulty affects time, not intelligence 😄",
  "Play daily mode for a new game everyday",
];

const LoadingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);

  const stepTimeoutRef = useRef<number | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    const advanceStep = (index: number) => {
      if (!isMountedRef.current) return;

      if (index < steps.length - 1) {
        stepTimeoutRef.current = window.setTimeout(() => {
          if (!isMountedRef.current) return;
          setCurrentStep(index + 1);
          advanceStep(index + 1);
        }, 1800);
      } else {
        stepTimeoutRef.current = null;
      }
    };

    advanceStep(0);

    return () => {
      isMountedRef.current = false;
      if (stepTimeoutRef.current) {
        clearTimeout(stepTimeoutRef.current);
        stepTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const tipTimer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 2500);

    return () => clearInterval(tipTimer);
  }, []);

  return (
    <div className="w-full h-screen fixed top-0 flex flex-col items-center justify-center px-6 text-center z-50">
      <div className="flex flex-col items-center gap-5 -mt-24">
        <div className="flex items-center gap-2" aria-hidden="true">
          {["E", "M", "…"].map((letter, index) => (
            <span
              key={letter}
              className={`flex h-12 w-12 items-center justify-center rounded-[10px] border-[3px] border-outline bg-tile-face text-xl font-bold text-tile-ink shadow-[0_4px_0_rgb(var(--tile-edge))] ${index === 1 ? "-translate-y-2" : ""}`}
            >
              {letter}
            </span>
          ))}
        </div>

        <div className="h-10 flex items-center justify-center text-lg opacity-90 mt-2">
          {steps[currentStep]}
        </div>

        <div className="absolute bottom-[5rem] max-w-md text-xs leading-relaxed text-center opacity-80 px-4">
          <strong className="text-primary-ink">💡 Tip:</strong>{" "}
          {tips[currentTip]}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
