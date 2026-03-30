import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ScrollArea, Separator } from "radix-ui";
import { ChevronLeftIcon, LogoMarkIcon, SignOutIcon } from "./icons";
import { ProgressBar } from "../ui/ProgressBar";
import { clearToken } from "../../auth/auth";

export type SidebarItem = {
  active?: boolean;
  href?: string;
  icon: ReactNode;
  id: string;
  label: string;
  requiredPermission?: number;
};

type DashboardSidebarProps = {
  brandName: string;
  items: SidebarItem[];
  levelLabel: string;
  xpLabel: string;
  xpValue: number;
};

export function DashboardSidebar({
  brandName,
  items,
  levelLabel,
  xpLabel,
  xpValue,
}: DashboardSidebarProps) {
  const navigate = useNavigate();

  function handleSignOut() {
    clearToken();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="overflow-hidden border-b border-[var(--home-border)] bg-[rgba(7,10,17,0.9)] xl:sticky xl:top-0 xl:h-screen xl:w-[15.5rem] xl:border-r xl:border-b-0">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#00ffa3_0%,#13c7ff_100%)] text-[#04120c] shadow-[0_10px_35px_rgba(0,255,163,0.2)]">
            <LogoMarkIcon className="h-5 w-5" />
          </div>

          <div>
            <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--home-text)]">
              {brandName}
            </p>
          </div>
        </div>

        <Separator.Root className="h-px bg-[var(--home-border)]" />

        <div className="px-5 py-4">
          <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.12em] text-[var(--home-text-muted)] [font-family:var(--font-mono)]">
            <span>{levelLabel}</span>
            <span className="font-semibold text-[var(--home-accent)]">{xpLabel}</span>
          </div>

          <ProgressBar
            value={xpValue}
            className="mt-3 h-2"
            ariaLabel="Progresso de XP"
            indicatorClassName="bg-[linear-gradient(90deg,#14e7ff_0%,#00ffa3_100%)]"
          />
        </div>

        <Separator.Root className="h-px bg-[var(--home-border)]" />

        <ScrollArea.Root className="min-h-0 flex-1">
          <ScrollArea.Viewport className="h-full">
            <nav className="grid gap-2 p-3 sm:grid-cols-2 xl:grid-cols-1">
              {items.map((item) => {
                const commonClassName = [
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition",
                  item.active
                    ? "bg-[rgba(255,255,255,0.06)] text-[var(--home-accent)]"
                    : "text-[#c5d3eb] hover:bg-[rgba(255,255,255,0.04)] hover:text-white",
                ]
                  .filter(Boolean)
                  .join(" ");

                const content = (
                  <>
                    <span
                      className={[
                        "flex h-8 w-8 items-center justify-center rounded-xl transition",
                        item.active
                          ? "bg-[rgba(0,255,163,0.1)]"
                          : "bg-[rgba(255,255,255,0.02)] text-[#9fb0ca]",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium [font-family:var(--font-mono)]">
                      {item.label}
                    </span>
                  </>
                );

                if (item.href) {
                  if (item.href.startsWith("#")) {
                    return (
                      <a key={item.id} href={item.href} className={commonClassName}>
                        {content}
                      </a>
                    );
                  }

                  return (
                    <Link key={item.id} to={item.href} className={commonClassName}>
                      {content}
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={commonClassName}
                  >
                    {content}
                  </button>
                );
              })}
            </nav>
          </ScrollArea.Viewport>

          <ScrollArea.Scrollbar
            orientation="vertical"
            className="flex w-2.5 touch-none select-none p-0.5"
          >
            <ScrollArea.Thumb className="relative flex-1 rounded-full bg-[rgba(255,255,255,0.12)]" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>

        <Separator.Root className="h-px bg-[var(--home-border)]" />

        <div className="flex items-center gap-3 px-4 py-5">
          <button
            type="button"
            onClick={handleSignOut}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[rgba(255,95,95,0.18)] bg-[rgba(255,95,95,0.06)] px-4 py-3 text-sm font-medium text-[#ffb4b4] transition hover:border-[rgba(255,95,95,0.32)] hover:bg-[rgba(255,95,95,0.1)] hover:text-white"
          >
            <SignOutIcon className="h-4 w-4" />
            <span>Sair</span>
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--home-border)] text-[var(--home-text-muted)] transition hover:border-[rgba(0,255,163,0.25)] hover:text-[var(--home-accent)]"
            aria-label="Recolher menu"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
