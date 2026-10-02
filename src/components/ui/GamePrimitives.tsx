import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { useState } from "react";
import { motion } from "motion/react";
import type { AvatarStyle } from "@/utils/profileStorage";

export interface LetterToken {
  id: string;
  letter: string;
}

const buttonBase =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[10px] border-2 border-tile-edge px-5 py-3 font-fredoka text-sm font-bold uppercase tracking-wide text-foreground shadow-[0_4px_0_rgb(var(--edge))] transition-[transform,box-shadow] duration-[80ms] ease-out hover:-translate-y-0.5 active:translate-y-1 active:shadow-[inset_0_3px_0_rgb(var(--tile-edge)),inset_0_4px_8px_rgba(39,35,31,0.16)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:active:translate-y-0";

type GameButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "neutral" | "selected";
};

export const GameButton = ({
  variant = "primary",
  className = "",
  children,
  ...props
}: GameButtonProps) => (
  <button
    {...props}
    className={`${buttonBase} ${
      variant === "primary"
        ? "bg-primary text-foreground [--edge:var(--primary-edge)] hover:brightness-105"
        : variant === "selected"
          ? "translate-y-1 bg-surface text-foreground [--edge:var(--surface-edge)] shadow-[inset_0_3px_0_rgb(var(--tile-edge)),inset_0_4px_8px_rgba(39,35,31,0.16)] hover:translate-y-1"
          : "bg-surface text-foreground [--edge:var(--surface-edge)]"
    } ${className}`}
  >
    {children}
  </button>
);

export const IconButton = ({
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={`inline-flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full border-2 border-tile-edge bg-surface text-foreground shadow-[0_4px_0_rgb(var(--surface-edge))] transition-[transform,box-shadow] duration-[120ms] hover:-translate-y-1 hover:rotate-3 active:translate-y-1 active:rotate-0 active:shadow-[inset_0_3px_0_rgb(var(--tile-edge)),inset_0_4px_8px_rgba(39,35,31,0.16)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
);

type MotionButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
>;

type LetterTileProps = MotionButtonProps & {
  layoutId: string;
};

export const LetterTile = ({
  children,
  className = "",
  layoutId,
  ...props
}: LetterTileProps) => (
  <motion.button
    layout
    layoutId={layoutId}
    transition={{ layout: { type: "spring", stiffness: 520, damping: 38 } }}
    {...props}
    className={`inline-flex h-12 min-h-[52px] w-12 min-w-[52px] items-center justify-center rounded-[10px] border-2 border-tile-edge bg-tile-face font-fredoka text-xl uppercase text-tile-ink shadow-[0_4px_0_rgb(var(--tile-edge))] transition-[transform,box-shadow] duration-[100ms] hover:-translate-y-1 hover:rotate-2 active:translate-y-1 active:rotate-0 active:shadow-[inset_0_3px_0_rgb(var(--tile-edge)),inset_0_4px_8px_rgba(39,35,31,0.16)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 disabled:cursor-default disabled:opacity-100 ${className}`}
  >
    {children}
  </motion.button>
);

type AnswerSlotProps = MotionButtonProps & {
  state?: "neutral" | "wrong" | "correct";
  layoutId?: string;
};

export const AnswerSlot = ({
  state = "neutral",
  className = "",
  layoutId,
  children,
  ...props
}: AnswerSlotProps) => (
  <motion.button
    layout={state === "neutral"}
    layoutId={layoutId}
    transition={{ layout: { type: "spring", stiffness: 520, damping: 38 } }}
    {...props}
    className={`inline-flex h-12 min-h-[52px] w-12 min-w-[52px] items-center justify-center rounded-[10px] border-2 font-fredoka text-xl uppercase transition-transform duration-[80ms] active:translate-y-1 disabled:cursor-default ${
      state === "wrong"
        ? "animate-wobble-x border-wrong-edge bg-wrong text-white [--edge:var(--wrong-edge)] shadow-[0_4px_0_rgb(var(--wrong-edge))]"
        : state === "correct"
          ? "border-success-edge bg-success text-success-ink [--edge:var(--success-edge)] shadow-[0_4px_0_rgb(var(--success-edge))] animate-correct-pop"
          : "border-tile-edge bg-tile-face text-tile-ink [--edge:var(--tile-edge)] shadow-[0_4px_0_rgb(var(--tile-edge))]"
    } ${state === "neutral" && children ? "animate-tile-place" : ""} hover:-translate-y-0.5 active:translate-y-1 active:shadow-[inset_0_3px_0_rgb(var(--tile-edge)),inset_0_4px_8px_rgba(39,35,31,0.16)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 ${className}`}
  >
    {children}
  </motion.button>
);

export const Panel = ({
  tone = "light",
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  tone?: "light" | "game";
}) => (
  <section
    {...props}
    className={`rounded-[14px] border-[3px] border-outline p-4 shadow-[0_4px_0_rgb(var(--panel-edge))] ${tone === "game" ? "bg-game-panel text-game-panel-text [--panel-edge:var(--game-panel-edge)]" : "bg-panel text-foreground"} ${className}`}
  >
    {children}
  </section>
);

interface AvatarProps {
  name: string;
  seed: string;
  styleName?: AvatarStyle;
  size?: number;
  className?: string;
}

export const Avatar = ({
  name,
  seed,
  styleName = "thumbs",
  size = 64,
  className = "",
}: AvatarProps) => {
  const [failed, setFailed] = useState(false);
  const initial = (name.trim().charAt(0) || "?").toUpperCase();
  const source = `https://api.dicebear.com/9.x/${styleName}/svg?seed=${encodeURIComponent(seed)}&backgroundColor=fffdf6`;

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-outline bg-tile-face font-fredoka text-foreground [--edge:var(--tile-edge)] transition-transform duration-150 hover:scale-105 ${className}`}
      style={{
        width: size,
        height: size,
        boxShadow: "0 4px 0 rgb(var(--tile-edge))",
      }}
    >
      {failed ? (
        <span aria-hidden="true" style={{ fontSize: size * 0.45 }}>
          {initial}
        </span>
      ) : (
        <img
          src={source}
          alt={`${name || "Guest"}'s avatar`}
          width={size}
          height={size}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </span>
  );
};

const onboardingSteps = ["Welcome", "Choose a name", "Ready"];

export const StepIndicator = ({ currentStep }: { currentStep: number }) => (
  <ol
    aria-label="Onboarding progress"
    className="flex w-full items-center justify-center gap-2"
  >
    {onboardingSteps.map((label, index) => (
      <li key={label} className="flex items-center gap-2">
        <span
          aria-current={index === currentStep ? "step" : undefined}
          className={`flex h-8 min-w-8 items-center justify-center rounded-[10px] border-2 px-2 text-xs font-bold ${
            index === currentStep
              ? "animate-playful-pop border-primary bg-primary text-foreground [--edge:var(--primary-edge)] shadow-[0_3px_0_rgb(var(--primary-edge))] motion-reduce:animate-none"
              : index < currentStep
                ? "border-outline bg-tile-face text-tile-ink"
                : "border-outline bg-panel text-muted"
          }`}
        >
          {index + 1}
        </span>
        <span className="hidden text-xs uppercase tracking-wide text-muted sm:inline">
          {label}
        </span>
        {index < onboardingSteps.length - 1 && (
          <span aria-hidden="true" className="h-[2px] w-5 bg-outline sm:w-8" />
        )}
      </li>
    ))}
  </ol>
);
