'use client'

import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export function CircuitFlows() {
  const { scrollY } = useScrollAnimation()
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Horizontal circuit flows */}
      <div 
        className="absolute top-1/4 left-0 w-full h-px"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute left-0 w-32 h-px bg-gradient-to-r from-transparent via-green-400/80 to-transparent animate-flow-right"></div>
          <div className="absolute left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-green-300/70 to-transparent animate-flow-right" style={{ animationDelay: '1s' }}></div>
          <div className="absolute left-1/2 w-40 h-px bg-gradient-to-r from-transparent via-green-500/60 to-transparent animate-flow-right" style={{ animationDelay: '2s' }}></div>
          <div className="absolute left-3/4 w-28 h-px bg-gradient-to-r from-transparent via-green-400/75 to-transparent animate-flow-right" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>

      {/* Vertical circuit flows */}
      <div 
        className="absolute top-0 left-1/3 w-px h-full"
        style={{
          transform: `translateX(${scrollY * 0.15}px)`
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute top-0 w-px h-32 bg-gradient-to-b from-transparent via-green-400/80 to-transparent animate-flow-down"></div>
          <div className="absolute top-1/4 w-px h-24 bg-gradient-to-b from-transparent via-green-300/70 to-transparent animate-flow-down" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 w-px h-40 bg-gradient-to-b from-transparent via-green-500/60 to-transparent animate-flow-down" style={{ animationDelay: '0.8s' }}></div>
          <div className="absolute top-3/4 w-px h-32 bg-gradient-to-b from-transparent via-green-400/75 to-transparent animate-flow-down" style={{ animationDelay: '2.2s' }}></div>
        </div>
      </div>

      {/* Diagonal circuit flows */}
      <div 
        className="absolute top-1/2 left-1/4 w-64 h-px rotate-45"
        style={{
          transform: `rotate(45deg) translateY(${scrollY * 0.2}px)`
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute left-0 w-32 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent animate-flow-right"></div>
          <div className="absolute left-1/3 w-24 h-px bg-gradient-to-r from-transparent via-green-300/40 to-transparent animate-flow-right" style={{ animationDelay: '2.5s' }}></div>
        </div>
      </div>

      {/* Splitting rays from center */}
      <div 
        className="absolute top-1/2 left-1/2 w-2 h-2"
        style={{
          transform: `translate(-50%, -50%) translateY(${scrollY * 0.12}px)`
        }}
      >
        {/* Ray 1 - Top */}
        <div className="absolute top-0 left-1/2 w-px h-32 bg-gradient-to-t from-green-400/80 to-transparent animate-ray-extend origin-bottom" style={{ transform: 'translateX(-50%)' }}></div>
        
        {/* Ray 2 - Top Right */}
        <div className="absolute top-0 left-1/2 w-px h-24 bg-gradient-to-t from-green-300/70 to-transparent animate-ray-extend origin-bottom" style={{ transform: 'translateX(-50%) rotate(45deg)', animationDelay: '0.3s' }}></div>
        
        {/* Ray 3 - Right */}
        <div className="absolute top-1/2 left-0 w-32 h-px bg-gradient-to-r from-green-400/80 to-transparent animate-ray-extend origin-left" style={{ transform: 'translateY(-50%)' }}></div>
        
        {/* Ray 4 - Bottom Right */}
        <div className="absolute top-1/2 left-0 w-24 h-px bg-gradient-to-r from-green-300/70 to-transparent animate-ray-extend origin-left" style={{ transform: 'translateY(-50%) rotate(45deg)', animationDelay: '0.6s' }}></div>
        
        {/* Ray 5 - Bottom */}
        <div className="absolute top-1/2 left-1/2 w-px h-32 bg-gradient-to-b from-green-400/80 to-transparent animate-ray-extend origin-top" style={{ transform: 'translateX(-50%)' }}></div>
        
        {/* Ray 6 - Bottom Left */}
        <div className="absolute top-1/2 left-1/2 w-px h-24 bg-gradient-to-b from-green-300/70 to-transparent animate-ray-extend origin-top" style={{ transform: 'translateX(-50%) rotate(45deg)', animationDelay: '0.9s' }}></div>
        
        {/* Ray 7 - Left */}
        <div className="absolute top-1/2 left-1/2 w-32 h-px bg-gradient-to-l from-green-400/80 to-transparent animate-ray-extend origin-right" style={{ transform: 'translateY(-50%)' }}></div>
        
        {/* Ray 8 - Top Left */}
        <div className="absolute top-1/2 left-1/2 w-24 h-px bg-gradient-to-l from-green-300/70 to-transparent animate-ray-extend origin-right" style={{ transform: 'translateY(-50%) rotate(45deg)', animationDelay: '1.2s' }}></div>
        
        {/* Central glowing core */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400/90 rounded-full animate-pulse" style={{ transform: 'translate(-50%, -50%)' }}></div>
      </div>

      {/* Secondary smaller ray burst */}
      <div 
        className="absolute top-1/4 right-1/4 w-1 h-1"
        style={{
          transform: `translateY(${scrollY * 0.18}px)`
        }}
      >
        <div className="absolute top-0 left-1/2 w-px h-12 bg-gradient-to-t from-green-300/40 to-transparent animate-ray-extend origin-bottom" style={{ transform: 'translateX(-50%)', animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-0 w-12 h-px bg-gradient-to-r from-green-300/40 to-transparent animate-ray-extend origin-left" style={{ transform: 'translateY(-50%)', animationDelay: '1.8s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-px h-12 bg-gradient-to-b from-green-300/40 to-transparent animate-ray-extend origin-top" style={{ transform: 'translateX(-50%)', animationDelay: '2.1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-12 h-px bg-gradient-to-l from-green-300/40 to-transparent animate-ray-extend origin-right" style={{ transform: 'translateY(-50%)', animationDelay: '2.4s' }}></div>
      </div>

      {/* Additional horizontal line flows */}
      <div 
        className="absolute top-2/3 left-0 w-full h-px"
        style={{
          transform: `translateY(${scrollY * -0.05}px)`
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute left-0 w-32 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent animate-flow-right"></div>
          <div className="absolute left-1/3 w-24 h-px bg-gradient-to-r from-transparent via-green-300/40 to-transparent animate-flow-right" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute left-2/3 w-28 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent animate-flow-right" style={{ animationDelay: '3s' }}></div>
        </div>
      </div>

      {/* Vertical line flows on right */}
      <div 
        className="absolute top-0 right-1/4 w-px h-full"
        style={{
          transform: `translateX(${scrollY * -0.12}px)`
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute top-0 w-px h-32 bg-gradient-to-b from-transparent via-green-400/50 to-transparent animate-flow-down"></div>
          <div className="absolute top-1/3 w-px h-24 bg-gradient-to-b from-transparent via-green-300/40 to-transparent animate-flow-down" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-2/3 w-px h-28 bg-gradient-to-b from-transparent via-green-500/30 to-transparent animate-flow-down" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      {/* Additional diagonal line flows */}
      <div 
        className="absolute top-1/6 left-1/6 w-32 h-px rotate-12"
        style={{
          transform: `rotate(12deg) translateY(${scrollY * 0.08}px)`
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400/40 to-transparent animate-flow-right" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>

      <div 
        className="absolute top-3/4 right-1/6 w-32 h-px -rotate-12"
        style={{
          transform: `rotate(-12deg) translateY(${scrollY * -0.08}px)`
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400/40 to-transparent animate-flow-right" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Additional vertical line on left */}
      <div 
        className="absolute top-0 left-1/6 w-px h-full"
        style={{
          transform: `translateX(${scrollY * 0.08}px)`
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute top-0 w-px h-36 bg-gradient-to-b from-transparent via-green-400/40 to-transparent animate-flow-down" style={{ animationDelay: '2.5s' }}></div>
          <div className="absolute top-1/2 w-px h-32 bg-gradient-to-b from-transparent via-green-300/30 to-transparent animate-flow-down" style={{ animationDelay: '4.5s' }}></div>
        </div>
      </div>

      {/* Cross-screen diagonal lines */}
      <div 
        className="absolute top-1/3 left-0 w-64 h-px rotate-6"
        style={{
          transform: `rotate(6deg) translateY(${scrollY * 0.06}px)`
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-green-300/30 to-transparent animate-flow-right" style={{ animationDelay: '3.5s' }}></div>
        </div>
      </div>

      <div 
        className="absolute bottom-1/3 right-0 w-64 h-px -rotate-6"
        style={{
          transform: `rotate(-6deg) translateY(${scrollY * -0.06}px)`
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute right-0 w-full h-px bg-gradient-to-l from-transparent via-green-300/30 to-transparent animate-flow-right" style={{ animationDelay: '4.5s' }}></div>
        </div>
      </div>
    </div>
  )
}

// Export as PulseRings for backward compatibility
export { CircuitFlows as PulseRings }
