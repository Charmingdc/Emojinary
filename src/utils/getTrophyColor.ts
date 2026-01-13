const getTrophyColor = (solved: number, total: number) =>
  solved === total
    ? "text-yellow-400"
    : solved >= total / 2
    ? "text-accent"
    : "text-gray-400";

export default getTrophyColor;
