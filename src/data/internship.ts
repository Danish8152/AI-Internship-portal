const sessionCount = 6;
const hoursEach = 2;

// Set this to the real registration form URL before launch. Until then every
// "Register" button opens the joining details on the About page.
const REGISTRATION_URL = null as string | null;

export const INTERNSHIP = {
  fullName: "Finally Get It: The Gen AI & AI Agents Internship",
  shortName: "Gen AI & AI Agents Internship",
  instructor: "Karan Bagul",
  hoursEach,
  sessionsLine: `${sessionCount} live sessions, ${hoursEach} hours each`,
};

export const REGISTER = {
  href: REGISTRATION_URL ?? "/about#joining",
  linkProps: REGISTRATION_URL
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : ({} as const),
};
