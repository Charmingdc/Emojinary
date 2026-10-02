import NavButton from "@/components/ui/NavButton";
import { Panel } from "@/components/ui/GamePrimitives";

const NoModeScreen = () => {
  return (
    <main className="mx-auto flex min-h-[70svh] w-full max-w-2xl flex-col items-center justify-center gap-5 p-6 text-center">
      <h1 className="text-3xl">Choose a game mode</h1>

      <Panel className="flex w-full items-center justify-center gap-3 p-4">
        <NavButton
          to="/play/classic"
          variant="neutral"
          wrapperClassName="rotate-0"
          className="translate-y-1 bg-surface shadow-[inset_0_3px_0_rgb(var(--tile-edge)),inset_0_4px_8px_rgba(39,35,31,0.16)]"
        >
          Classic Mode
        </NavButton>

        <NavButton
          to="/play/daily"
          variant="neutral"
          wrapperClassName="rotate-0"
        >
          Daily Mode
        </NavButton>
      </Panel>

      <p className="max-w-sm text-muted">
        <strong>Tip:</strong> Try daily mode for a new challenge every day!
      </p>
    </main>
  );
};

export default NoModeScreen;
