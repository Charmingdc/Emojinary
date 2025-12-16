import { useParams } from "react-router-dom";
import NoModeScreen from "@/components/screens/NoModeScreen";
import ClassicModeScreen from "@/components/screens/ClassicModeScreen";
import InvalidModeScreen from "@/components/screens/InvalidModeScreen";

const PlayPage = () => {
  const { mode } = useParams<{ mode?: string }>();

  if (!mode) return <NoModeScreen />;

  if (mode === "classic") return <ClassicModeScreen />;
  if (mode === "daily") return <h1>Daily Mode</h1>;

  return <InvalidModeScreen />;
};

export default PlayPage;
