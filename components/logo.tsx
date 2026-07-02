/**
 * Next Horizons logo lockup — the hexagon "N" mark used in the product UI,
 * paired with the "NEXT HORIZONS" wordmark. Rendered as inline SVG + text so it
 * stays crisp at any size and adapts to its surroundings: the wordmark inherits
 * the current text color (set `text-foreground`, `text-white`, etc. on the root).
 *
 * The mark geometry matches public/icon.svg (the app favicon / product logo).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <svg
        viewBox="0 0 180 180"
        className="h-full w-auto shrink-0"
        role="img"
        aria-label="Next Horizons"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Runs top-left → bottom-right, matching the product mockup: the
              light end follows the surrounding text color (dark on a light
              header, white on a dark footer), fading into brand blue. */}
          <linearGradient id="nh-logo-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="currentColor" />
            <stop offset="55%" stopColor="currentColor" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        {/* Open hexagon outline (pointy-top). */}
        <polygon
          points="90,18 152.35,54 152.35,126 90,162 27.65,126 27.65,54"
          fill="none"
          stroke="url(#nh-logo-stroke)"
          strokeWidth="15"
          strokeLinejoin="round"
        />
        {/* Diagonal "N" bar through the centre. */}
        <line
          x1="68"
          y1="62"
          x2="112"
          y2="118"
          stroke="currentColor"
          strokeWidth="16"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex flex-col font-bold uppercase leading-[1.05] tracking-[0.18em] text-[1.02rem]">
        <span>Next</span>
        <span>Horizons</span>
      </span>
    </span>
  )
}
