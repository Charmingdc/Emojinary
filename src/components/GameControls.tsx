import type { Dispatch, SetStateAction } from "react";
import { Volume2, VolumeX, Lightbulb, SkipForward } from "lucide-react";
import ControlButton from "@/components/ui/ControlButton";
import useSound from "@/hooks/useSound";

interface GameControlsProps {
  showHint: boolean;
  setShowHint: Dispatch<SetStateAction<boolean>>;
  setUsedHint: Dispatch<SetStateAction<boolean>>;
  currentPuzzleIdx: number;
  setCurrentPuzzleIdx: Dispatch<SetStateAction<number>>;
  setPuzzleSkipCount: Dispatch<SetStateAction<number>>;
  setGameCompleted: Dispatch<SetStateAction<boolean>>;
  puzzleCount: number;
  resetTimer: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  showHint,
  setShowHint,
  setUsedHint,
  currentPuzzleIdx,
  setCurrentPuzzleIdx,
  setPuzzleSkipCount,
  setGameCompleted,
  puzzleCount,
  resetTimer
}) => {
  const { isSoundOn, toggleSound } = useSound();
  const isLast = currentPuzzleIdx === puzzleCount - 1;

  const handleHintClick = () => {
    setUsedHint(true);
    setShowHint(prev => !prev);
  };

  const handleSkipClick = () => {
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

  const buttons = [
    {
      onClick: toggleSound,
      icon: isSoundOn ? (
        <Volume2 size={24} className="text-primary" />
      ) : (
        <VolumeX size={24} className="text-secondary" />
      )
    },
    {
      onClick: handleHintClick,
      icon: (
        <Lightbulb
          size={24}
          className={`${showHint ? "text-accent" : "text-primary"}`}
        />
      )
    },
    {
      onClick: handleSkipClick,
      icon: (
        <SkipForward
          size={24}
          className={`${
            isLast ? "text-secondary" : "text-primary active:text-accent"
          }`}
        />
      )
    }
  ];

  return (
    <div className="w-20 flex flex-col items-center justify-between gap-4">
      {buttons.map(({ onClick, icon }, idx) => (
        <ControlButton key={idx} onClick={onClick}>
          {icon}
        </ControlButton>
      ))}
    </div>
  );
};

export default GameControls;
