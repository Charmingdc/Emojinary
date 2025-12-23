import useGameAudio from "@/hooks/useGameAudio";

interface AnswerSlotsProps {
  slots: string[];
  onSlotClick: (idx: number) => void;
  answerState: "neutral" | "wrong" | "correct";
}

const AnswerSlots: React.FC<AnswerSlotsProps> = ({
  slots,
  onSlotClick,
  answerState
}) => {
  const { play } = useGameAudio();

  const borderClass =
    answerState === "correct"
      ? "border-primary"
      : answerState === "wrong"
      ? "border-secondary"
      : "border-transparent";

  const animationClass =
    answerState === "wrong"
      ? "animate-wobble-x"
      : answerState === "correct"
      ? "scale-105 transition-transform duration-200"
      : "";

  return (
    <div className="w-full flex flex-col items-center gap-2 mt-6">
      <p className="text-sm text-gray-500 select-none">Answer Slots</p>

      <div
        className={`w-full flex flex-wrap justify-center gap-2 ${animationClass}`}
      >
        {slots.map((letter, idx) => {
          const shadowClass = letter
            ? "shadow-[4px_4px_8px_rgb(230,225,215),-4px_-4px_8px_rgb(245,241,228)]"
            : "shadow-[inset_4px_4px_8px_rgb(199,196,186),inset_-4px_-4px_8px_rgb(255,255,255)]";

          return (
            <button
              key={idx}
              disabled={answerState === "correct"}
              onClick={() => {
                if (letter) onSlotClick(idx);
                play("click");
              }}
              className={`
                w-12 h-12 rounded-lg
                bg-[rgb(249,245,233)]
                flex justify-center items-center uppercase appearance-none border-[0.0625rem] ${borderClass}
                transition-all duration-200 ease-out
                ${shadowClass}
              `}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AnswerSlots;
