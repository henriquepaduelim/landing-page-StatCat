import { type ReactNode } from "react";

type IconProps = {
  name: string;
  className?: string;
  label?: string;
};

const iconPaths: Record<string, ReactNode> = {
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </>
  ),
  check: <path d="m5 12 4 4 10-10" />,
  check_circle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.4 2.5L15.8 9.5" />
    </>
  ),
  remove_circle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8" />
    </>
  ),
  chevron_left: <path d="m15 5-7 7 7 7" />,
  chevron_right: <path d="m9 5 7 7-7 7" />,
  arrow_upward: (
    <>
      <path d="M12 18V6" />
      <path d="m7 11 5-5 5 5" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6" />
      <circle cx="12" cy="7.5" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  content_copy: (
    <>
      <rect x="9" y="9" width="10" height="10" rx="2" />
      <path d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
    </>
  ),
  chat: (
    <>
      <path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
    </>
  ),
  forum: (
    <>
      <path d="M4 6h10a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
      <path d="M14 10h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2v3l-3-3" />
    </>
  ),
  alternate_email: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 12v-1.5a3.5 3.5 0 1 0-7 0V12a3.5 3.5 0 0 0 7 0v-1h2v1a5.5 5.5 0 1 1-11 0v-1.5a5.5 5.5 0 1 1 11 0V12" />
    </>
  ),
  timeline: (
    <>
      <path d="M4 17V7" />
      <path d="M20 17V7" />
      <path d="m4 15 4-4 3 3 5-6 4 3" />
      <circle cx="8" cy="11" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="11" cy="14" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="16" cy="8" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  assignment: (
    <>
      <rect x="6" y="4" width="12" height="16" rx="2" />
      <path d="M9 4.5h6" />
      <path d="M9 9h6" />
      <path d="M9 13h6" />
    </>
  ),
  assignment_turned_in: (
    <>
      <rect x="6" y="4" width="12" height="16" rx="2" />
      <path d="M9 4.5h6" />
      <path d="m9.2 13 2.2 2.3 3.4-3.8" />
    </>
  ),
  event_available: (
    <>
      <rect x="4" y="6" width="16" height="14" rx="2" />
      <path d="M8 3.5v4" />
      <path d="M16 3.5v4" />
      <path d="M4 10h16" />
      <path d="m9 15 2 2 4-4" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18h1.1a2.9 2.9 0 0 0 2.9-2.9 2 2 0 0 1 2-2h.2A3.8 3.8 0 0 0 22 12 9 9 0 0 0 12 3Z" />
      <circle cx="7.7" cy="10.2" r="1" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="7.8" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.1" cy="8.1" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  language: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 12h17" />
      <path d="M12 3c2.7 2.3 4.3 5.5 4.3 9s-1.6 6.7-4.3 9c-2.7-2.3-4.3-5.5-4.3-9s1.6-6.7 4.3-9Z" />
    </>
  ),
  public: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 12h17" />
      <path d="M12 3c2.7 2.3 4.3 5.5 4.3 9s-1.6 6.7-4.3 9c-2.7-2.3-4.3-5.5-4.3-9s1.6-6.7 4.3-9Z" />
    </>
  ),
  group_add: (
    <>
      <circle cx="9" cy="10" r="2.5" />
      <path d="M4.5 18a4.5 4.5 0 0 1 9 0" />
      <circle cx="16.5" cy="10.5" r="2" />
      <path d="M19 6v5" />
      <path d="M16.5 8.5h5" />
    </>
  ),
  verified_user: (
    <>
      <path d="M12 3 5 6v6c0 4.3 2.8 6.9 7 9 4.2-2.1 7-4.7 7-9V6l-7-3Z" />
      <path d="m9 12 2.1 2.1L15.5 9.7" />
    </>
  ),
  sports: (
    <>
      <path d="M6 19a4 4 0 0 1 4-4h1a4 4 0 0 1 4 4" />
      <circle cx="10.5" cy="8.5" r="2.5" />
      <path d="m14.5 11.5 2 2 3-3" />
    </>
  ),
  family_restroom: (
    <>
      <circle cx="8.5" cy="7.5" r="1.8" />
      <path d="M6.5 18v-5.5a2 2 0 0 1 4 0V18" />
      <circle cx="15.8" cy="8.2" r="1.5" />
      <path d="M14.6 18v-4.3a1.7 1.7 0 0 1 3.4 0V18" />
      <circle cx="12" cy="11.5" r="1.2" />
      <path d="M11.2 18v-3.1a1.2 1.2 0 0 1 2.4 0V18" />
    </>
  ),
  sports_football: (
    <>
      <path d="M12 3 7 6 4 12l3 6 5 3 5-3 3-6-3-6-5-3Z" />
      <path d="m9.5 9.3 2.5-1.3 2.5 1.3-.5 2.8H10Z" />
      <path d="m7.3 6.8 2.2 2.5" />
      <path d="m16.7 6.8-2.2 2.5" />
      <path d="m6 12h4" />
      <path d="m14 12h4" />
      <path d="m8 17 2.1-2.2" />
      <path d="m16 17-2.1-2.2" />
    </>
  ),
  autorenew: (
    <>
      <path d="M20 5v5h-5" />
      <path d="M4 19v-5h5" />
      <path d="M7 17a7 7 0 0 0 11-3" />
      <path d="M17 7A7 7 0 0 0 6 10" />
    </>
  ),
};

const Icon = ({ name, className, label }: IconProps) => {
  const glyph = iconPaths[name] ?? (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v6" />
      <circle cx="12" cy="17.2" r="0.8" fill="currentColor" stroke="none" />
    </>
  );

  return (
    <svg
      viewBox="0 0 24 24"
      className={`inline-block h-[1em] w-[1em] shrink-0 align-middle ${className ?? ""}`.trim()}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    >
      {label ? <title>{label}</title> : null}
      {glyph}
    </svg>
  );
};

export default Icon;
