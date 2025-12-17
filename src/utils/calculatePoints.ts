import type { Difficulty } from "@/types";

function calculatePoints(
  difficulty: Difficulty,
  remainingTime: number,
  usedHint: boolean
) {
  const basePoints: Record<Difficulty, number> = {
    easy: 10,
    medium: 20,
    hard: 30
  };

  const difficultyTimes: Record<Difficulty, number> = {
    easy: 30,
    medium: 45,
    hard: 60
  };

  const maxTime = difficultyTimes[difficulty];
  const timeBonus = Math.ceil(
    (remainingTime / maxTime) * basePoints[difficulty]
  );
  const hintPenalty = usedHint ? 5 : 0;

  return basePoints[difficulty] + timeBonus - hintPenalty;
}
export default calculatePoints;
