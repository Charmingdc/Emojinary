const CorrectAnswerBanner: React.FC = () => {
  const messages = [
    "Awesome",
    "Excellent",
    "Amazing",
    "Wonderful",
    "Brilliant",
  ];

  const randomMsg = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex h-[90svh] w-screen items-center justify-center">
      <span className="rounded-[10px] border-[3px] border-outline bg-success px-6 py-3 font-fredoka text-3xl font-bold uppercase text-success-ink shadow-[0_4px_0_rgb(var(--success-edge))] animate-pop">
        {randomMsg}!
      </span>
    </div>
  );
};

export default CorrectAnswerBanner;
