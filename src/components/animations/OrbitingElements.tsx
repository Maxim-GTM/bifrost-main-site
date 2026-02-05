'use client'

import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export function OrbitingElements() {
  const { scrollY } = useScrollAnimation()
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Central orbit system */}
      <div 
        className="absolute top-1/2 left-1/2 w-16 h-16"
        style={{
          transform: `translate(-50%, -50%) translateY(${scrollY * 0.1}px)`
        }}
      >
        <div className="relative">
          {/* Orbital path visualization */}
          <div className="absolute top-1/2 left-1/2 w-40 h-40 border border-green-300/20 rounded-full" style={{ transform: 'translate(-50%, -50%)' }}></div>
          <div className="absolute top-1/2 left-1/2 w-60 h-60 border border-green-200/15 rounded-full" style={{ transform: 'translate(-50%, -50%)' }}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 border border-green-100/10 rounded-full" style={{ transform: 'translate(-50%, -50%)' }}></div>
          
          <div className="absolute w-8 h-8 bg-green-400/90 rounded-full animate-orbit shadow-lg" style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)' }}>
            <div className="w-full h-full bg-green-500 rounded-full animate-twinkle" />
          </div>
          <div className="absolute w-6 h-6 bg-green-300/80 rounded-full animate-orbit shadow-md" style={{ animationDelay: '5s', animationDuration: '15s', boxShadow: '0 0 15px rgba(52, 211, 153, 0.5)' }}>
            <div className="w-full h-full bg-green-400 rounded-full animate-twinkle" style={{ animationDelay: '1s' }} />
          </div>
          <div className="absolute w-4 h-4 bg-green-200/70 rounded-full animate-orbit shadow-sm" style={{ animationDelay: '10s', animationDuration: '25s', boxShadow: '0 0 12px rgba(34, 197, 94, 0.4)' }}>
            <div className="w-full h-full bg-green-300 rounded-full animate-twinkle" style={{ animationDelay: '2s' }} />
          </div>
        </div>
      </div>
      
      {/* Secondary orbit system */}
      <div 
        className="absolute top-1/4 right-1/3 w-12 h-12"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`
        }}
      >
        <div className="relative">
          {/* Smaller orbital paths */}
          <div className="absolute top-1/2 left-1/2 w-24 h-24 border border-green-300/15 rounded-full" style={{ transform: 'translate(-50%, -50%)' }}></div>
          <div className="absolute top-1/2 left-1/2 w-36 h-36 border border-green-200/10 rounded-full" style={{ transform: 'translate(-50%, -50%)' }}></div>
          
          <div className="absolute w-6 h-6 bg-green-500/80 rounded-full animate-orbit shadow-md" style={{ animationDelay: '2s', animationDuration: '12s', boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)' }}>
            <div className="w-full h-full bg-green-600 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }} />
          </div>
          <div className="absolute w-4 h-4 bg-green-300/70 rounded-full animate-orbit shadow-sm" style={{ animationDelay: '6s', animationDuration: '18s', boxShadow: '0 0 12px rgba(52, 211, 153, 0.4)' }}>
            <div className="w-full h-full bg-green-400 rounded-full animate-twinkle" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </div>
      
      {/* Third orbit system */}
      <div 
        className="absolute bottom-1/4 left-1/4 w-10 h-10"
        style={{
          transform: `translateY(${scrollY * -0.12}px)`
        }}
      >
        <div className="relative">
          {/* Orbital paths */}
          <div className="absolute top-1/2 left-1/2 w-20 h-20 border border-green-300/15 rounded-full" style={{ transform: 'translate(-50%, -50%)' }}></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-green-200/10 rounded-full" style={{ transform: 'translate(-50%, -50%)' }}></div>
          
          <div className="absolute w-5 h-5 bg-green-400/80 rounded-full animate-orbit shadow-md" style={{ animationDelay: '3s', animationDuration: '20s', boxShadow: '0 0 12px rgba(16, 185, 129, 0.5)' }}>
            <div className="w-full h-full bg-green-500 rounded-full animate-twinkle" style={{ animationDelay: '2.5s' }} />
          </div>
          <div className="absolute w-3 h-3 bg-green-200/65 rounded-full animate-orbit shadow-sm" style={{ animationDelay: '8s', animationDuration: '14s', boxShadow: '0 0 10px rgba(52, 211, 153, 0.4)' }}>
            <div className="w-full h-full bg-green-300 rounded-full animate-twinkle" style={{ animationDelay: '1.8s' }} />
          </div>
        </div>
      </div>
    </div>
  )
} 