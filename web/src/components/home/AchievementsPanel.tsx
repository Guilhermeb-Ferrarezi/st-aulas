import type { ReactNode } from "react";
import { StatusBadge } from "../ui/StatusBadge";
import { SurfaceCard } from "../ui/SurfaceCard";

export type AchievementItem = {
  description: string;
  icon: ReactNode;
  iconClassName: string;
  id: string;
  statusLabel: string;
  statusTone: "accent" | "neutral" | "success" | "warning";
  title: string;
};

type AchievementsPanelProps = {
  achievements: AchievementItem[];
};

export function AchievementsPanel({
  achievements,
}: AchievementsPanelProps) {
  return (
    <SurfaceCard className="p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--home-text)] [font-family:var(--font-mono)]">
            Conquistas em Destaque
          </h2>
          <p className="mt-2 text-sm text-[var(--home-text-muted)]">
            Marcos recentes e proximos objetivos para manter seu ritmo.
          </p>
        </div>

        <button
          type="button"
          className="text-sm font-semibold text-[var(--home-accent)] transition hover:text-white"
        >
          Ver mural
        </button>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {achievements.map((achievement) => (
          <article
            key={achievement.id}
            className="rounded-[1.35rem] border border-[var(--home-border)] bg-[rgba(255,255,255,0.02)] p-4"
          >
            <div
              className={[
                "flex h-11 w-11 items-center justify-center rounded-2xl",
                achievement.iconClassName,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {achievement.icon}
            </div>

            <h3 className="mt-4 text-lg font-semibold text-[var(--home-text)] [font-family:var(--font-mono)]">
              {achievement.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--home-text-muted)]">
              {achievement.description}
            </p>

            <div className="mt-4">
              <StatusBadge tone={achievement.statusTone}>
                {achievement.statusLabel}
              </StatusBadge>
            </div>
          </article>
        ))}
      </div>
    </SurfaceCard>
  );
}
