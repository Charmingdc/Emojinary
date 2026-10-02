import useGameAudio from "@/hooks/useGameAudio";
import { IconButton } from "@/components/ui/GamePrimitives";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const ControlButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  const { play } = useGameAudio();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    play("click");
    props.onClick?.(e);
  };

  return (
    <IconButton
      {...props}
      onClick={handleClick}
      className="disabled:opacity-40"
    >
      {children}
    </IconButton>
  );
};

export default ControlButton;
