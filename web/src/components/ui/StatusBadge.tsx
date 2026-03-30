import type { ReactNode } from "react";

type StatusTone = "accent" | "neutral" | "success" | "warning";

type StatusBadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: StatusTone;
};

const toneClassName: Record<StatusTone, string> = {
  accent: "bg-[rgba(0,255,163,0.12)] text-[var(--home-accent)]",
  neutral: "bg-[rgba(103,122,156,0.12)] text-[#b5c1d8]",
  success: "bg-[rgba(61,215,121,0.12)] text-[#4fe17d]",
  warning: "bg-[rgba(255,199,0,0.12)] text-[#ffd45b]",
};

export function StatusBadge({
  children,
  className = "",
  tone = "accent",
}: StatusBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.12em]",
        toneClassName[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
