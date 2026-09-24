const sessionCount = 6;
const hoursEach = 2;
const duration = "2 weeks";

// Set this to the real registration form URL before launch. While it is null,
// every "Register" button scrolls to the Joining details panel instead.
export const REGISTRATION_URL = null as string | null;

export const INTERNSHIP = {
  name: "Finally Get It",
  descriptor: "The Gen AI & AI Agents Internship",
  shortName: "Gen AI & AI Agents Internship",
  instructor: "Karan Bagul",
  sessionCount,
  hoursEach,
  totalHours: sessionCount * hoursEach,
  duration,
  formatLine: `${sessionCount} live sessions · ${hoursEach} hours each · ${sessionCount * hoursEach} live hours · ${duration}`,
  sessionsLine: `${sessionCount} live sessions, ${hoursEach} hours each`,
};

export const REGISTER = {
  href: REGISTRATION_URL ?? "/#format",
  label: REGISTRATION_URL ? "Register Now" : "Explore the programme",
  linkProps: REGISTRATION_URL
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : ({} as const),
};
