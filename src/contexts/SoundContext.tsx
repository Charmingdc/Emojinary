import { createContext, useEffect, useState, ReactNode } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

type SoundContextValue = {
  isSoundOn: boolean;
  toggleSound: () => void;
};

export const SoundContext = createContext<SoundContextValue | null>(null);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const soundStorage = useLocalStorage("sound");

  const [isSoundOn, setIsSoundOn] = useState<boolean>(
    () => soundStorage.getItem<boolean>() ?? true
  );

  useEffect(() => {
    soundStorage.setItem(isSoundOn);
  }, [isSoundOn, soundStorage]);

  const toggleSound = () => {
    setIsSoundOn(prev => !prev);
  };

  return (
    <SoundContext.Provider value={{ isSoundOn, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
};
