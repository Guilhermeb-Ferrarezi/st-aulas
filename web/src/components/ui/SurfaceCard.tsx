import type { ElementType, ReactNode } from "react";
import { Slot } from "radix-ui";

type SurfaceCardProps = {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
};

export function SurfaceCard({
  asChild = false,
  children,
  className = "",
}: SurfaceCardProps) {
  const Comp: ElementType = asChild ? Slot.Root : "section";

  return (
    <Comp
      className={[
        "rounded-[1.6rem] border border-[var(--home-border)]",
        "bg-[linear-gradient(180deg,rgba(18,22,34,0.98),rgba(12,15,23,0.96))]",
        "shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Comp>
  );
}
