const CorrectAnswerBanner: React.FC = () => {
  const messages = [
    "Awesome",
    "Excellent",
    "Amazing",
    "Wonderful",
    "Brilliant"
  ];

  const randomMsg = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="w-screen h-[90vh] fixed inset-0 flex justify-center items-center pointer-events-none z-50">
      <span className="font-luckiest text-4xl text-primary animate-pop">
        {randomMsg}!
      </span>
    </div>
  );
};

export default CorrectAnswerBanner;
