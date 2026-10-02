import { PuzzlePiece, Star, Clock, Brain } from "@phosphor-icons/react";
import { Panel } from "@/components/ui/GamePrimitives";

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
    <Panel
      tone="game"
      className="flex w-full items-center justify-between gap-2 p-3 text-sm sm:p-4"
    >
      <div className="flex items-center gap-1 transition-transform duration-150 hover:-translate-y-0.5 hover:text-accent">
        <PuzzlePiece size={20} weight="fill" />
        <span>
          {currentPuzzleIdx} / {puzzleCount}
        </span>
      </div>
      <div className="flex items-center gap-1 transition-transform duration-150 hover:-translate-y-0.5 hover:text-accent">
        <Star size={20} weight="fill" />
        <span> {points} </span>
      </div>
      <div className="flex items-center gap-1 transition-transform duration-150 hover:-translate-y-0.5 hover:text-accent">
        <Clock size={20} weight="fill" />
        <span> {time} </span>
      </div>
      <div className="flex items-center gap-1 transition-transform duration-150 hover:-translate-y-0.5 hover:text-accent">
        <Brain size={20} weight="fill" />
        <span className="capitalize"> {difficulty} </span>
      </div>
    </Panel>
  );
};

export default StatsBar;
