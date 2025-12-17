import { useEffect, useRef, useState } from "react";
import type { Difficulty } from "@/types";

interface UsePerPuzzleTimerProps {
  difficulty: Difficulty;
  trigger: number;
  onExpire: () => void;
}

const difficultyTimes: Record<Difficulty, number> = {
  easy: 30,
  medium: 45,
  hard: 60
};

const usePerPuzzleTimer = ({
  difficulty,
  trigger,
  onExpire
}: UsePerPuzzleTimerProps) => {
  const duration = difficultyTimes[difficulty];
  const [seconds, setSeconds] = useState(duration);

  const intervalRef = useRef<number | null>(null);
  const expiredRef = useRef(false);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  const startTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          if (!expiredRef.current) {
            expiredRef.current = true;
            onExpireRef.current();
          }

          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    expiredRef.current = false;
    setSeconds(duration);
    startTimer();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [trigger, duration]);

  const reset = () => {
    expiredRef.current = false;
    setSeconds(duration);
    startTimer();
  };

  const formatTime = () => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return {
    seconds,
    formatTime,
    reset
  };
};

export default usePerPuzzleTimer;
