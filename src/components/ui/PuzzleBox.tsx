import type { Puzzle } from "@/types";

const PuzzleBox: React.FC<Puzzle> = ({ puzzle }) => {
  return (
    <div className="w-full min-h-[12.4rem] flex flex-wrap justify-center items-center gap-1 p-4 bg-background border-2 border-double rounded-xl shadow-neumorphic-choc [&_span]:text-3xl">
      {puzzle.emojis.map((emoji, idx) => {
        const isLast = idx === puzzle.emojis.length - 1;

        return <span key={idx}>{isLast ? emoji : `${emoji}+`}</span>;
      })}
    </div>
  );
};

export default PuzzleBox;
