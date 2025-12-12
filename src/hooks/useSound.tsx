import { useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

const useSound = () => {
  const soundStorage = useLocalStorage("sound");

  const [isSoundOn, setIsSoundOn] = useState<boolean>(() => {
    return soundStorage.getItem<boolean>() ?? true;
  });

  const toggleSound = () => {
    setIsSoundOn(prev => {
      const next = !prev;
      soundStorage.setItem(next);
      return next;
    });
  };

  return [isSoundOn, toggleSound] as const;
};

export default useSound;
