import type { Dispatch, SetStateAction } from "react";

import { Volume2, VolumeX, Lightbulb, SkipForward } from "lucide-react";
import ControlButton from "@/components/ui/ControlButton";

import useSound from "@/hooks/useSound";

interface GameControlProps {
  showHint: boolean;
  setShowHint: Dispatch<SetStateAction<boolean>>;
  currentPuzzleIdx: number;
  setCurrentPuzzleIdx: Dispatch<SetStateAction<number>>;
  puzzleCount: number;
  resetTimer: () => void;
}

const GameControls: React.FC<GameControlProps> = ({
  showHint,
  setShowHint,
  currentPuzzleIdx,
  setCurrentPuzzleIdx,
  puzzleCount,
  resetTimer
}) => {
  const { isSoundOn, toggleSound } = useSound();
  const isLast = currentPuzzleIdx + 1 === puzzleCount;

  return (
    <div className="w-20 flex flex-col items-center justify-between gap-4">
      <ControlButton onClick={toggleSound}>
        {isSoundOn ? (
          <Volume2 size={24} className="text-primary" />
        ) : (
          <VolumeX size={24} className="text-secondary" />
        )}
      </ControlButton>

      <ControlButton onClick={() => setShowHint(prev => !prev)}>
        <Lightbulb
          size={24}
          className={`${showHint ? "text-accent" : "text-primary"}`}
        />
      </ControlButton>

      <ControlButton
        disabled={isLast}
        onClick={() => {
          setShowHint(false);
          setCurrentPuzzleIdx(prev => prev + 1);
          resetTimer();
        }}
      >
        <SkipForward
          size={24}
          className={`${
            isLast ? "text-accent" : "text-primary active:text-accent"
          }`}
        />
      </ControlButton>
    </div>
  );
};

export default GameControls;
