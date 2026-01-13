import { useState, useEffect } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";

import usePuzzlesDifficulty from "@/hooks/usePuzzlesDifficulty";
import useGameAudio from "@/hooks/useGameAudio";

import type { Dispatch, SetStateAction } from "react";
import type { InternalDifficulty } from "@/types";

type ModalProps = {
  setIsDifficultyModalOpen: Dispatch<SetStateAction<boolean>>;
};

const options: InternalDifficulty[] = ["easy", "medium", "hard", "random"];

const DifficultySelectionModal: React.FC<ModalProps> = ({
  setIsDifficultyModalOpen
}) => {
  const { play } = useGameAudio();
  const { difficulty, updateDifficulty } = usePuzzlesDifficulty();

  const [currDiff, setCurrDiff] = useState<InternalDifficulty | null>(null);

  useEffect(() => {
    setCurrDiff(difficulty);
  }, [difficulty]);

  const handleDifficultyUpdate = (selectedDifficulty: InternalDifficulty) => {
    toast.success(
      `Difficulty level updated successfully: ${
        selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)
      }`
    );

    setCurrDiff(selectedDifficulty);
    setIsDifficultyModalOpen(false);
    updateDifficulty(selectedDifficulty);
  };

  return (
    <section
      aria-label="Select Game Difficulty"
      className="fixed top-0 bottom-0 w-screen h-screen bg-white/10 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <button
        aria-label="Close Game Difficulty Selection Modal"
        onClick={() => setIsDifficultyModalOpen(false)}
        className="fixed top-10 right-10 self-end text-foreground"
      >
        <X />
      </button>

      <article className="w-[80%] flex flex-col items-center bg-background p-4 border border-border rounded-xl shadow-neumorphic">
        <h2 className="self-start text-xl mb-10"> Select Game Difficulty </h2>

        <div className="w-full flex flex-col items-center gap-3">
          {options.map(option => (
            <button
              key={option}
              className={`w-full p-4 capitalize border ${
                currDiff === option
                  ? "border-primary shadow-neumorphic-pressed"
                  : "border-border shadow-neumorphic"
              } rounded-lg transition-al duration-200 active:shadow-neumorphic-pressed hover:shadow-neumorphic-pressed`}
              onClick={() => {
                handleDifficultyUpdate(option);
                play("click");
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </article>
    </section>
  );
};

export default DifficultySelectionModal;
