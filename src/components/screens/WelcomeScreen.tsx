import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Brain, Volume2, VolumeX } from "lucide-react";

import useSound from "@/hooks/useSound";
import {
  Avatar,
  GameButton,
  IconButton,
  Panel,
} from "@/components/ui/GamePrimitives";
import DifficultySelectionModal from "@/components/DifficultySelectionModal";
import usePuzzlesDifficulty from "@/hooks/usePuzzlesDifficulty";
import { getProfileAvatarSeed, saveProfile } from "@/utils/profileStorage";
import type { PlayerProfile } from "@/utils/profileStorage";

interface WelcomeScreenProps {
  profile: PlayerProfile;
  onProfileChange: (profile: PlayerProfile) => void;
}

const WelcomeScreen = ({ profile, onProfileChange }: WelcomeScreenProps) => {
  const navigate = useNavigate();
  const { isSoundOn, toggleSound } = useSound();
  const { difficulty } = usePuzzlesDifficulty();
  const [isDifficultyModalOpen, setIsDifficultyModalOpen] =
    useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<"classic" | "daily">(
    "classic",
  );
  const [isEditingName, setIsEditingName] = useState(false);
  const [draftName, setDraftName] = useState(profile.username);
  const previewProfile = { ...profile, username: draftName };
  const displayName = draftName.trim() || "Guest";
  const avatarSeed = getProfileAvatarSeed(previewProfile);

  const saveName = () => {
    onProfileChange(saveProfile({ username: draftName }));
    setIsEditingName(false);
  };

  return (
    <main className="mx-auto flex min-h-[100svh] w-full max-w-2xl flex-col items-center justify-center gap-4 px-6 py-6 text-center sm:gap-5 sm:px-8 sm:py-8">
      <div
        className="flex items-center justify-center gap-3"
        aria-hidden="true"
      >
        {["E", "M", "O"].map((letter, index) => (
          <span
            key={letter}
            style={{ animationDelay: `${index * 70}ms` }}
            className={`animate-playful-pop flex h-10 w-10 items-center justify-center rounded-[10px] border-[2px] border-outline bg-tile-face text-lg font-bold text-tile-ink shadow-[0_4px_0_rgb(var(--tile-edge))] transition-transform duration-150 hover:-translate-y-1 hover:rotate-6 motion-reduce:animate-none ${index === 1 ? "-translate-y-2" : ""}`}
          >
            {letter}
          </span>
        ))}
      </div>

      <header className="space-y-1">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-muted">
          Emoji word puzzle
        </p>
        <h1 className="font-luckiest text-5xl tracking-wide text-accent [-webkit-text-stroke:1.5px_rgb(var(--foreground))] [text-shadow:2px_2px_0_rgb(255_255_255)] sm:text-6xl">
          Emojinary
        </h1>
      </header>

      <Panel className="flex w-full items-center gap-5 p-4 text-left">
        <Avatar
          key={avatarSeed}
          name={displayName}
          seed={avatarSeed}
          styleName={profile.avatarStyle}
          size={64}
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-muted">
            Player
          </p>
          {isEditingName ? (
            <input
              aria-label="Player name"
              autoComplete="nickname"
              maxLength={24}
              autoFocus
              value={draftName}
              onChange={(event) => setDraftName(event.target.value)}
              className="mt-1 min-h-[48px] w-full rounded-[10px] border-2 border-outline bg-background px-3 text-foreground"
            />
          ) : (
            <p className="truncate text-xl font-bold">{displayName}</p>
          )}
        </div>
        {isEditingName && (
          <button
            type="button"
            onClick={() => setDraftName(profile.username)}
            className="min-h-[52px] rounded-[10px] border-[3px] border-outline bg-surface px-3 text-sm font-bold uppercase text-foreground shadow-[0_4px_0_rgb(var(--surface-edge))] transition-transform duration-[80ms] active:translate-y-1 active:shadow-[inset_0_3px_0_rgb(var(--tile-edge)),inset_0_4px_8px_rgba(39,35,31,0.16)]"
          >
            Cancel
          </button>
        )}
      </Panel>

      <Panel className="w-full space-y-3 p-3">
        <p className="text-xs font-bold uppercase tracking-wider text-muted">
          Choose mode
        </p>
        <div
          className="grid grid-cols-2 gap-4"
          role="group"
          aria-label="Game mode"
        >
          {(["classic", "daily"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={selectedMode === mode}
              onClick={() => setSelectedMode(mode)}
              className={`min-h-[52px] rounded-[10px] border-[3px] border-outline px-4 font-bold uppercase text-foreground transition-[transform,box-shadow] duration-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 ${
                selectedMode === mode
                  ? "animate-playful-pop translate-y-1 bg-surface shadow-[inset_0_3px_0_rgb(var(--tile-edge)),inset_0_4px_8px_rgba(39,35,31,0.16)] motion-reduce:animate-none"
                  : "bg-surface shadow-[0_4px_0_rgb(var(--tile-edge))] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[inset_0_3px_0_rgb(var(--tile-edge)),inset_0_4px_8px_rgba(39,35,31,0.16)]"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </Panel>

      <GameButton
        className="group min-h-[68px] w-full text-lg"
        onClick={() => navigate(`/play/${selectedMode}`)}
      >
        Play
        <ArrowRight
          size={22}
          className="transition-transform duration-150 group-hover:translate-x-1"
        />
      </GameButton>

      {isEditingName ? (
        <GameButton variant="neutral" className="w-full" onClick={saveName}>
          Save name
        </GameButton>
      ) : (
        <GameButton
          variant="neutral"
          className="w-full"
          onClick={() => setIsEditingName(true)}
        >
          Change name
        </GameButton>
      )}

      <div className="flex items-center justify-center gap-6">
        <IconButton
          aria-label={`Sound ${isSoundOn ? "on" : "off"}`}
          title={`Sound ${isSoundOn ? "on" : "off"}`}
          onClick={toggleSound}
        >
          {isSoundOn ? <Volume2 size={22} /> : <VolumeX size={22} />}
        </IconButton>
        <IconButton
          aria-label={`Change difficulty, currently ${difficulty}`}
          title={`Difficulty: ${difficulty}`}
          onClick={() => setIsDifficultyModalOpen(true)}
        >
          <Brain size={22} />
        </IconButton>
        <a
          href="/how-to-play"
          className="inline-flex min-h-[52px] items-center px-2 text-sm font-bold uppercase tracking-wide text-muted underline underline-offset-4"
        >
          How to play
        </a>
      </div>

      {isDifficultyModalOpen && (
        <DifficultySelectionModal
          setIsDifficultyModalOpen={setIsDifficultyModalOpen}
        />
      )}
    </main>
  );
};

export default WelcomeScreen;
