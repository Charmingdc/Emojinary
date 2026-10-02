import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Panel } from "@/components/ui/GamePrimitives";

type DailyCompletedScreenProps = {
  timeUntilNextPuzzle: number;
};

const DailyCompletedScreen = ({
  timeUntilNextPuzzle,
}: DailyCompletedScreenProps) => {
  const [remaining, setRemaining] = useState(timeUntilNextPuzzle);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => (prev - 1000 > 0 ? prev - 1000 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    const totalSec = Math.ceil(ms / 1000);
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <main className="fixed inset-0 flex h-svh w-full items-center justify-center bg-background p-4 text-center">
      <Panel className="flex w-full max-w-md flex-col items-center gap-3 p-8">
        <h2 className="text-2xl">Daily Puzzle Completed</h2>
        <p className="text-sm text-muted">Next puzzle available in:</p>
        <p className="mt-2 font-mono text-2xl font-bold text-success-ink">
          {formatTime(remaining)}
        </p>
        <Link
          to="/"
          className="mt-3 inline-flex min-h-[52px] w-full items-center justify-center rounded-[10px] border-[3px] border-outline bg-primary px-5 py-3 font-bold uppercase text-foreground shadow-[0_4px_0_rgb(var(--primary-edge))] transition-transform duration-[80ms] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[inset_0_3px_0_rgb(var(--tile-edge)),inset_0_4px_8px_rgba(39,35,31,0.16)]"
        >
          Back home
        </Link>
      </Panel>
    </main>
  );
};

export default DailyCompletedScreen;
