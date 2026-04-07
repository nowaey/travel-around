import { clsx } from "clsx";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZES = {
  sm: { icon: 30, text: "text-sm", gap: "gap-2" },
  md: { icon: 38, text: "text-base", gap: "gap-2.5" },
  lg: { icon: 50, text: "text-xl",  gap: "gap-3" },
};

export default function Logo({ variant = "light", size = "md", className }: LogoProps) {
  const s = SIZES[size];
  const dark = variant === "dark";

  const travelColor = dark ? "#ffffff" : "#0c4a6e";
  const aroundColor = dark ? "#ffffff" : "#0e7490";

  return (
    <div className={clsx("flex items-center", s.gap, className)}>
      {/* ── Icon ─────────────────────────────────────────── */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 56 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ta-g" x1="0" y1="0" x2="56" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#38bdf8" />
            <stop offset="50%"  stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
        </defs>

        {/* ── Outer orbit arc (near-complete oval, arrow at end) ── */}
        <path
          d="M 28 4
             C 42 4 52 13 52 26
             C 52 39 42 48 28 48
             C 14 48 4 39 4 26
             C 4 13 12 5 24 4"
          stroke="url(#ta-g)"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arrow at end of outer arc */}
        <path d="M 24 4 L 29 1.5 M 24 4 L 28.5 8" stroke="url(#ta-g)" strokeWidth="2.8" strokeLinecap="round" />

        {/* ── Inner arc (crossing, creates depth / second loop) ── */}
        <path
          d="M 36 8
             C 44 12 48 19 46 28
             C 44 37 36 44 26 44
             C 18 44 12 38 12 30
             C 12 22 18 16 28 14"
          stroke="url(#ta-g)"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />

        {/* ── Location pin (left-center) ── */}
        <circle cx="20" cy="24" r="4.2" fill="url(#ta-g)" />
        {/* teardrop bottom */}
        <path d="M 17.5 27.2 Q 20 34 22.5 27.2" fill="url(#ta-g)" />

        {/* ── Mountain peaks (right-center) ── */}
        <path
          d="M 33 38 L 39.5 22 L 46 38"
          stroke="url(#ta-g)"
          strokeWidth="2.6"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 36 38 L 41.5 26 L 47 38"
          stroke="url(#ta-g)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
      </svg>

      {/* ── Wordmark ──────────────────────────────────────── */}
      <div className="font-bold tracking-tight leading-none" style={{ fontSize: s.icon * 0.42 }}>
        <span style={{ color: travelColor }}>travel </span>
        <span style={{ color: aroundColor }}>around</span>
      </div>
    </div>
  );
}
