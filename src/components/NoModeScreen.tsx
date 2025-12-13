import NavButton from "@/components/ui/NavButton";

const NoModeScreen = () => {
  return (
    <main className="w-full flex flex-col items-center text-center gap-4 p-6 mt-10">
      <h1 className="text-3xl"> Choose a game mode to start playing </h1>

      <div className="w-full flex items-center justify-center gap-3 my-4">
        <NavButton to="/play/classic" wrapperClassName="rotate-0">
          Classic Mode
        </NavButton>

        <NavButton to="/play/daily" wrapperClassName="rotate-0">
          Daily Mode
        </NavButton>
      </div>

      <p className="w-[80%] opacity-80">
        <strong> Tip: </strong> Try daily mode for a new challenge everyday!
      </p>
    </main>
  );
};

export default NoModeScreen;
