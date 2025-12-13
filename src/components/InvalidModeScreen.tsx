import NavButton from "@/components/ui/NavButton";

const InvalidModeScreen = () => {
  return (
    <main className="w-full flex flex-col items-center text-center gap-3 p-6 mt-14">
      <h1 className="text-6xl mb-6 animate-bounce"> 👻 </h1>

      <h2 className="text-3xl">
        Oops! <br /> Invalid Mode
      </h2>

      <p className="-mt-3 opacity-80">
        Try <strong> Classic </strong> or <strong> Daily </strong> Mode instead
      </p>

      <div className="w-full flex items-center justify-center gap-3 my-6">
        <NavButton to="/play/classic" wrapperClassName="rotate-0">
          Classic Mode
        </NavButton>

        <NavButton to="/play/daily" wrapperClassName="rotate-0">
          Daily Mode
        </NavButton>
      </div>
    </main>
  );
};

export default InvalidModeScreen;
