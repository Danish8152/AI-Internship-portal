
const T_LABEL = { fontFamily: "inherit", fontWeight: 700 } as const;
const T_MUTED = { fontFamily: "inherit", fontWeight: 600 } as const;

const svgProps = {
  viewBox: "0 0 320 200",
  className: "w-full h-auto",
  "aria-hidden": true,
  focusable: false,
} as const;

export function AppIllustration() {
  return (
    <svg {...svgProps}>
      <rect x="10" y="10" width="300" height="180" rx="10" fill="none" stroke="#ffffff2e" strokeWidth="2" />
      <path d="M10 44h300" stroke="#ffffff2e" strokeWidth="2" />
      <text x="22" y="31" fontSize="13" fill="#e5e7eb" style={T_LABEL}>AI Study Planner</text>
      <circle cx="284" cy="27" r="5" fill="#22D3EE" />
      <circle cx="266" cy="27" r="5" fill="#F97316" />
      <rect x="26" y="64" width="120" height="28" rx="6" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <text x="36" y="82" fontSize="11" fill="#67e8f9" style={T_MUTED}>Subject</text>
      <rect x="174" y="64" width="120" height="28" rx="6" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <text x="184" y="82" fontSize="11" fill="#67e8f9" style={T_MUTED}>Hours / week</text>
      <rect x="26" y="106" width="120" height="34" rx="8" fill="#F97316" />
      <text x="86" y="128" fontSize="12" textAnchor="middle" fill="#0a0c16" style={T_LABEL}>Generate Plan</text>
      <rect x="174" y="106" width="120" height="34" rx="8" fill="none" stroke="#ffffff33" strokeWidth="2" />
      <text x="234" y="128" fontSize="12" textAnchor="middle" fill="#ffffffaa" style={T_LABEL}>Save Draft</text>
      <rect x="26" y="152" width="268" height="30" rx="8" fill="#F9731622" stroke="#F97316" strokeWidth="1.5" />
      <text x="38" y="172" fontSize="12" fill="#fdba74" style={T_MUTED}>4 sessions planned this week</text>
    </svg>
  );
}

export function GameIllustration() {
  return (
    <svg {...svgProps}>
      <rect x="10" y="10" width="300" height="180" rx="10" fill="none" stroke="#ffffff2e" strokeWidth="2" />
      <text x="22" y="26" fontSize="13" fill="#e5e7eb" style={T_LABEL}>Memory Match</text>
      <text x="298" y="26" fontSize="11" textAnchor="end" fill="#94a3b8" style={T_MUTED}>2 of 3 pairs</text>
      <rect x="30" y="34" width="76" height="56" rx="8" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <rect x="122" y="34" width="76" height="56" rx="8" fill="#F97316" />
      <path d="M150 62l6 6 12-12" stroke="#0a0c16" strokeWidth="2.5" fill="none" />
      <rect x="214" y="34" width="76" height="56" rx="8" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <rect x="30" y="106" width="76" height="56" rx="8" fill="#F97316" />
      <path d="M58 134l6 6 12-12" stroke="#0a0c16" strokeWidth="2.5" fill="none" />
      <rect x="122" y="106" width="76" height="56" rx="8" fill="none" stroke="#ffffff33" strokeWidth="2" />
      <rect x="214" y="106" width="76" height="56" rx="8" fill="none" stroke="#22D3EE" strokeWidth="2" />
    </svg>
  );
}

export function ResearchIllustration() {
  return (
    <svg {...svgProps}>
      <rect x="10" y="10" width="300" height="180" rx="10" fill="none" stroke="#ffffff2e" strokeWidth="2" />
      <text x="22" y="26" fontSize="11" fill="#94a3b8" style={T_MUTED}>Source</text>
      <text x="298" y="26" fontSize="11" textAnchor="end" fill="#94a3b8" style={T_MUTED}>Checked</text>
      <text x="22" y="52" fontSize="12" fill="#e5e7eb" style={T_LABEL}>[1] Paper A</text>
      <path d="M110 48h70" stroke="#ffffff33" strokeWidth="2" />
      <circle cx="270" cy="54" r="16" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <path d="M262 54l6 6 12-13" stroke="#22D3EE" strokeWidth="2" fill="none" />
      <text x="22" y="102" fontSize="12" fill="#e5e7eb" style={T_LABEL}>[2] Report B</text>
      <path d="M126 98h90" stroke="#ffffff33" strokeWidth="2" />
      <circle cx="270" cy="104" r="16" fill="#F97316" />
      <path d="M262 104l6 6 12-13" stroke="#0a0c16" strokeWidth="2" fill="none" />
      <text x="22" y="152" fontSize="12" fill="#e5e7eb" style={T_LABEL}>[3] Blog C</text>
      <path d="M104 148h60" stroke="#ffffff33" strokeWidth="2" />
      <circle cx="270" cy="154" r="16" fill="none" stroke="#ffffff44" strokeWidth="2" />
      <text x="270" y="158" fontSize="13" textAnchor="middle" fill="#ffffff77" style={T_LABEL}>?</text>
    </svg>
  );
}

