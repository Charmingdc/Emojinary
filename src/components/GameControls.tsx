import { Volume2, VolumeX, Lightbulb, SkipForward } from "lucide-react";
import ControlButton from "@/components/ui/ControlButton";
import useSound from "@/hooks/useSound";

import type { Dispatch, SetStateAction } from "react";
import type { GamePuzzle } from "@/types";

interface GameControlsProps {
  showHint: boolean;
  setShowHint: Dispatch<SetStateAction<boolean>>;
  setUsedHint: Dispatch<SetStateAction<boolean>>;
  resetTimer: () => void;

  // Optional (Classic mode only)
  currentPuzzleIdx?: number;
  setCurrentPuzzleIdx?: Dispatch<SetStateAction<number>>;
  setPuzzles?: Dispatch<SetStateAction<GamePuzzle[]>>;
  setGameCompleted?: Dispatch<SetStateAction<boolean>>;
  puzzleCount?: number;
}

const GameControls: React.FC<GameControlsProps> = ({
  showHint,
  setShowHint,
  setUsedHint,
  resetTimer,
  currentPuzzleIdx,
  setPuzzles,
  setCurrentPuzzleIdx,
  setGameCompleted,
  puzzleCount
}) => {
  const { isSoundOn, toggleSound } = useSound();

  const isClassicMode =
    currentPuzzleIdx !== undefined &&
    puzzleCount !== undefined &&
    setCurrentPuzzleIdx !== undefined &&
    setPuzzles !== undefined &&
    setGameCompleted !== undefined;

  const isLast = isClassicMode && currentPuzzleIdx === puzzleCount - 1;

  const handleHintClick = () => {
    setUsedHint(true);

    if (isClassicMode) {
      setPuzzles(prev =>
        prev.map((p, idx) =>
          idx === currentPuzzleIdx && !p.hintUsed ? { ...p, hintUsed: true } : p
        )
      );
    }

    setShowHint(prev => !prev);
  };

  const handleSkipClick = () => {
    if (!isClassicMode) return;

    setPuzzles(prev =>
      prev.map((p, idx) =>
        idx === currentPuzzleIdx ? { ...p, puzzleState: "skipped" } : p
      )
    );

    setShowHint(false);
    setUsedHint(false);
    resetTimer();

    if (isLast) {
      setGameCompleted(true);
      return;
    }

    setCurrentPuzzleIdx(prev => prev + 1);
  };

  return (
    <div className="w-20 flex flex-col items-center justify-between gap-4">
      {/* Sound */}
      <ControlButton onClick={toggleSound}>
        {isSoundOn ? (
          <Volume2 size={24} className="text-primary" />
        ) : (
          <VolumeX size={24} className="text-secondary" />
        )}
      </ControlButton>

      {/* Hint */}
      <ControlButton onClick={handleHintClick}>
        <Lightbulb
          size={24}
          className={showHint ? "text-accent" : "text-primary"}
        />
      </ControlButton>

      {/* Skip (Classic only) */}
      {isClassicMode && (
        <ControlButton onClick={handleSkipClick}>
          <SkipForward
            size={24}
            className={
              isLast ? "text-secondary" : "text-primary active:text-accent"
            }
          />
        </ControlButton>
      )}
    </div>
  );
};

export default GameControls;
