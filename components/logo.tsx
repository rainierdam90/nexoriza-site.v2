export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <svg viewBox="0 0 120 120" className="h-full w-auto shrink-0 drop-shadow-[0_10px_18px_rgba(76,116,137,.18)]" role="img" aria-label="Next Horizons">
        <defs>
          <linearGradient id="software-glass" x1="8" y1="5" x2="112" y2="116"><stop stopColor="#fff"/><stop offset=".45" stopColor="#dcebef"/><stop offset="1" stopColor="#8fb2c0"/></linearGradient>
          <linearGradient id="software-chrome" x1="22" y1="24" x2="102" y2="96"><stop stopColor="#263b4c"/><stop offset=".38" stopColor="#7699aa"/><stop offset=".58" stopColor="#edf7f8"/><stop offset=".75" stopColor="#7896a6"/><stop offset="1" stopColor="#203747"/></linearGradient>
          <linearGradient id="software-gold" x1="72" y1="54" x2="109" y2="66"><stop stopColor="#8d6827"/><stop offset=".46" stopColor="#f0d58a"/><stop offset="1" stopColor="#a7792f"/></linearGradient>
        </defs>
        <rect x="4" y="4" width="112" height="112" rx="26" fill="url(#software-glass)" fillOpacity=".82" stroke="#fff" strokeWidth="2"/>
        <path d="M24 84V36H35L56 68V36H67V84H56L35 52V84H24Z" fill="url(#software-chrome)"/>
        <path d="M73 36H84V54H97V36H108V84H97V66H84V84H73V36Z" fill="url(#software-chrome)"/>
        <path d="M72 54H109L105 66H72V54Z" fill="url(#software-gold)"/>
        <path d="M18 17H76" stroke="#fff" strokeOpacity=".88" strokeWidth="3" strokeLinecap="round"/>
      </svg>
      <span className="flex flex-col justify-center">
        <span className="flex flex-col font-bold uppercase leading-[1.02] tracking-[.16em] text-[.92rem]"><span>Next</span><span>Horizons</span></span>
        <span className="mt-1 whitespace-nowrap text-[.43rem] font-semibold uppercase tracking-[.25em] text-[#6d8b9a]">Software &amp; Web Design</span>
      </span>
    </span>
  )
}
