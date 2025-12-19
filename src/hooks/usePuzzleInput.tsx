import { useState } from "react";

const usePuzzleInput = (answerLength: number) => {
  const [slots, setSlots] = useState<string[]>(Array(answerLength).fill(""));

  const reset = () => {
    setSlots(Array(answerLength).fill(""));
  };

  const insert = (letter: string) => {
    setSlots(prev => {
      const emptyIndex = prev.indexOf("");
      if (emptyIndex === -1) return prev;

      const next = [...prev];
      next[emptyIndex] = letter;
      return next;
    });
  };

  const removeAt = (index: number) => {
    setSlots(prev => {
      const next = [...prev];
      next[index] = "";
      return next;
    });
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
