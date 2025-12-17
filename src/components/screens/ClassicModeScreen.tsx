import StatsBar from "@/components/ui/StatsBar";
import GameControls from "@/components/GameControls";

interface Puzzle {
  emojis: string[];
  answer: string;
  hint: string;
}

const puzzle: Puzzle = {
  emojis: ["🔥", "🧱", "🌐"],
  answer: "firewall",
  hint: "Used to protect networks"
};

const ClassicModeScreen = () => {
  return (
    <main className="w-full flex flex-col items-center gap-3 p-4">
      <h2 className="self-start -mt-4"> 🕹️ Classic Mode </h2>

      <StatsBar
        stats={{
          currentPuzzleIdx: 4,
          puzzleCount: 10,
          points: 40,
          time: "00:25",
          difficulty: "hard"
        }}
      />

      <div className="w-full flex flex-col items-center gap-3 mt-6">
        <h3 className="text-lg"> Can you guess the word? </h3>

        <div className="w-full flex items-center justify-center gap-3">
          <GameControls />

          <div
            className="w-full min-h-[12rem] flex flex-wrap justify-center
          items-center gap-1 p-4 bg-background border-2 border-double rounded-xl
          shadow-neumorphic-choc [&_span]:text-3xl"
          >
            {puzzle.emojis.map((emoji, idx) => {
              const isLast = idx === puzzle.emojis.length - 1;

              return <span key={idx}>{isLast ? emoji : `${emoji}+`}</span>;
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ClassicModeScreen;
