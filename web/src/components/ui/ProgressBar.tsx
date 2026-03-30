import { Progress } from "radix-ui";

type ProgressBarProps = {
  ariaLabel?: string;
  className?: string;
  indicatorClassName?: string;
  value: number;
};

export function ProgressBar({
  ariaLabel,
  className = "",
  indicatorClassName = "",
  value,
}: ProgressBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <Progress.Root
      value={clampedValue}
      aria-label={ariaLabel ?? `${clampedValue}%`}
      className={[
        "relative h-2.5 overflow-hidden rounded-full bg-[var(--home-track)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Progress.Indicator
        className={[
          "h-full w-full rounded-full bg-[var(--home-accent)]",
          "transition-transform duration-500 ease-out",
          indicatorClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ transform: `translateX(-${100 - clampedValue}%)` }}
      />
    </Progress.Root>
  );
}
