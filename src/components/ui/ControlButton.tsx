import useGameAudio from "@/hooks/useGameAudio";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const ControlButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  const { play } = useGameAudio();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    play("click");
    props.onClick?.(e);
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className="bg-background w-14 h-14 flex justify-center items-center border
      rounded-xl shadow-neumorphic-choc active:shadow-neumorphic-choc-pressed
      disabled:opacity-30 transition-shadow duration-150"
    >
      {children}
    </button>
  );
};

export default ControlButton;
