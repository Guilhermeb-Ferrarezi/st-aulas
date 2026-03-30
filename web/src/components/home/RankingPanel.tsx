import { Avatar } from "radix-ui";
import { GamepadIcon, MedalIcon } from "./icons";
import { SurfaceCard } from "../ui/SurfaceCard";

export type RankingEntry = {
  id: string;
  initials: string;
  isCurrentUser?: boolean;
  name: string;
  rank: number;
  xpLabel: string;
};

type RankingPanelProps = {
  entries: RankingEntry[];
};

export function RankingPanel({ entries }: RankingPanelProps) {
  return (
    <SurfaceCard className="p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--home-text)] [font-family:var(--font-mono)]">
            Ranking Semanal
          </h2>
          <p className="mt-2 text-sm text-[var(--home-text-muted)]">
            Veja quem puxou o ritmo da turma nesta semana.
          </p>
        </div>

        <span className="inline-flex items-center gap-2 text-sm font-medium text-[#28b6ff] [font-family:var(--font-mono)]">
          <MedalIcon className="h-4 w-4" />
          Top 10
        </span>
      </div>

      <div className="mt-7 space-y-3">
        {entries.map((entry) => (
          <article
            key={entry.id}
            className={[
              "flex items-center gap-3 rounded-[1.3rem] px-3 py-3 transition",
              entry.isCurrentUser
                ? "border border-[rgba(0,255,163,0.28)] bg-[rgba(0,255,163,0.08)]"
                : "border border-transparent hover:border-[var(--home-border)]",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span className="w-8 text-sm text-[var(--home-text-muted)] [font-family:var(--font-mono)]">
              #{entry.rank}
            </span>

            <Avatar.Root className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(135deg,rgba(20,231,255,0.16),rgba(0,255,163,0.14))]">
              <Avatar.Fallback
                delayMs={0}
                className="text-sm font-semibold text-[var(--home-text)] [font-family:var(--font-mono)]"
              >
                {entry.initials}
              </Avatar.Fallback>
            </Avatar.Root>

            <div className="min-w-0 flex-1">
              <p
                className={[
                  "truncate text-base font-medium [font-family:var(--font-mono)]",
                  entry.isCurrentUser
                    ? "text-[var(--home-accent)]"
                    : "text-[var(--home-text)]",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {entry.name}
              </p>
            </div>

            {entry.isCurrentUser && (
              <span className="hidden text-[var(--home-accent)] sm:inline-flex">
                <GamepadIcon className="h-4 w-4" />
              </span>
            )}

            <span className="text-sm text-[var(--home-text-muted)] [font-family:var(--font-mono)]">
              {entry.xpLabel}
            </span>
          </article>
        ))}
      </div>
    </SurfaceCard>
  );
}
