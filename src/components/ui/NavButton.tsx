import React from "react";
import { useNavigate } from "react-router-dom";
import useGameAudio from "@/hooks/useGameAudio";
import { GameButton } from "@/components/ui/GamePrimitives";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  wrapperClassName?: string;
  className?: string;
  to?: string;
  variant?: "primary" | "neutral";
};

const NavButton: React.FC<ButtonProps> = ({
  wrapperClassName = "",
  className = "",
  children,
  to,
  variant = "primary",
  ...props
}) => {
  const { play } = useGameAudio();
  const navigate = useNavigate();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    play("click");

    if (to) setTimeout(() => navigate(to), 50);

    props.onClick?.(e);
  };

  return (
    <GameButton
      {...props}
      variant={variant}
      onClick={handleClick}
      className={`w-40 ${wrapperClassName} ${className}`}
    >
      {children}
    </GameButton>
  );
};

export default NavButton;