export function NotesIllustration() {
  return (
    <svg {...svgProps}>
      <rect x="10" y="10" width="300" height="180" rx="10" fill="none" stroke="#ffffff2e" strokeWidth="2" />
      <text x="101" y="24" fontSize="11" textAnchor="middle" fill="#94a3b8" style={T_MUTED}>Notes</text>
      <rect x="26" y="30" width="150" height="140" rx="6" fill="none" stroke="#ffffff33" strokeWidth="2" />
      <path d="M40 56h122M40 76h90M40 96h110M40 116h70M40 136h100" stroke="#ffffff44" strokeWidth="2" />
      <text x="243" y="24" fontSize="11" textAnchor="middle" fill="#94a3b8" style={T_MUTED}>Checklist</text>
      <rect x="192" y="30" width="102" height="140" rx="6" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <rect x="206" y="48" width="16" height="16" rx="3" fill="none" stroke="#F97316" strokeWidth="2" />
      <path d="M209 56l4 4 7-8" stroke="#F97316" strokeWidth="2" fill="none" />
      <text x="232" y="60" fontSize="10" fill="#e5e7eb" style={T_MUTED}>Quiz 1</text>
      <rect x="206" y="82" width="16" height="16" rx="3" fill="#F97316" />
      <path d="M209 90l4 4 7-8" stroke="#0a0c16" strokeWidth="2" fill="none" />
      <text x="232" y="94" fontSize="10" fill="#e5e7eb" style={T_MUTED}>Quiz 2</text>
      <rect x="206" y="116" width="16" height="16" rx="3" fill="none" stroke="#ffffff44" strokeWidth="2" />
      <text x="232" y="128" fontSize="10" fill="#94a3b8" style={T_MUTED}>Quiz 3</text>
    </svg>
  );
}

export function AgentIllustration() {
  return (
    <svg {...svgProps}>
      <rect x="10" y="10" width="300" height="180" rx="10" fill="none" stroke="#ffffff2e" strokeWidth="2" />
      <text x="22" y="26" fontSize="11" fill="#94a3b8" style={T_MUTED}>Task: sort files &amp; check totals</text>
      <rect x="26" y="80" width="56" height="48" rx="8" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <text x="54" y="108" fontSize="10" textAnchor="middle" fill="#67e8f9" style={T_LABEL}>Input</text>
      <rect x="102" y="80" width="56" height="48" rx="8" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <text x="130" y="108" fontSize="10" textAnchor="middle" fill="#67e8f9" style={T_LABEL}>Plan</text>
      <rect x="178" y="80" width="56" height="48" rx="8" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <text x="206" y="108" fontSize="10" textAnchor="middle" fill="#67e8f9" style={T_LABEL}>Act</text>
      <rect x="254" y="80" width="56" height="48" rx="8" fill="#F97316" />
      <text x="282" y="108" fontSize="10" textAnchor="middle" fill="#0a0c16" style={T_LABEL}>Check</text>
      <path d="M82 104h16m-6-6l6 6-6 6" stroke="#ffffff55" strokeWidth="2" fill="none" />
      <path d="M158 104h16m-6-6l6 6-6 6" stroke="#ffffff55" strokeWidth="2" fill="none" />
      <path d="M234 104h16m-6-6l6 6-6 6" stroke="#ffffff55" strokeWidth="2" fill="none" />
      <path d="M282 128v18q0 8-8 8H130q-8 0-8-8v-18" stroke="#ffffff33" strokeWidth="2" strokeDasharray="5 5" fill="none" />
      <path d="M117 134l5-6 5 6" stroke="#ffffff33" strokeWidth="2" fill="none" />
      <text x="198" y="160" fontSize="10" textAnchor="middle" fill="#94a3b8" style={T_MUTED}>revise if a check fails</text>
    </svg>
  );
}

