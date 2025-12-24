import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type DailyCompletedScreenProps = {
  timeUntilNextPuzzle: number;
};

const DailyCompletedScreen = ({
  timeUntilNextPuzzle
}: DailyCompletedScreenProps) => {
  const [remaining, setRemaining] = useState(timeUntilNextPuzzle);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(prev => (prev - 1000 > 0 ? prev - 1000 : 0));
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
    <main className="w-full h-screen fixed top-0 flex flex-col items-center justify-center p-4 text-center gap-2 bg-yellow-50">
      <div className="text-6xl animate-spin -mt-20 mb-2"> 🕒 </div>

      <h2 className="text-xl font-semibold">Daily Puzzle Completed</h2>

      <p className="text-sm opacity-80">Next puzzle available in:</p>
      <p className="mt-2 font-mono font-bold text-lg">
        {formatTime(remaining)}
      </p>

      <Link to="/" className="text-primary mt-4 underline">
        Back Home
      </Link>
    </main>
  );
};

export default DailyCompletedScreen;
