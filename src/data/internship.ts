const sessionCount = 6;
const hoursEach = 2;

// Set this to an external registration URL if the form ever moves off-site.
// Until then every "Register" button opens the in-site application form.
const REGISTRATION_URL = null as string | null;

export const INTERNSHIP = {
  fullName: "The Gen AI & AI Agents Internship",
  shortName: "Gen AI & AI Agents Internship",
  instructor: "Karan Bagul",
  hoursEach,
  sessionsLine: `${sessionCount} live sessions, ${hoursEach} hours each`,
};

export const REGISTER = {
  href: REGISTRATION_URL ?? "/autumn-internship",
  linkProps: REGISTRATION_URL
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : ({} as const),
};
