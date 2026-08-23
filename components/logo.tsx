import Image from "next/image"

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <Image
        src="/next-horizons-mark.svg"
        alt=""
        width={120}
        height={120}
        className="h-full w-auto shrink-0"
        priority
      />
      <span className="flex flex-col justify-center">
        <span className="flex flex-col font-bold uppercase leading-[1.02] tracking-[.16em] text-[.92rem]"><span>Next</span><span>Horizons</span></span>
        <span className="mt-1 whitespace-nowrap text-[.43rem] font-semibold uppercase tracking-[.25em] text-[#6d8b9a]">Software &amp; Web Design</span>
      </span>
    </span>
  )
}
