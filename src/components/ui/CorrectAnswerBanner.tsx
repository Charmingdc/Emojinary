const CorrectAnswerBanner: React.FC = () => {
  return (
    <div className="w-screen h-[90vh] fixed inset-0 flex justify-center items-center pointer-events-none z-50">
      <span className="font-luckiest text-4xl text-primary animate-pop">
        Awesome!
      </span>
    </div>
  );
};

export default CorrectAnswerBanner;
