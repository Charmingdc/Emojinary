import { Volume2, VolumeX, Lightbulb, SkipForward } from "lucide-react";
import ControlButton from "@/components/ui/ControlButton";
import useSound from "@/hooks/useSound";

const GameControls = () => {
  const { isSoundOn, toggleSound } = useSound();

  return (
    <div className="w-20 flex flex-col items-center justify-between gap-4">
      <ControlButton onClick={toggleSound}>
        {isSoundOn ? (
          <Volume2 size={24} className="text-primary" />
        ) : (
          <VolumeX size={24} className="text-secondary" />
        )}
      </ControlButton>

      <ControlButton>
        <Lightbulb size={24} className="text-accent" />
      </ControlButton>

      <ControlButton>
        <SkipForward size={24} className="text-primary" />
      </ControlButton>
    </div>
  );
};

export default GameControls;
