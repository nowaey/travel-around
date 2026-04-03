import { clsx } from "clsx";

interface LogoProps {
  variant?: "light" | "dark"; // light = dark text on white, dark = white text on photo
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ variant = "light", size = "md", className }: LogoProps) {
  const sizes = {
    sm: { icon: 28, font: "text-sm", gap: "gap-2" },
    md: { icon: 34, font: "text-base", gap: "gap-2.5" },
    lg: { icon: 44, font: "text-xl", gap: "gap-3" },
  };
  const s = sizes[size];

  const isLight = variant === "light";

  return (
    <div className={clsx("flex items-center", s.gap, className)}>
      {/* Icon mark — globe with flight path */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle */}
        <circle
          cx="20"
          cy="20"
          r="18"
          fill={isLight ? "#0f766e" : "rgba(255,255,255,0.15)"}
          stroke={isLight ? "none" : "rgba(255,255,255,0.35)"}
          strokeWidth="1"
        />

        {/* Globe latitude lines */}
        <ellipse cx="20" cy="20" rx="18" ry="9" stroke={isLight ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.2)"} strokeWidth="1" fill="none" />

        {/* Meridian line */}
        <line x1="20" y1="2" x2="20" y2="38" stroke={isLight ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.2)"} strokeWidth="1" />

        {/* Flight path arc */}
        <path
          d="M 7 20 Q 14 10 28 15"
          stroke={isLight ? "white" : "rgba(251,191,36,1)"}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Plane */}
        <g transform="translate(26, 13) rotate(25)">
          <path
            d="M0 0 L4 -1.5 L4 1.5 Z M-2 -1 L0 0 M-2 1 L0 0"
            fill={isLight ? "white" : "#fbbf24"}
            stroke="none"
          />
        </g>

        {/* Dot at destination */}
        <circle cx="28" cy="15" r="2" fill={isLight ? "rgba(251,191,36,0.9)" : "#fbbf24"} />
      </svg>

      {/* Wordmark */}
      <div className={clsx("font-bold tracking-tight leading-none", s.font)}>
        <span className={clsx(isLight ? "text-stone-900" : "text-white")}>travel </span>
        <span className={clsx(isLight ? "text-teal-700" : "text-amber-400")}>around</span>
      </div>
    </div>
  );
}
