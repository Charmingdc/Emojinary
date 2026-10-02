import useGameAudio from "@/hooks/useGameAudio";
import { AnimatePresence } from "motion/react";
import { LetterTile, Panel } from "@/components/ui/GamePrimitives";
import type { LetterToken } from "@/components/ui/GamePrimitives";

interface LetterPoolProps {
  letters: LetterToken[];
  onLetterClick: (letter: string, index: number) => void;
}

const LetterPool: React.FC<LetterPoolProps> = ({ letters, onLetterClick }) => {
  const { play } = useGameAudio();

  return (
    <div className="mt-8 flex w-full flex-col items-center gap-3">
      <p className="select-none text-xs font-bold uppercase tracking-wider text-foreground">
        Tap letters to build the word
      </p>

      <Panel
        tone="game"
        className="flex w-full max-w-md flex-wrap justify-center gap-3 p-4"
      >
        <AnimatePresence initial={false}>
          {letters.map((token, idx) => (
            <LetterTile
              key={token.id}
              layoutId={`puzzle-letter-${token.id}`}
              aria-label={`Choose letter ${token.letter}`}
              onClick={() => {
                onLetterClick(token.letter, idx);
                play("click");
              }}
            >
              {token.letter}
            </LetterTile>
          ))}
        </AnimatePresence>
      </Panel>
    </div>
  );
};

export default LetterPool;
