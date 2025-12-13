import { useRef } from "react";
import useSound from "@/hooks/useSound";

type AudioType = "click" | "correct" | "wrong";

const useGameAudio = () => {
  const { isSoundOn } = useSound();

  const sounds = useRef<Record<AudioType, HTMLAudioElement>>({
    click: Object.assign(new Audio("/sounds/button-press.mp3"), {
      volume: 0.2
    }),
    correct: Object.assign(new Audio("/sounds/correct.mp3"), { volume: 0.7 }),
    wrong: Object.assign(new Audio("/sounds/wrong.mp3"), { volume: 0.6 })
  });

  const play = (type: AudioType) => {
    if (!isSoundOn) return;

    const audio = sounds.current[type];
    audio.currentTime = 0;

    audio.play().catch(() => {});
  };

  return { play };
};

export default useGameAudio;
