"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  /** Aspect ratio as width / height — e.g. 16/9 = 1.777 */
  aspectRatio?: number
}

/**
 * Drag-to-compare before/after slider.
 *
 * Implementation notes:
 *   - The "after" image is the full background.
 *   - The "before" image is rendered on top, clipped to the area to the
 *     left of the slider position via clip-path inset.
 *   - Mouse and touch are handled together. Pointer events would be cleaner
 *     but Safari has historic quirks; this approach is well-tested.
 */
export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  aspectRatio = 4 / 3,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50) // percent
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Update slider position based on a clientX coordinate
  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = clientX - rect.left
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setPosition(pct)
  }

  useEffect(() => {
    if (!isDragging) return

    const onMouseMove = (e: MouseEvent) => updateFromClientX(e.clientX)
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) updateFromClientX(e.touches[0].clientX)
    }
    const stop = () => setIsDragging(false)

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    window.addEventListener("mouseup", stop)
    window.addEventListener("touchend", stop)
    window.addEventListener("touchcancel", stop)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("mouseup", stop)
      window.removeEventListener("touchend", stop)
      window.removeEventListener("touchcancel", stop)
    }
  }, [isDragging])

  // Click anywhere on the rail snaps the slider there
  const handleRailClick = (e: React.MouseEvent<HTMLDivElement>) => {
    updateFromClientX(e.clientX)
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-xl border border-border/50 bg-muted shadow-lg select-none"
      style={{ aspectRatio }}
      onClick={handleRailClick}
    >
      {/* AFTER (full background) */}
      <Image
        src={afterImage}
        alt={afterLabel}
        fill
        className="object-cover pointer-events-none"
        unoptimized // SVG placeholders + dynamic paths — skip Next image opt
        priority
      />

      {/* BEFORE (clipped overlay) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={beforeLabel}
          fill
          className="object-cover pointer-events-none"
          unoptimized
        />
      </div>

      {/* Labels (fade out the one currently mostly hidden) */}
      <div
        className="pointer-events-none absolute left-4 top-4 rounded-full bg-foreground/80 px-3 py-1 text-xs font-medium text-background backdrop-blur-sm transition-opacity"
        style={{ opacity: position > 12 ? 1 : 0 }}
      >
        {beforeLabel}
      </div>
      <div
        className="pointer-events-none absolute right-4 top-4 rounded-full bg-blue-700 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm transition-opacity"
        style={{ opacity: position < 88 ? 1 : 0 }}
      >
        {afterLabel}
      </div>

      {/* Slider handle + line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)]"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <button
          type="button"
          aria-label="Drag to compare"
          onMouseDown={(e) => {
            e.stopPropagation()
            setIsDragging(true)
          }}
          onTouchStart={(e) => {
            e.stopPropagation()
            setIsDragging(true)
          }}
          className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-white bg-blue-700 shadow-lg transition-transform hover:scale-110 active:scale-95"
        >
          <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
          </svg>
        </button>
      </div>
    </div>
  )
}
