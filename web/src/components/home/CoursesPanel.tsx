import type { ReactNode } from "react";
import { ClockIcon } from "./icons";
import { ProgressBar } from "../ui/ProgressBar";
import { SurfaceCard } from "../ui/SurfaceCard";

export type CourseItem = {
  icon: ReactNode;
  iconClassName: string;
  id: string;
  lessonsLabel: string;
  progress: number;
  progressClassName: string;
  title: string;
};

type CoursesPanelProps = {
  courses: CourseItem[];
};

export function CoursesPanel({ courses }: CoursesPanelProps) {
  return (
    <SurfaceCard className="p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--home-text)] [font-family:var(--font-mono)]">
            Meus Cursos
          </h2>
          <p className="mt-2 text-sm text-[var(--home-text-muted)]">
            Continue de onde parou e acompanhe o progresso de cada trilha.
          </p>
        </div>

        <button
          type="button"
          className="text-sm font-semibold text-[var(--home-accent)] transition hover:text-white"
        >
          Ver todos
        </button>
      </div>

      <div className="mt-8 space-y-6">
        {courses.map((course) => (
          <article
            key={course.id}
            className="grid gap-4 rounded-[1.4rem] border border-transparent p-3 transition hover:border-[var(--home-border)] sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center"
          >
            <div
              className={[
                "flex h-14 w-14 items-center justify-center rounded-[1.1rem] text-white shadow-[0_14px_30px_rgba(0,0,0,0.18)]",
                course.iconClassName,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {course.icon}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="truncate text-lg font-medium text-[var(--home-text)] [font-family:var(--font-mono)]">
                  {course.title}
                </h3>

                <span className="inline-flex items-center gap-1.5 text-xs text-[var(--home-text-muted)] [font-family:var(--font-mono)]">
                  <ClockIcon className="h-3.5 w-3.5" />
                  {course.lessonsLabel}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <ProgressBar
                  value={course.progress}
                  ariaLabel={`Progresso de ${course.title}`}
                  className="h-2.5 flex-1"
                  indicatorClassName={course.progressClassName}
                />

                <span className="text-sm text-[var(--home-text-muted)] [font-family:var(--font-mono)]">
                  {course.progress}%
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SurfaceCard>
  );
}
