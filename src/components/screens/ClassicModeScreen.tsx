import { PuzzlePiece, Star, Clock, Brain } from "@phosphor-icons/react";
import { Volume2, VolumeX } from "lucide-react";

import useSound from "@/hooks/useSound";
import useGameAudio from "@/hooks/useGameAudio";

const ClassicModeScreen = () => {
  const { isSoundOn, toggleSound } = useSound();
  const { play } = useGameAudio();

  return (
    <main className="w-full flex flex-col items-center gap-3 p-4">
      <div className="self-start w-full flex items-center justify-between -mt-4">
        <h2> 🕹️ Classic Mode </h2>

        <button
          onClick={() => {
            play("click");
            toggleSound();
          }}
          className="flex items-center justify-center gap-1"
        >
          sound:
          {isSoundOn ? (
            <Volume2 size={20} className="text-primary mt-0" />
          ) : (
            <VolumeX size={20} className="text-secondary mt-0" />
          )}
        </button>
      </div>

      <div className="w-full flex items-center justify-between rounded-lg bg-card p-4 shadow-sm">
        <div className="flex items-center gap-1">
          <PuzzlePiece size={20} weight="fill" />
          <span> 4 / 10 </span>
        </div>
        <div className="flex items-center gap-1">
          <Star size={20} weight="fill" />
          <span> 40 </span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={20} weight="fill" />
          <span> 00:45 </span>
        </div>
        <div className="flex items-center gap-1">
          <Brain size={20} weight="fill" />
          <span> Medium </span>
        </div>
      </div>

      <div></div>
    </main>
  );
};

export default ClassicModeScreen;
