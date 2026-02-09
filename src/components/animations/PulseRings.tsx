'use client'

import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export function CircuitFlows() {
  const { scrollY } = useScrollAnimation()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Horizontal circuit flows */}
      <div
        className="absolute top-1/4 left-0 h-px w-full"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <div className="relative h-full w-full">
          <div className="animate-flow-right absolute left-0 h-px w-32 bg-gradient-to-r from-transparent via-green-400/80 to-transparent"></div>
          <div
            className="animate-flow-right absolute left-1/4 h-px w-24 bg-gradient-to-r from-transparent via-green-300/70 to-transparent"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="animate-flow-right absolute left-1/2 h-px w-40 bg-gradient-to-r from-transparent via-green-500/60 to-transparent"
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className="animate-flow-right absolute left-3/4 h-px w-28 bg-gradient-to-r from-transparent via-green-400/75 to-transparent"
            style={{ animationDelay: '0.5s' }}
          ></div>
        </div>
      </div>

      {/* Vertical circuit flows */}
      <div
        className="absolute top-0 left-1/3 h-full w-px"
        style={{
          transform: `translateX(${scrollY * 0.15}px)`,
        }}
      >
        <div className="relative h-full w-full">
          <div className="animate-flow-down absolute top-0 h-32 w-px bg-gradient-to-b from-transparent via-green-400/80 to-transparent"></div>
          <div
            className="animate-flow-down absolute top-1/4 h-24 w-px bg-gradient-to-b from-transparent via-green-300/70 to-transparent"
            style={{ animationDelay: '1.5s' }}
          ></div>
          <div
            className="animate-flow-down absolute top-1/2 h-40 w-px bg-gradient-to-b from-transparent via-green-500/60 to-transparent"
            style={{ animationDelay: '0.8s' }}
          ></div>
          <div
            className="animate-flow-down absolute top-3/4 h-32 w-px bg-gradient-to-b from-transparent via-green-400/75 to-transparent"
            style={{ animationDelay: '2.2s' }}
          ></div>
        </div>
      </div>

      {/* Diagonal circuit flows */}
      <div
        className="absolute top-1/2 left-1/4 h-px w-64 rotate-45"
        style={{
          transform: `rotate(45deg) translateY(${scrollY * 0.2}px)`,
        }}
      >
        <div className="relative h-full w-full">
          <div className="animate-flow-right absolute left-0 h-px w-32 bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
          <div
            className="animate-flow-right absolute left-1/3 h-px w-24 bg-gradient-to-r from-transparent via-green-300/40 to-transparent"
            style={{ animationDelay: '2.5s' }}
          ></div>
        </div>
      </div>

      {/* Splitting rays from center */}
      <div
        className="absolute top-1/2 left-1/2 h-2 w-2"
        style={{
          transform: `translate(-50%, -50%) translateY(${scrollY * 0.12}px)`,
        }}
      >
        {/* Ray 1 - Top */}
        <div
          className="animate-ray-extend absolute top-0 left-1/2 h-32 w-px origin-bottom bg-gradient-to-t from-green-400/80 to-transparent"
          style={{ transform: 'translateX(-50%)' }}
        ></div>

        {/* Ray 2 - Top Right */}
        <div
          className="animate-ray-extend absolute top-0 left-1/2 h-24 w-px origin-bottom bg-gradient-to-t from-green-300/70 to-transparent"
          style={{ transform: 'translateX(-50%) rotate(45deg)', animationDelay: '0.3s' }}
        ></div>

        {/* Ray 3 - Right */}
        <div
          className="animate-ray-extend absolute top-1/2 left-0 h-px w-32 origin-left bg-gradient-to-r from-green-400/80 to-transparent"
          style={{ transform: 'translateY(-50%)' }}
        ></div>

        {/* Ray 4 - Bottom Right */}
        <div
          className="animate-ray-extend absolute top-1/2 left-0 h-px w-24 origin-left bg-gradient-to-r from-green-300/70 to-transparent"
          style={{ transform: 'translateY(-50%) rotate(45deg)', animationDelay: '0.6s' }}
        ></div>

        {/* Ray 5 - Bottom */}
        <div
          className="animate-ray-extend absolute top-1/2 left-1/2 h-32 w-px origin-top bg-gradient-to-b from-green-400/80 to-transparent"
          style={{ transform: 'translateX(-50%)' }}
        ></div>

        {/* Ray 6 - Bottom Left */}
        <div
          className="animate-ray-extend absolute top-1/2 left-1/2 h-24 w-px origin-top bg-gradient-to-b from-green-300/70 to-transparent"
          style={{ transform: 'translateX(-50%) rotate(45deg)', animationDelay: '0.9s' }}
        ></div>

        {/* Ray 7 - Left */}
        <div
          className="animate-ray-extend absolute top-1/2 left-1/2 h-px w-32 origin-right bg-gradient-to-l from-green-400/80 to-transparent"
          style={{ transform: 'translateY(-50%)' }}
        ></div>

        {/* Ray 8 - Top Left */}
        <div
          className="animate-ray-extend absolute top-1/2 left-1/2 h-px w-24 origin-right bg-gradient-to-l from-green-300/70 to-transparent"
          style={{ transform: 'translateY(-50%) rotate(45deg)', animationDelay: '1.2s' }}
        ></div>

        {/* Central glowing core */}
        <div
          className="absolute top-1/2 left-1/2 h-2 w-2 animate-pulse rounded-full bg-green-400/90"
          style={{ transform: 'translate(-50%, -50%)' }}
        ></div>
      </div>

      {/* Secondary smaller ray burst */}
      <div
        className="absolute top-1/4 right-1/4 h-1 w-1"
        style={{
          transform: `translateY(${scrollY * 0.18}px)`,
        }}
      >
        <div
          className="animate-ray-extend absolute top-0 left-1/2 h-12 w-px origin-bottom bg-gradient-to-t from-green-300/40 to-transparent"
          style={{ transform: 'translateX(-50%)', animationDelay: '1.5s' }}
        ></div>
        <div
          className="animate-ray-extend absolute top-1/2 left-0 h-px w-12 origin-left bg-gradient-to-r from-green-300/40 to-transparent"
          style={{ transform: 'translateY(-50%)', animationDelay: '1.8s' }}
        ></div>
        <div
          className="animate-ray-extend absolute top-1/2 left-1/2 h-12 w-px origin-top bg-gradient-to-b from-green-300/40 to-transparent"
          style={{ transform: 'translateX(-50%)', animationDelay: '2.1s' }}
        ></div>
        <div
          className="animate-ray-extend absolute top-1/2 left-1/2 h-px w-12 origin-right bg-gradient-to-l from-green-300/40 to-transparent"
          style={{ transform: 'translateY(-50%)', animationDelay: '2.4s' }}
        ></div>
      </div>

      {/* Additional horizontal line flows */}
      <div
        className="absolute top-2/3 left-0 h-px w-full"
        style={{
          transform: `translateY(${scrollY * -0.05}px)`,
        }}
      >
        <div className="relative h-full w-full">
          <div className="animate-flow-right absolute left-0 h-px w-32 bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
          <div
            className="animate-flow-right absolute left-1/3 h-px w-24 bg-gradient-to-r from-transparent via-green-300/40 to-transparent"
            style={{ animationDelay: '1.5s' }}
          ></div>
          <div
            className="animate-flow-right absolute left-2/3 h-px w-28 bg-gradient-to-r from-transparent via-green-500/30 to-transparent"
            style={{ animationDelay: '3s' }}
          ></div>
        </div>
      </div>

      {/* Vertical line flows on right */}
      <div
        className="absolute top-0 right-1/4 h-full w-px"
        style={{
          transform: `translateX(${scrollY * -0.12}px)`,
        }}
      >
        <div className="relative h-full w-full">
          <div className="animate-flow-down absolute top-0 h-32 w-px bg-gradient-to-b from-transparent via-green-400/50 to-transparent"></div>
          <div
            className="animate-flow-down absolute top-1/3 h-24 w-px bg-gradient-to-b from-transparent via-green-300/40 to-transparent"
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className="animate-flow-down absolute top-2/3 h-28 w-px bg-gradient-to-b from-transparent via-green-500/30 to-transparent"
            style={{ animationDelay: '4s' }}
          ></div>
        </div>
      </div>

      {/* Additional diagonal line flows */}
      <div
        className="absolute top-1/6 left-1/6 h-px w-32 rotate-12"
        style={{
          transform: `rotate(12deg) translateY(${scrollY * 0.08}px)`,
        }}
      >
        <div className="relative h-full w-full">
          <div
            className="animate-flow-right absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-green-400/40 to-transparent"
            style={{ animationDelay: '0.5s' }}
          ></div>
        </div>
      </div>

      <div
        className="absolute top-3/4 right-1/6 h-px w-32 -rotate-12"
        style={{
          transform: `rotate(-12deg) translateY(${scrollY * -0.08}px)`,
        }}
      >
        <div className="relative h-full w-full">
          <div
            className="animate-flow-right absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-green-400/40 to-transparent"
            style={{ animationDelay: '1s' }}
          ></div>
        </div>
      </div>

      {/* Additional vertical line on left */}
      <div
        className="absolute top-0 left-1/6 h-full w-px"
        style={{
          transform: `translateX(${scrollY * 0.08}px)`,
        }}
      >
        <div className="relative h-full w-full">
          <div
            className="animate-flow-down absolute top-0 h-36 w-px bg-gradient-to-b from-transparent via-green-400/40 to-transparent"
            style={{ animationDelay: '2.5s' }}
          ></div>
          <div
            className="animate-flow-down absolute top-1/2 h-32 w-px bg-gradient-to-b from-transparent via-green-300/30 to-transparent"
            style={{ animationDelay: '4.5s' }}
          ></div>
        </div>
      </div>

      {/* Cross-screen diagonal lines */}
      <div
        className="absolute top-1/3 left-0 h-px w-64 rotate-6"
        style={{
          transform: `rotate(6deg) translateY(${scrollY * 0.06}px)`,
        }}
      >
        <div className="relative h-full w-full">
          <div
            className="animate-flow-right absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-green-300/30 to-transparent"
            style={{ animationDelay: '3.5s' }}
          ></div>
        </div>
      </div>

      <div
        className="absolute right-0 bottom-1/3 h-px w-64 -rotate-6"
        style={{
          transform: `rotate(-6deg) translateY(${scrollY * -0.06}px)`,
        }}
      >
        <div className="relative h-full w-full">
          <div
            className="animate-flow-right absolute right-0 h-px w-full bg-gradient-to-l from-transparent via-green-300/30 to-transparent"
            style={{ animationDelay: '4.5s' }}
          ></div>
        </div>
      </div>
    </div>
  )
}

// Export as PulseRings for backward compatibility
export { CircuitFlows as PulseRings }
