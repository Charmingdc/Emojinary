import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Topbar = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex min-h-[52px] items-center gap-2 rounded-[10px] border-[3px] border-outline bg-surface px-4 font-bold uppercase shadow-[0_4px_0_rgb(var(--surface-edge))] transition-transform duration-[80ms] active:translate-y-1 active:shadow-[inset_0_3px_0_rgb(var(--tile-edge)),inset_0_4px_8px_rgba(39,35,31,0.16)]"
      >
        <ArrowLeft size={18} /> Back
      </button>
      <button
        type="button"
        onClick={() => navigate("/")}
        className="min-h-[52px] px-2 text-xl font-bold tracking-wide"
      >
        Emojinary
      </button>
    </div>
  );
};

export default Topbar;
