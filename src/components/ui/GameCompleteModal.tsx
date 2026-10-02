import { AlertCircle, Star, Trophy, X } from "lucide-react";
import { toast } from "sonner";
import NavButton from "./NavButton";
import { Panel } from "@/components/ui/GamePrimitives";
import usePuzzlesDifficulty from "@/hooks/usePuzzlesDifficulty";
import { generateShareableResult, getResultMessage } from "@/utils";
import type { GamePuzzle } from "@/types";

interface Props {
  score: number;
  bestScore?: number;
  puzzles: GamePuzzle | GamePuzzle[];
  handleReplay?: () => void;
  handleGoHome: () => void;
}

const GameCompleteModal = ({
  score,
  bestScore,
  puzzles,
  handleReplay,
  handleGoHome,
}: Props) => {
  const { difficulty } = usePuzzlesDifficulty();
  const puzzleArray = Array.isArray(puzzles) ? puzzles : [puzzles];
  const solvedCount = puzzleArray.filter(
    (p) => p.puzzleState === "solved",
  ).length;
  const skippedCount = puzzleArray.filter(
    (p) => p.puzzleState === "skipped",
  ).length;
  const unsolvedCount = puzzleArray.filter(
    (p) => p.puzzleState === "unsolved",
  ).length;
  const totalPuzzles = puzzleArray.length;
  const isSinglePuzzle = totalPuzzles === 1;
  const reviewPuzzles = puzzleArray.filter((p) => p.puzzleState !== "solved");
  const allSolved = reviewPuzzles.length === 0;
  const resultMessage = getResultMessage(solvedCount, totalPuzzles);

  const handleShareResult = async () => {
    const text = generateShareableResult({
      mode: isSinglePuzzle ? "daily" : "classic",
      score,
      bestScore,
      solvedCount,
      totalPuzzles,
      difficulty,
    });

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Emojinary Result",
          text,
          url: "https://funemojinary.vercel.app",
        });
      } catch (err: unknown) {
        if (err instanceof Error)
          toast.error(`Share cancelled: ${err.message}`);
        else toast.error("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast.success("Result copied to clipboard!");
    }
  };

  return (
    <section className="fixed inset-0 z-50 flex h-svh w-screen items-center justify-center overflow-y-auto bg-background/95 p-4 sm:p-6">
      <Panel className="my-auto flex w-full max-w-5xl flex-col items-center gap-4 p-4 sm:p-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <Trophy size={72} className="text-accent" />
          <div
            className="flex items-center gap-2 text-accent"
            aria-label="Three stars"
          >
            {[0, 1, 2].map((star) => (
              <Star key={star} size={26} fill="currentColor" />
            ))}
          </div>
          <h1 className="text-3xl text-foreground">{resultMessage}</h1>
          {allSolved ? (
            <p className="text-sm text-success-ink">
              Perfect score! Nothing to review.
            </p>
          ) : (
            <p className="text-sm text-muted">
              You solved {solvedCount} out of {totalPuzzles} puzzles
            </p>
          )}
        </div>

        <div className="mt-2 flex w-full max-w-3xl justify-around gap-2 px-2 py-3 text-center font-medium text-foreground">
          <div>
            Score
            <br />
            <span className="text-xl text-primary-ink">{score}</span>
          </div>
          {bestScore !== undefined && (
            <div>
              Best
              <br />
              <span className="text-xl text-primary-ink">{bestScore}</span>
            </div>
          )}
          <div className="text-success-ink">
            Solved
            <br />
            <span className="text-xl">{solvedCount}</span>
          </div>
          <div className="text-muted">
            Skipped
            <br />
            <span className="text-xl">{skippedCount}</span>
          </div>
          <div className="text-muted">
            Unsolved
            <br />
            <span className="text-xl">{unsolvedCount}</span>
          </div>
        </div>

        {!allSolved && (
          <div
            className={`w-full ${isSinglePuzzle ? "mt-2" : "max-h-[40svh] overflow-auto"}`}
          >
            <div className="sticky top-0 z-10 grid grid-cols-[2fr_2fr_1fr] gap-4 border-b border-outline bg-panel px-3 py-3 font-semibold text-muted sm:px-6">
              <span>Emojis</span>
              <span>Answer</span>
              <span>Status</span>
            </div>
            {reviewPuzzles.map((puzzle, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[2fr_2fr_1fr] items-center gap-4 border-b border-outline/20 px-3 py-4 sm:px-6"
              >
                <div className="flex flex-wrap gap-1 truncate text-foreground">
                  {puzzle.emojis.map((emoji, emojiIdx) => (
                    <span key={emojiIdx}>
                      {emoji}
                      {emojiIdx < puzzle.emojis.length - 1 ? "+" : ""}
                    </span>
                  ))}
                </div>
                <div className="truncate text-center font-medium text-foreground">
                  {puzzle.answer}
                </div>
                <div className="flex items-center justify-center text-muted">
                  {puzzle.puzzleState === "skipped" && <X size={18} />}
                  {puzzle.puzzleState === "unsolved" && (
                    <AlertCircle size={18} />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          className={`flex flex-wrap justify-center gap-3 ${isSinglePuzzle ? "mt-2" : "mt-1"}`}
        >
          {handleReplay && (
            <NavButton
              variant="neutral"
              wrapperClassName="w-36"
              className="px-6 py-3"
              onClick={handleReplay}
            >
              Replay
            </NavButton>
          )}
          <NavButton
            wrapperClassName="w-36"
            className="px-6 py-3"
            onClick={handleGoHome}
          >
            Go Home
          </NavButton>
          <NavButton
            variant="neutral"
            wrapperClassName="w-36"
            className="px-6 py-3"
            onClick={handleShareResult}
          >
            Share Result
          </NavButton>
        </div>
      </Panel>
    </section>
  );
};

export default GameCompleteModal;
