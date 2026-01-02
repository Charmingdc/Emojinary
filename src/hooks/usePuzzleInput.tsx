import { useState } from "react";

const usePuzzleInput = (answerLength: number) => {
  const [slots, setSlots] = useState<string[]>(Array(answerLength).fill(""));

  const reset = () => {
    setSlots(Array(answerLength).fill(""));
  };

  const insert = (letter: string): string | null => {
    let insertedLetter: string | null = null;

    setSlots(prev => {
      const emptyIndex = prev.indexOf("");
      if (emptyIndex === -1) return prev;

      const next = [...prev];
      next[emptyIndex] = letter;
      insertedLetter = letter;
      return next;
    });

    return insertedLetter;
  };

  const removeAt = (index: number): string | null => {
    let removedLetter: string | null = null;

    setSlots(prev => {
      const next = [...prev];
      removedLetter = next[index] || null;
      next[index] = "";
      return next;
    });

    return removedLetter;
  };

  const isComplete = !slots.includes("");

  return {
    slots,
    reset,
    insert,
    removeAt,
    isComplete
  };
};

export default usePuzzleInput;
