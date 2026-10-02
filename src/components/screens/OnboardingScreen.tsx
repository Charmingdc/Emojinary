import { useState } from "react";
import {
  Avatar,
  GameButton,
  Panel,
  StepIndicator,
} from "@/components/ui/GamePrimitives";
import { getProfileAvatarSeed, saveProfile } from "@/utils/profileStorage";
import type { PlayerProfile } from "@/utils/profileStorage";

interface OnboardingScreenProps {
  profile: PlayerProfile;
  onComplete: (profile: PlayerProfile) => void;
}

const OnboardingScreen = ({ profile, onComplete }: OnboardingScreenProps) => {
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState(profile.username);
  const trimmedName = username.trim();
  const previewProfile = { ...profile, username: trimmedName };
  const avatarSeed = getProfileAvatarSeed(previewProfile);
  const displayName = trimmedName || "Guest";

  const finishOnboarding = (name = trimmedName) => {
    onComplete(
      saveProfile({
        username: name,
        onboardingCompleted: true,
      }),
    );
  };

  return (
    <main className="flex min-h-[calc(100svh-2rem)] w-full items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        <StepIndicator currentStep={step} />
        <Panel className="min-h-[390px] p-6 sm:p-8">
          <div
            key={step}
            className="animate-onboarding-enter flex min-h-[330px] flex-col items-center justify-center text-center motion-reduce:animate-none"
          >
            {step === 0 && (
              <>
                <div
                  className="mb-6 flex items-center gap-2"
                  aria-hidden="true"
                >
                  {["E", "M", "?"].map((letter, index) => (
                    <span
                      key={letter}
                      style={{ animationDelay: `${index * 80}ms` }}
                      className={`animate-playful-pop flex h-14 w-14 items-center justify-center rounded-[10px] border-[3px] border-outline bg-tile-face text-2xl font-bold text-tile-ink shadow-[0_4px_0_rgb(var(--tile-edge))] transition-transform duration-150 hover:-translate-y-1 hover:rotate-6 motion-reduce:animate-none ${index === 1 ? "-translate-y-3" : ""}`}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl">Welcome to Emojinary</h1>
                <p className="mt-4 max-w-xs text-muted">
                  Read the emoji clues, build a word, and see if you can solve
                  it.
                </p>
                <GameButton className="mt-8 w-full" onClick={() => setStep(1)}>
                  Next
                </GameButton>
              </>
            )}

            {step === 1 && (
              <>
                <h1 className="text-3xl">Choose a name</h1>
                <p className="mt-2 text-muted">
                  Make it yours, or play as a guest.
                </p>
                <Avatar
                  key={avatarSeed}
                  name={displayName}
                  seed={avatarSeed}
                  styleName={profile.avatarStyle}
                  size={96}
                  className="my-6"
                />
                <label
                  htmlFor="onboarding-name"
                  className="mb-2 self-start text-sm uppercase tracking-wide text-muted"
                >
                  Player name
                </label>
                <input
                  id="onboarding-name"
                  autoComplete="nickname"
                  maxLength={24}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Type a name"
                  className="min-h-[56px] w-full rounded-[10px] border-[3px] border-outline bg-background px-4 text-foreground placeholder:text-muted focus:border-primary"
                />
                <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
                  <GameButton className="w-full" onClick={() => setStep(2)}>
                    Next
                  </GameButton>
                  <GameButton
                    variant="neutral"
                    className="w-full"
                    onClick={() => finishOnboarding("")}
                  >
                    Skip as guest
                  </GameButton>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h1 className="text-3xl">Ready?</h1>
                <Avatar
                  key={avatarSeed}
                  name={displayName}
                  seed={avatarSeed}
                  styleName={profile.avatarStyle}
                  size={112}
                  className="my-6"
                />
                <p className="text-2xl font-bold">{displayName}</p>
                <p className="mt-2 text-muted">Your puzzles are waiting.</p>
                <GameButton
                  className="mt-8 w-full"
                  onClick={() => finishOnboarding()}
                >
                  Start
                </GameButton>
              </>
            )}
          </div>
        </Panel>
      </div>
    </main>
  );
};

export default OnboardingScreen;
