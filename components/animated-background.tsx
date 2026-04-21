"use client"

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-background to-blue-50" />
      <div className="absolute -left-40 -top-40 h-80 w-80 animate-pulse rounded-full bg-blue-500/10 blur-3xl" />
      <div
        className="absolute -right-40 top-1/4 h-96 w-96 animate-pulse rounded-full bg-slate-400/12 blur-3xl"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute -bottom-40 left-1/3 h-80 w-80 animate-pulse rounded-full bg-blue-700/8 blur-3xl"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  )
}
