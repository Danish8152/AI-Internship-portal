const sessionCount = 6;
const hoursEach = 2;

// Set this to the real registration form URL before launch.
const REGISTRATION_URL = null as string | null;

export const INTERNSHIP = {
  shortName: "Gen AI & AI Agents Internship",
  hoursEach,
  sessionsLine: `${sessionCount} live sessions, ${hoursEach} hours each`,
};

export const REGISTER = {
  href: REGISTRATION_URL ?? "/#format",
  linkProps: REGISTRATION_URL
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : ({} as const),
};
