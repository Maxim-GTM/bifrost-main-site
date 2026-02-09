'use client'

import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export function OrbitingElements() {
  const { scrollY } = useScrollAnimation()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Central orbit system */}
      <div
        className="absolute top-1/2 left-1/2 h-16 w-16"
        style={{
          transform: `translate(-50%, -50%) translateY(${scrollY * 0.1}px)`,
        }}
      >
        <div className="relative">
          {/* Orbital path visualization */}
          <div
            className="absolute top-1/2 left-1/2 h-40 w-40 rounded-full border border-green-300/20"
            style={{ transform: 'translate(-50%, -50%)' }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 h-60 w-60 rounded-full border border-green-200/15"
            style={{ transform: 'translate(-50%, -50%)' }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 h-80 w-80 rounded-full border border-green-100/10"
            style={{ transform: 'translate(-50%, -50%)' }}
          ></div>

          <div
            className="animate-orbit absolute h-8 w-8 rounded-full bg-green-400/90 shadow-lg"
            style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)' }}
          >
            <div className="animate-twinkle h-full w-full rounded-full bg-green-500" />
          </div>
          <div
            className="animate-orbit absolute h-6 w-6 rounded-full bg-green-300/80 shadow-md"
            style={{
              animationDelay: '5s',
              animationDuration: '15s',
              boxShadow: '0 0 15px rgba(52, 211, 153, 0.5)',
            }}
          >
            <div
              className="animate-twinkle h-full w-full rounded-full bg-green-400"
              style={{ animationDelay: '1s' }}
            />
          </div>
          <div
            className="animate-orbit absolute h-4 w-4 rounded-full bg-green-200/70 shadow-sm"
            style={{
              animationDelay: '10s',
              animationDuration: '25s',
              boxShadow: '0 0 12px rgba(34, 197, 94, 0.4)',
            }}
          >
            <div
              className="animate-twinkle h-full w-full rounded-full bg-green-300"
              style={{ animationDelay: '2s' }}
            />
          </div>
        </div>
      </div>

      {/* Secondary orbit system */}
      <div
        className="absolute top-1/4 right-1/3 h-12 w-12"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      >
        <div className="relative">
          {/* Smaller orbital paths */}
          <div
            className="absolute top-1/2 left-1/2 h-24 w-24 rounded-full border border-green-300/15"
            style={{ transform: 'translate(-50%, -50%)' }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 h-36 w-36 rounded-full border border-green-200/10"
            style={{ transform: 'translate(-50%, -50%)' }}
          ></div>

          <div
            className="animate-orbit absolute h-6 w-6 rounded-full bg-green-500/80 shadow-md"
            style={{
              animationDelay: '2s',
              animationDuration: '12s',
              boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)',
            }}
          >
            <div
              className="animate-twinkle h-full w-full rounded-full bg-green-600"
              style={{ animationDelay: '0.5s' }}
            />
          </div>
          <div
            className="animate-orbit absolute h-4 w-4 rounded-full bg-green-300/70 shadow-sm"
            style={{
              animationDelay: '6s',
              animationDuration: '18s',
              boxShadow: '0 0 12px rgba(52, 211, 153, 0.4)',
            }}
          >
            <div
              className="animate-twinkle h-full w-full rounded-full bg-green-400"
              style={{ animationDelay: '1.5s' }}
            />
          </div>
        </div>
      </div>

      {/* Third orbit system */}
      <div
        className="absolute bottom-1/4 left-1/4 h-10 w-10"
        style={{
          transform: `translateY(${scrollY * -0.12}px)`,
        }}
      >
        <div className="relative">
          {/* Orbital paths */}
          <div
            className="absolute top-1/2 left-1/2 h-20 w-20 rounded-full border border-green-300/15"
            style={{ transform: 'translate(-50%, -50%)' }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 h-32 w-32 rounded-full border border-green-200/10"
            style={{ transform: 'translate(-50%, -50%)' }}
          ></div>

          <div
            className="animate-orbit absolute h-5 w-5 rounded-full bg-green-400/80 shadow-md"
            style={{
              animationDelay: '3s',
              animationDuration: '20s',
              boxShadow: '0 0 12px rgba(16, 185, 129, 0.5)',
            }}
          >
            <div
              className="animate-twinkle h-full w-full rounded-full bg-green-500"
              style={{ animationDelay: '2.5s' }}
            />
          </div>
          <div
            className="animate-orbit absolute h-3 w-3 rounded-full bg-green-200/65 shadow-sm"
            style={{
              animationDelay: '8s',
              animationDuration: '14s',
              boxShadow: '0 0 10px rgba(52, 211, 153, 0.4)',
            }}
          >
            <div
              className="animate-twinkle h-full w-full rounded-full bg-green-300"
              style={{ animationDelay: '1.8s' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
