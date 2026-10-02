import { useState, useEffect } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { GameButton, IconButton, Panel } from "@/components/ui/GamePrimitives";

import usePuzzlesDifficulty from "@/hooks/usePuzzlesDifficulty";
import useGameAudio from "@/hooks/useGameAudio";

import type { Dispatch, SetStateAction } from "react";
import type { InternalDifficulty } from "@/types";

type ModalProps = {
  setIsDifficultyModalOpen: Dispatch<SetStateAction<boolean>>;
};

const options: InternalDifficulty[] = ["easy", "medium", "hard", "random"];

const DifficultySelectionModal: React.FC<ModalProps> = ({
  setIsDifficultyModalOpen,
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
      }`,
    );

    setCurrDiff(selectedDifficulty);
    setIsDifficultyModalOpen(false);
    updateDifficulty(selectedDifficulty);
  };

  return (
    <section
      aria-label="Select Game Difficulty"
      className="fixed inset-0 z-50 flex h-svh w-screen items-center justify-center bg-background p-4"
    >
      <IconButton
        aria-label="Close Game Difficulty Selection Modal"
        onClick={() => setIsDifficultyModalOpen(false)}
        className="fixed right-4 top-4"
      >
        <X />
      </IconButton>

      <Panel className="flex w-full max-w-md flex-col items-center p-6">
        <h2 className="mb-8 self-start text-xl">Select difficulty</h2>

        <div className="flex w-full flex-col items-center gap-3">
          {options.map((option) => (
            <GameButton
              key={option}
              variant={currDiff === option ? "selected" : "neutral"}
              className="w-full capitalize"
              onClick={() => {
                handleDifficultyUpdate(option);
                play("click");
              }}
            >
              {option}
            </GameButton>
          ))}
        </div>
      </Panel>
    </section>
  );
};

export default DifficultySelectionModal;