export function CareerIllustration() {
  return (
    <svg {...svgProps}>
      <rect x="10" y="10" width="300" height="180" rx="10" fill="none" stroke="#ffffff2e" strokeWidth="2" />
      <rect x="70" y="28" width="180" height="144" rx="8" fill="none" stroke="#ffffff33" strokeWidth="2" />
      <text x="90" y="48" fontSize="12" fill="#e5e7eb" style={T_LABEL}>Resume Draft</text>
      <path d="M90 62h140M90 78h100" stroke="#ffffff33" strokeWidth="2" />
      <rect x="90" y="96" width="140" height="18" rx="4" fill="#F9731622" stroke="#F97316" strokeWidth="1.5" />
      <text x="98" y="109" fontSize="10" fill="#fdba74" style={T_MUTED}>AI-reviewed against your evidence</text>
      <path d="M90 130h140M90 146h90" stroke="#ffffff33" strokeWidth="2" />
      <circle cx="216" cy="40" r="14" fill="#22D3EE" />
      <path d="M209 40l5 5 9-10" stroke="#0a0c16" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function VideoIllustration() {
  return (
    <svg {...svgProps}>
      <rect x="10" y="10" width="300" height="180" rx="10" fill="none" stroke="#ffffff2e" strokeWidth="2" />
      <rect x="110" y="20" width="100" height="52" rx="6" fill="#ffffff08" stroke="#ffffff33" strokeWidth="2" />
      <path d="M150 34l16 12-16 12z" fill="#F97316" />
      <path d="M22 86h276M40 82v8M80 82v8M120 82v8M160 82v8M200 82v8M240 82v8M280 82v8" stroke="#ffffff33" strokeWidth="1.5" fill="none" />
      <rect x="22" y="98" width="60" height="34" rx="5" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <rect x="86" y="98" width="44" height="34" rx="5" fill="#F97316" />
      <rect x="134" y="98" width="80" height="34" rx="5" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <rect x="218" y="98" width="80" height="34" rx="5" fill="#F97316" />
      <rect x="22" y="142" width="42" height="26" rx="5" fill="none" stroke="#ffffff33" strokeWidth="2" />
      <rect x="68" y="142" width="50" height="26" rx="5" fill="none" stroke="#ffffff33" strokeWidth="2" />
      <rect x="122" y="142" width="70" height="26" rx="5" fill="#F9731633" stroke="#F97316" strokeWidth="1.5" />
      <text x="157" y="160" fontSize="12" textAnchor="middle" fill="#fdba74" style={T_LABEL}>Aa</text>
      <rect x="196" y="142" width="52" height="26" rx="5" fill="none" stroke="#ffffff33" strokeWidth="2" />
      <rect x="252" y="142" width="46" height="26" rx="5" fill="none" stroke="#ffffff33" strokeWidth="2" />
      <path d="M157 82v96" stroke="#22D3EE" strokeWidth="3" fill="none" />
      <path d="M150 78h14l-7 9z" fill="#22D3EE" />
    </svg>
  );
}

export function DataIllustration() {
  return (
    <svg {...svgProps}>
      <rect x="10" y="10" width="300" height="180" rx="10" fill="none" stroke="#ffffff2e" strokeWidth="2" />
      <text x="24" y="38" fontSize="12" fill="#e5e7eb" style={T_LABEL}>Jan</text>
      <text x="146" y="38" fontSize="12" textAnchor="end" fill="#e5e7eb" style={T_LABEL}>3,120</text>
      <text x="24" y="66" fontSize="12" fill="#e5e7eb" style={T_LABEL}>Feb</text>
      <text x="146" y="66" fontSize="12" textAnchor="end" fill="#e5e7eb" style={T_LABEL}>4,860</text>
      <text x="24" y="94" fontSize="12" fill="#e5e7eb" style={T_LABEL}>Mar</text>
      <text x="146" y="94" fontSize="12" textAnchor="end" fill="#e5e7eb" style={T_LABEL}>4,500</text>
      <path d="M22 44h128M22 72h128M22 100h128" stroke="#ffffff22" strokeWidth="1.5" />
      <rect x="22" y="114" width="128" height="62" rx="8" fill="#F9731622" stroke="#F97316" strokeWidth="1.5" />
      <text x="34" y="140" fontSize="12" fill="#fdba74" style={T_LABEL}>Total 12,480</text>
      <path d="M124 130l5 5 9-11" stroke="#fdba74" strokeWidth="2" fill="none" />
      <text x="34" y="162" fontSize="10" fill="#94a3b8" style={T_MUTED}>Checked against source</text>
      <path d="M172 26v124h132" stroke="#ffffff33" strokeWidth="2" fill="none" />
      <rect x="188" y="88" width="30" height="62" rx="3" fill="#22D3EE22" stroke="#22D3EE" strokeWidth="2" />
      <rect x="226" y="53" width="30" height="97" rx="3" fill="#F97316" />
      <rect x="264" y="60" width="30" height="90" rx="3" fill="#22D3EE22" stroke="#22D3EE" strokeWidth="2" />
      <text x="203" y="167" fontSize="10" textAnchor="middle" fill="#94a3b8" style={T_MUTED}>Jan</text>
      <text x="241" y="167" fontSize="10" textAnchor="middle" fill="#94a3b8" style={T_MUTED}>Feb</text>
      <text x="279" y="167" fontSize="10" textAnchor="middle" fill="#94a3b8" style={T_MUTED}>Mar</text>
    </svg>
  );
}
