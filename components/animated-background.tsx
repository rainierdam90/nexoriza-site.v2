"use client"

import type { MouseEvent } from "react"

export function AnimatedBackground() {
  function handlePointer(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty("--pointer-x", `${((event.clientX - rect.left) / rect.width - 0.5) * 18}deg`)
    event.currentTarget.style.setProperty("--pointer-y", `${((event.clientY - rect.top) / rect.height - 0.5) * -14}deg`)
  }

  return (
    <div className="tech-field absolute inset-0 -z-10 overflow-hidden" onMouseMove={handlePointer} aria-hidden="true">
      <div className="tech-atmosphere absolute inset-0" />
      <div className="tech-grid absolute inset-0" />
      <div className="tech-orbit tech-orbit-one" />
      <div className="tech-orbit tech-orbit-two" />
      <div className="tech-core">
        <div className="tech-slab tech-slab-back"><span /></div>
        <div className="tech-slab tech-slab-mid"><span /></div>
        <div className="tech-slab tech-slab-front">
          <i /><i /><i /><b />
        </div>
      </div>
      <div className="tech-node node-one" /><div className="tech-node node-two" /><div className="tech-node node-three" />
      <div className="tech-glow tech-glow-one" /><div className="tech-glow tech-glow-two" />
    </div>
  )
}
