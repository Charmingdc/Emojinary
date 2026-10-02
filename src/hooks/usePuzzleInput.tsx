import { useRef, useState } from "react";

const usePuzzleInput = (answerLength: number) => {
  const initialSlots = Array(answerLength).fill("");
  const [slots, setSlots] = useState<string[]>(initialSlots);
  const slotsRef = useRef(slots);

  const reset = () => {
    const emptySlots = Array(answerLength).fill("");
    slotsRef.current = emptySlots;
    setSlots(emptySlots);
  };

  const insert = (letter: string): boolean => {
    const emptyIndex = slotsRef.current.indexOf("");
    if (emptyIndex === -1) return false;

    const next = [...slotsRef.current];
    next[emptyIndex] = letter;
    slotsRef.current = next;
    setSlots(next);
    return true;
  };

  const removeAt = (index: number): string | null => {
    const removedLetter = slotsRef.current[index] || null;
    if (!removedLetter) return null;

    const next = [...slotsRef.current];
    next[index] = "";
    slotsRef.current = next;
    setSlots(next);
    return removedLetter;
  };

  const isComplete = !slots.includes("");

  return {
    slots,
    reset,
    insert,
    removeAt,
    isComplete,
  };
};

export default usePuzzleInput;
