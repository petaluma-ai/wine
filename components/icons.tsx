import { type SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function PosIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 9h10" />
      <path d="M7 13h3" />
      <path d="M17 13h0.01" />
      <path d="M14 13h0.01" />
    </BaseIcon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </BaseIcon>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <path d="M10 5h4" />
      <circle cx="12" cy="18" r="1" />
    </BaseIcon>
  );
}

export function SpreadsheetIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 9v11" />
      <path d="M15 9v11" />
      <path d="M3 14h18" />
    </BaseIcon>
  );
}

export function ClipboardIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="5" y="4.5" width="14" height="16" rx="2" />
      <rect x="8.3" y="2.8" width="7.4" height="3" rx="1.2" />
      <path d="m9.2 12.2 2.1 2.1 3.8-3.8" />
    </BaseIcon>
  );
}

export function BarrelIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 4.5c1.7-.8 8.3-.8 10 0" />
      <path d="M6.5 8c2.1 1 8.9 1 11 0" />
      <path d="M6 12c2.5 1.2 9.5 1.2 12 0" />
      <path d="M6.5 16c2.1 1 8.9 1 11 0" />
      <path d="M7 19.5c1.7.8 8.3.8 10 0" />
      <path d="M7 4.5v15" />
      <path d="M17 4.5v15" />
    </BaseIcon>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
    </BaseIcon>
  );
}

export function AnalyticsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 19V5" />
      <path d="M20 19H4" />
      <path d="m7.5 15.5 3.5-3.5 2.8 2.8 3.8-5.3" />
      <path d="M17.2 9.5h1.7v1.7" />
    </BaseIcon>
  );
}

export function CrmIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="8" cy="9" r="2.2" />
      <circle cx="16" cy="9" r="2.2" />
      <path d="M4.5 18c.3-2.5 2-4.2 3.5-4.2s3.2 1.7 3.5 4.2" />
      <path d="M12.5 18c.3-2.5 2-4.2 3.5-4.2s3.2 1.7 3.5 4.2" />
    </BaseIcon>
  );
}

export function PlugIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M7 7h10v2a5 5 0 0 1-5 5 5 5 0 0 1-5-5z" />
      <path d="M12 14v7" />
    </BaseIcon>
  );
}

export function ApprovalIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="4" y="3.5" width="16" height="17" rx="2" />
      <path d="M8 8h8" />
      <path d="M8 12h5" />
      <path d="m8 16 1.8 1.8 4.2-4.2" />
    </BaseIcon>
  );
}

export function GrowthIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 19h16" />
      <path d="M6 16.5V11" />
      <path d="M11 16.5V8" />
      <path d="M16 16.5V5" />
      <path d="m19 6-3-1" />
      <path d="m17 3 2 2-4 4" />
    </BaseIcon>
  );
}
