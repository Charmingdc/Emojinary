import { useParams } from "react-router-dom";
import NoModeScreen from "@/components/screens/NoModeScreen";
import ClassicModeScreen from "@/components/screens/ClassicModeScreen";
import DailyModeScreen from "@/components/screens/DailyModeScreen";
import InvalidModeScreen from "@/components/screens/InvalidModeScreen";

const PlayPage = () => {
  const { mode } = useParams<{ mode?: string }>();

  if (!mode) return <NoModeScreen />;

  if (mode === "classic") return <ClassicModeScreen />;
  if (mode === "daily") return <DailyModeScreen />;

  return <InvalidModeScreen />;
};

export default PlayPage;
