export type AvatarStyle = "thumbs";

export interface PlayerProfile {
  version: 1;
  username: string;
  guestSeed: string;
  avatarStyle: AvatarStyle;
  onboardingCompleted: boolean;
}

const storageKey = "$emojinary_profile";
const currentVersion = 1 as const;

const hash = (value: string) => {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return (result >>> 0).toString(36);
};

const createGuestSeed = () => `guest-${hash(`${Date.now()}-${Math.random()}`)}`;

const makeDefaultProfile = (): PlayerProfile => ({
  version: currentVersion,
  username: "",
  guestSeed: createGuestSeed(),
  avatarStyle: "thumbs",
  onboardingCompleted: false
});

const persist = (profile: PlayerProfile) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(profile));
  } catch {
    // The game remains usable when browser storage is unavailable.
  }
};

export const getProfile = (): PlayerProfile => {
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        const saved = parsed as Partial<PlayerProfile>;
        const profile: PlayerProfile = {
          version: currentVersion,
          username: typeof saved.username === "string" ? saved.username : "",
          guestSeed:
            typeof saved.guestSeed === "string" && saved.guestSeed
              ? saved.guestSeed
              : createGuestSeed(),
          avatarStyle: "thumbs",
          onboardingCompleted: saved.onboardingCompleted === true
        };
        if (JSON.stringify(profile) !== JSON.stringify(saved)) persist(profile);
        return profile;
      }
    }
  } catch {
    // Invalid or unavailable storage falls through to an in-memory guest profile.
  }

  const profile = makeDefaultProfile();
  persist(profile);
  return profile;
};

export const saveProfile = (
  updates: Partial<Omit<PlayerProfile, "version">>
): PlayerProfile => {
  const current = getProfile();
  const profile: PlayerProfile = {
    ...current,
    ...updates,
    username:
      updates.username === undefined ? current.username : updates.username.trim(),
    avatarStyle: "thumbs",
    version: currentVersion
  };
  persist(profile);
  return profile;
};

export const clearProfile = () => {
  try {
    localStorage.removeItem(storageKey);
  } catch {
    // Clearing browser storage is best-effort.
  }
};

export const getProfileAvatarSeed = (profile: PlayerProfile) =>
  profile.username.trim().toLowerCase() || profile.guestSeed;
