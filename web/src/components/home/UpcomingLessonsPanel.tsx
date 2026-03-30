import { CalendarIcon, VideoIcon } from "./icons";
import { StatusBadge } from "../ui/StatusBadge";
import { SurfaceCard } from "../ui/SurfaceCard";

export type LessonItem = {
  id: string;
  schedule: string;
  statusLabel: string;
  statusTone: "accent" | "neutral" | "success" | "warning";
  teacher: string;
  title: string;
};

type UpcomingLessonsPanelProps = {
  lessons: LessonItem[];
};

export function UpcomingLessonsPanel({
  lessons,
}: UpcomingLessonsPanelProps) {
  return (
    <SurfaceCard className="p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--home-text)] [font-family:var(--font-mono)]">
            Proximas Aulas
          </h2>
          <p className="mt-2 text-sm text-[var(--home-text-muted)]">
            Sua agenda ao vivo e as gravacoes mais recentes.
          </p>
        </div>

        <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--home-border)] text-[var(--home-text-muted)]">
          <CalendarIcon className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-7 space-y-4">
        {lessons.map((lesson) => (
          <article
            key={lesson.id}
            className="flex items-start gap-4 rounded-[1.35rem] border border-transparent p-3 transition hover:border-[var(--home-border)]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(20,231,255,0.16),rgba(0,255,163,0.08))] text-[#4cd8ff]">
              <VideoIcon className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-base font-medium text-[var(--home-text)] [font-family:var(--font-mono)]">
                    {lesson.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--home-text-muted)]">
                    {lesson.teacher} . {lesson.schedule}
                  </p>
                </div>

                <StatusBadge tone={lesson.statusTone}>
                  {lesson.statusLabel}
                </StatusBadge>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SurfaceCard>
  );
}
