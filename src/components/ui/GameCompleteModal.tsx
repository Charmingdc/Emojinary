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
    <section className="fixed inset-0 z-50 flex h-svh w-screen items-center justify-center overflow-y-auto bg-background/95 p-3 sm:p-6">
      <Panel className="my-auto flex w-full max-w-4xl flex-col items-center gap-5 p-4 sm:gap-6 sm:p-7">
        <header className="flex w-full flex-col items-center gap-2 border-b border-border pb-5 text-center">
          <Trophy size={64} className="text-accent" />
          <div
            className="flex items-center gap-2 text-accent"
            aria-label="Three stars"
          >
            {[0, 1, 2].map((star) => (
              <Star key={star} size={26} fill="currentColor" />
            ))}
          </div>
          <h1 className="text-3xl text-foreground sm:text-4xl">
            {resultMessage}
          </h1>
          {allSolved ? (
            <p className="text-sm text-success-ink">
              Perfect score! Nothing to review.
            </p>
          ) : (
            <p className="text-sm text-muted">
              You solved {solvedCount} out of {totalPuzzles} puzzles
            </p>
          )}
        </header>

        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
          <div className="rounded-[10px] border border-border bg-background p-3 text-center font-medium text-foreground">
            <span className="block text-xs font-bold uppercase tracking-wide text-muted">
              Score
            </span>
            <span className="mt-1 block text-2xl text-primary-ink">
              {score}
            </span>
          </div>
          {bestScore !== undefined && (
            <div className="rounded-[10px] border border-border bg-background p-3 text-center font-medium text-foreground">
              <span className="block text-xs font-bold uppercase tracking-wide text-muted">
                Best
              </span>
              <span className="mt-1 block text-2xl text-primary-ink">
                {bestScore}
              </span>
            </div>
          )}
          <div className="rounded-[10px] border border-border bg-background p-3 text-center font-medium text-success-ink">
            <span className="block text-xs font-bold uppercase tracking-wide text-muted">
              Solved
            </span>
            <span className="mt-1 block text-2xl">{solvedCount}</span>
          </div>
          <div className="rounded-[10px] border border-border bg-background p-3 text-center font-medium text-foreground">
            <span className="block text-xs font-bold uppercase tracking-wide text-muted">
              Skipped
            </span>
            <span className="mt-1 block text-2xl">{skippedCount}</span>
          </div>
          <div className="rounded-[10px] border border-border bg-background p-3 text-center font-medium text-foreground">
            <span className="block text-xs font-bold uppercase tracking-wide text-muted">
              Unsolved
            </span>
            <span className="mt-1 block text-2xl">{unsolvedCount}</span>
          </div>
        </div>

        {!allSolved && (
          <section
            className={`w-full overflow-hidden rounded-[10px] border border-border ${isSinglePuzzle ? "" : "max-h-[35svh] overflow-y-auto"}`}
          >
            <h2 className="border-b border-border bg-background px-4 py-3 text-sm font-bold uppercase tracking-wide">
              Puzzles to review
            </h2>
            <div className="sticky top-0 z-10 grid grid-cols-[1.3fr_1fr_auto] gap-2 border-b border-border bg-panel px-3 py-3 text-xs font-semibold uppercase text-muted sm:grid-cols-[2fr_2fr_1fr] sm:gap-4 sm:px-6">
              <span>Emojis</span>
              <span>Answer</span>
              <span>Status</span>
            </div>
            {reviewPuzzles.map((puzzle, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[1.3fr_1fr_auto] items-center gap-2 border-b border-border px-3 py-4 last:border-b-0 sm:grid-cols-[2fr_2fr_1fr] sm:gap-4 sm:px-6"
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
          </section>
        )}

        <div className="flex w-full flex-wrap justify-center gap-3 border-t border-border pt-5">
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
