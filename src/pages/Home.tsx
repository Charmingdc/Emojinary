import { useState } from "react";
import WelcomeScreen from "@/components/screens/WelcomeScreen";
import OnboardingScreen from "@/components/screens/OnboardingScreen";
import { getProfile } from "@/utils/profileStorage";
import type { PlayerProfile } from "@/utils/profileStorage";

const Home = () => {
  const [profile, setProfile] = useState<PlayerProfile>(() => getProfile());

  if (!profile.onboardingCompleted) {
    return <OnboardingScreen profile={profile} onComplete={setProfile} />;
  }

  return <WelcomeScreen profile={profile} onProfileChange={setProfile} />;
};

export default Home;
