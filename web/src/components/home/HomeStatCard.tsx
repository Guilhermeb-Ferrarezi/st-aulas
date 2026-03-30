import type { ReactNode } from "react";
import { SurfaceCard } from "../ui/SurfaceCard";

type HomeStatCardProps = {
  caption: string;
  icon: ReactNode;
  iconClassName?: string;
  label: string;
  value: string;
};

export function HomeStatCard({
  caption,
  icon,
  iconClassName = "",
  label,
  value,
}: HomeStatCardProps) {
  return (
    <SurfaceCard className="p-5">
      <div className="flex items-start gap-4">
        <div
          className={[
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
            iconClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm text-[var(--home-text-muted)] [font-family:var(--font-mono)]">
            {label}
          </p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--home-text)] [font-family:var(--font-mono)]">
            {value}
          </p>
          <p className="mt-1 text-sm text-[var(--home-text-muted)]">{caption}</p>
        </div>
      </div>
    </SurfaceCard>
  );
}
