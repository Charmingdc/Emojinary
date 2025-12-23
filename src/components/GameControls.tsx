import type { Dispatch, SetStateAction } from "react";
import { Volume2, VolumeX, Lightbulb, SkipForward } from "lucide-react";
import ControlButton from "@/components/ui/ControlButton";
import useSound from "@/hooks/useSound";

interface GameControlsProps {
  showHint: boolean;
  setShowHint: Dispatch<SetStateAction<boolean>>;
  setUsedHint: Dispatch<SetStateAction<boolean>>;
  resetTimer: () => void;

  // Optional (Classic mode only)
  currentPuzzleIdx?: number;
  setCurrentPuzzleIdx?: Dispatch<SetStateAction<number>>;
  setPuzzleSkipCount?: Dispatch<SetStateAction<number>>;
  setGameCompleted?: Dispatch<SetStateAction<boolean>>;
  puzzleCount?: number;
}

const GameControls: React.FC<GameControlsProps> = ({
  showHint,
  setShowHint,
  setUsedHint,
  resetTimer,
  currentPuzzleIdx,
  setCurrentPuzzleIdx,
  setPuzzleSkipCount,
  setGameCompleted,
  puzzleCount
}) => {
  const { isSoundOn, toggleSound } = useSound();

  const isClassicMode =
    currentPuzzleIdx !== undefined &&
    puzzleCount !== undefined &&
    setCurrentPuzzleIdx &&
    setPuzzleSkipCount &&
    setGameCompleted;

  const isLast = isClassicMode && currentPuzzleIdx === puzzleCount - 1;

  const handleHintClick = () => {
    setUsedHint(true);
    setShowHint(prev => !prev);
  };

  const handleSkipClick = () => {
    if (!isClassicMode) return;

    if (isLast) {
      setGameCompleted(true);
      setPuzzleSkipCount(prev => prev + 1);
      return;
    }

    setCurrentPuzzleIdx(prev => prev + 1);
    setPuzzleSkipCount(prev => prev + 1);
    setShowHint(false);
    setUsedHint(false);
    resetTimer();
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
