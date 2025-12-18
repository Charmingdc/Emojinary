import { PuzzlePiece, Star, Clock, Brain } from "@phosphor-icons/react";

type Difficulty = "easy" | "medium" | "hard";

interface StatsObj {
  currentPuzzleIdx: number;
  puzzleCount: number;
  points: number;
  time: string;
  difficulty: Difficulty;
}

interface StatsBarProps {
  stats: StatsObj;
}

const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  const { currentPuzzleIdx, puzzleCount, points, time, difficulty } = stats;

  return (
    <div className="w-full flex items-center justify-between rounded-xl bg-card text-card-foreground p-4 shadow-neumorphic">
      <div className="flex items-center gap-1">
        <PuzzlePiece size={20} weight="fill" />
        <span>
          {currentPuzzleIdx} / {puzzleCount}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Star size={20} weight="fill" />
        <span> {points} </span>
      </div>
      <div className="flex items-center gap-1">
        <Clock size={20} weight="fill" />
        <span> {time} </span>
      </div>
      <div className="flex items-center gap-1">
        <Brain size={20} weight="fill" />
        <span className="capitalize"> {difficulty} </span>
      </div>
    </div>
  );
};

export default StatsBar;
