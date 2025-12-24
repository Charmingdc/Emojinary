import { motion } from "motion/react";
import { PuzzlePiece, Star } from "@phosphor-icons/react";
import { Trophy } from "lucide-react";
import NavButton from "./NavButton";

interface Props {
  score: number;
  bestScore?: number;
  puzzlesSolved: number;
  puzzleCount: number;
  handleReplay?: () => void;
  handleGoHome: () => void;
}

const GameCompleteModal = ({
  score,
  bestScore,
  puzzlesSolved,
  puzzleCount,
  handleReplay,
  handleGoHome
}: Props) => {
  return (
    <section className="w-screen h-screen fixed top-0 bottom-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -16 }}
        whileInView={{
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.25, ease: "easeOut" }
        }}
        className="w-[80%] min-h-56 flex flex-col items-center gap-3 bg-background text-foreground py-10 px-4 border rounded-2xl shadow-neumorphic-choc -mt-10"
      >
        <Trophy size={72} className="text-accent animate-bounce" />

        <h2 className="text-center rotate-2 mt-1"> Welldone! </h2>

        <ul className="w-full flex flex-col items-center gap-2 mt-2 [&_li]:flex [&_li]:items-center [&_li]:gap-1">
          <li>
            <Star size={15} weight="fill" /> Score:
            <span className="text-primary"> {score} </span>
          </li>
          {bestScore && (
            <li>
              <Star size={15} weight="fill" className="text-accent" /> Best
              Score:
              <span className="text-primary"> {bestScore} </span>
            </li>
          )}
          <li>
            <PuzzlePiece size={15} weight="fill" /> puzzles:
            <span className="text-primary">
              {puzzlesSolved}/{puzzleCount}
            </span>
          </li>
        </ul>

        <div className="w-full flex flex-wrap items-center justify-center gap-3 mt-8">
          {handleReplay && (
            <NavButton
              wrapperClassName="w-32"
              className="py-3 px-5"
              onClick={handleReplay}
            >
              Replay
            </NavButton>
          )}

          <NavButton
            wrapperClassName="w-32"
            className="py-3 px-5"
            onClick={handleGoHome}
          >
            Go Home
          </NavButton>
        </div>
      </motion.div>
    </section>
  );
};

export default GameCompleteModal;
