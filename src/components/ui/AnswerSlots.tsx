import useGameAudio from "@/hooks/useGameAudio";
import { AnimatePresence } from "motion/react";
import { AnswerSlot } from "@/components/ui/GamePrimitives";

interface AnswerSlotsProps {
  slots: string[];
  slotIds: Array<string | null>;
  onSlotClick: (idx: number) => void;
  answerState: "neutral" | "wrong" | "correct";
}

const AnswerSlots: React.FC<AnswerSlotsProps> = ({
  slots,
  slotIds,
  onSlotClick,
  answerState,
}) => {
  const { play } = useGameAudio();

  return (
    <div className="mt-6 flex w-full flex-col items-center gap-2">
      <p className="select-none text-xs font-bold uppercase tracking-wider text-muted">
        Your answer
      </p>

      <div className="flex w-full flex-wrap justify-center gap-2">
        <AnimatePresence initial={false}>
          {slots.map((letter, idx) => {
            const tokenId = letter ? slotIds[idx] : null;

            return (
              <AnswerSlot
                key={tokenId ? `filled-${tokenId}` : `empty-${idx}`}
                state={answerState}
                layoutId={tokenId ? `puzzle-letter-${tokenId}` : undefined}
                style={
                  answerState === "correct"
                    ? { animationDelay: `${idx * 70}ms` }
                    : undefined
                }
                disabled={answerState === "correct"}
                aria-label={
                  letter
                    ? `Answer letter ${letter}, remove`
                    : "Empty answer slot"
                }
                onClick={() => {
                  if (letter) onSlotClick(idx);
                  play("click");
                }}
              >
                {letter}
              </AnswerSlot>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnswerSlots;
