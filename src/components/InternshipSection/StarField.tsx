// Lightweight, reusable "we're still in space" ambience for landing-page
// sections that don't carry a hero-scale photo of their own. Pure CSS
// (tiled radial-gradient dots, no image request), so it's cheap to drop
// into every section for visual continuity with the Hero's space theme.

const STAR_TILE_A: React.CSSProperties = {
  backgroundImage: `
    radial-gradient(1.6px 1.6px at 20px 30px, #ffffff, transparent),
    radial-gradient(1px 1px at 70px 90px, #ffffff, transparent),
    radial-gradient(1.4px 1.4px at 110px 40px, #ffffff, transparent),
    radial-gradient(1px 1px at 150px 130px, #ffffff, transparent),
    radial-gradient(1.8px 1.8px at 40px 150px, #ffffff, transparent),
    radial-gradient(1px 1px at 180px 20px, #ffffff, transparent),
    radial-gradient(1.2px 1.2px at 10px 100px, #ffffff, transparent),
    radial-gradient(1px 1px at 130px 170px, #ffffff, transparent),
    radial-gradient(1.5px 1.5px at 190px 90px, #ffffff, transparent),
    radial-gradient(1px 1px at 60px 60px, #ffffff, transparent)
  `,
  backgroundRepeat: "repeat",
  backgroundSize: "200px 200px",
};

const STAR_TILE_B: React.CSSProperties = {
  ...STAR_TILE_A,
  backgroundPosition: "80px 60px",
  backgroundSize: "240px 240px",
};

interface StarFieldProps {
  className?: string;
  /** Tailwind opacity utility for the base (denser, static) star layer. */
  opacityClassName?: string;
}

export default function StarField({
  className = "",
  opacityClassName = "opacity-40",
}: StarFieldProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className={`absolute inset-0 ${opacityClassName}`} style={STAR_TILE_A} />
      <div
        className="absolute inset-0 opacity-20 animate-[pulse_7s_ease-in-out_infinite]"
        style={STAR_TILE_B}
      />
    </div>
  );
}
