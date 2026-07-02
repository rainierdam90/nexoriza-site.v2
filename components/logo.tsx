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
          <linearGradient id="nh-logo-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        {/* Rounded hexagon container. The thick same-color stroke with round
            joins gives the corners a subtle radius without a complex path. */}
        <polygon
          points="90,10 159.3,50 159.3,130 90,170 20.7,130 20.7,50"
          fill="#0b1b34"
          stroke="#0b1b34"
          strokeWidth="16"
          strokeLinejoin="round"
        />
        {/* Stylised "N" mark, centered and scaled to sit inside the hexagon. */}
        <g transform="translate(35.44,34.51) scale(0.62)" fill="url(#nh-logo-mark)">
          <path d="M101.141 53H136.632C151.023 53 162.689 64.6662 162.689 79.0573V112.904H148.112V79.0573C148.112 78.7105 148.098 78.3662 148.072 78.0251L112.581 112.898C112.701 112.902 112.821 112.904 112.941 112.904H148.112V126.672H112.941C98.5504 126.672 86.5638 114.891 86.5638 100.5V66.7434H101.141V100.5C101.141 101.15 101.191 101.792 101.289 102.422L137.56 66.7816C137.255 66.7563 136.945 66.7434 136.632 66.7434H101.141V53Z" />
          <path d="M65.2926 124.136L14 66.7372H34.6355L64.7495 100.436V66.7372H80.1365V118.47C80.1365 126.278 70.4953 129.958 65.2926 124.136Z" />
        </g>
      </svg>
      <span className="flex flex-col font-bold uppercase leading-[1.05] tracking-[0.18em] text-[1.02rem]">
        <span>Next</span>
        <span>Horizons</span>
      </span>
    </span>
  )
}
