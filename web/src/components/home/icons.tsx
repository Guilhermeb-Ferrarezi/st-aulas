import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

type SvgIconProps = IconProps & {
  children: ReactNode;
};

function SvgIcon({ children, className = "", ...props }: SvgIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export function LogoMarkIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M13.5 2.5 6.75 12h4.5l-1.5 9.5 6.75-9.5h-4.5L13.5 2.5Z" />
    </SvgIcon>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="3.5" y="3.5" width="6" height="6" rx="1.2" />
      <rect x="14.5" y="3.5" width="6" height="6" rx="1.2" />
      <rect x="3.5" y="14.5" width="6" height="6" rx="1.2" />
      <rect x="14.5" y="14.5" width="6" height="6" rx="1.2" />
    </SvgIcon>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21V5.5Z" />
      <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19" />
      <path d="M5 21h14" />
    </SvgIcon>
  );
}

export function TrophyIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M8 4h8v3a4 4 0 0 1-8 0V4Z" />
      <path d="M16 5h2a2 2 0 0 1 0 4h-2" />
      <path d="M8 5H6a2 2 0 0 0 0 4h2" />
      <path d="M12 11v4" />
      <path d="M8.5 20h7" />
      <path d="M9.5 15.5h5" />
    </SvgIcon>
  );
}

export function MessageIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6A2.5 2.5 0 0 1 16.5 15H9l-4 4v-4.5A2.5 2.5 0 0 1 5 12.5v-6Z" />
    </SvgIcon>
  );
}

export function BugIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M9.5 7.5V6a2.5 2.5 0 0 1 5 0v1.5" />
      <path d="M7.5 10h9v4.5A4.5 4.5 0 0 1 12 19a4.5 4.5 0 0 1-4.5-4.5V10Z" />
      <path d="M3.5 11.5h4" />
      <path d="M16.5 11.5h4" />
      <path d="M5 7.5 7.5 9" />
      <path d="m19 7.5-2.5 1.5" />
      <path d="M5 17.5 7.5 16" />
      <path d="m19 17.5-2.5-1.5" />
    </SvgIcon>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </SvgIcon>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="m12 3 1.4 2.2 2.6.5-.5 2.6 2.2 1.4-2.2 1.4.5 2.6-2.6.5L12 19l-1.4-2.2-2.6-.5.5-2.6-2.2-1.4 2.2-1.4-.5-2.6 2.6-.5L12 3Z" />
      <circle cx="12" cy="11" r="2.5" />
    </SvgIcon>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="m14.5 6.5-5 5 5 5" />
    </SvgIcon>
  );
}

export function SignOutIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 4.5H7A2.5 2.5 0 0 0 4.5 7v10A2.5 2.5 0 0 0 7 19.5h3" />
      <path d="M14 8.5 19 12l-5 3.5" />
      <path d="M18.5 12H9" />
    </SvgIcon>
  );
}

export function FlameIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 2.5c1.5 3 5 4.9 5 9.2A5 5 0 1 1 7 11.5c0-1.7.8-3.4 2-4.8.7 1.3 1.6 2.2 3 2.8-.2-2.3.4-4.4 0-7Z" />
    </SvgIcon>
  );
}

export function TargetIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="12" cy="12" r="1.5" />
    </SvgIcon>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="m9 7 8 5-8 5V7Z" fill="currentColor" stroke="none" />
    </SvgIcon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="m7 12 3 3 7-8" />
    </SvgIcon>
  );
}

export function VideoIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="4.5" y="7" width="10" height="10" rx="2" />
      <path d="m14.5 10.5 5-3v9l-5-3" />
    </SvgIcon>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 8v4l2.5 2" />
    </SvgIcon>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="4" y="5.5" width="16" height="14" rx="2" />
      <path d="M8 3.5v4" />
      <path d="M16 3.5v4" />
      <path d="M4 9.5h16" />
    </SvgIcon>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="m12 3.5 2.7 5.4 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6L3.3 9.8l6-.9L12 3.5Z" />
    </SvgIcon>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 3.5 18.5 6v5.5c0 4.1-2.6 7.1-6.5 9-3.9-1.9-6.5-4.9-6.5-9V6L12 3.5Z" />
      <path d="m9.5 12 1.6 1.7 3.4-3.7" />
    </SvgIcon>
  );
}

export function MedalIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M8 3.5h3l1 4H9L8 3.5Z" />
      <path d="M13 3.5h3l-1 4h-3l1-4Z" />
      <circle cx="12" cy="14.5" r="4.5" />
      <path d="m12 12.2.8 1.6 1.7.2-1.2 1.2.3 1.7-1.6-.8-1.6.8.3-1.7-1.2-1.2 1.7-.2.8-1.6Z" />
    </SvgIcon>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 3.5v4" />
      <path d="M12 16.5v4" />
      <path d="M4.5 12h4" />
      <path d="M15.5 12h4" />
      <path d="m6.8 6.8 2.8 2.8" />
      <path d="m14.4 14.4 2.8 2.8" />
      <path d="m17.2 6.8-2.8 2.8" />
      <path d="m9.6 14.4-2.8 2.8" />
    </SvgIcon>
  );
}

export function GamepadIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M8.5 9h7A4.5 4.5 0 0 1 20 13.5v.3A3.7 3.7 0 0 1 16.3 17.5c-1 0-1.9-.4-2.6-1.1l-.9-.9h-1.6l-.9.9a3.6 3.6 0 0 1-2.6 1.1A3.7 3.7 0 0 1 4 13.8v-.3A4.5 4.5 0 0 1 8.5 9Z" />
      <path d="M8.5 12h3" />
      <path d="M10 10.5v3" />
      <circle cx="15.5" cy="11.5" r=".8" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="13.5" r=".8" fill="currentColor" stroke="none" />
    </SvgIcon>
  );
}
