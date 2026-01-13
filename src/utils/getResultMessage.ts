const getResultMessage = (solved: number, total: number) =>
  solved === total
    ? "Wonderful!"
    : solved === total - 1
    ? "Excellent!"
    : solved >= Math.ceil(total * 0.6)
    ? "Great Work!"
    : solved >= Math.ceil(total * 0.4)
    ? "Good Job!"
    : solved > 0
    ? "Nice Try!"
    : "Try Again!";

export default getResultMessage;
