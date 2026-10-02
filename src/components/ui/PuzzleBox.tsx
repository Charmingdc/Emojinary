import type { Puzzle } from "@/types";
import { Panel } from "@/components/ui/GamePrimitives";

const PuzzleBox: React.FC<{ puzzle: Puzzle }> = ({ puzzle }) => {
  return (
    <Panel className="flex min-h-[12.4rem] w-full flex-wrap items-center justify-center gap-1 p-4 [&_span]:text-3xl">
      {puzzle.emojis.map((emoji, idx) => {
        const isLast = idx === puzzle.emojis.length - 1;

        return (
          <span
            key={idx}
            style={{ animationDelay: `${idx * 55}ms` }}
            className="inline-flex animate-playful-pop transition-transform duration-150 hover:-translate-y-1 hover:rotate-3 hover:scale-110 motion-reduce:animate-none"
          >
            {isLast ? emoji : `${emoji}+`}
          </span>
        );
      })}
    </Panel>
  );
};

export default PuzzleBox;
