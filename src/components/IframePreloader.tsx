'use client'

export function IframePreloader({ src }: { src: string }) {
  return (
    <iframe
      src={src}
      title="Preload"
      aria-hidden="true"
      tabIndex={-1}
      loading="eager"
      sandbox="allow-same-origin allow-scripts"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        opacity: 0,
        pointerEvents: 'none',
        visibility: 'hidden',
        left: '-9999px',
      }}
    />
  )
}
