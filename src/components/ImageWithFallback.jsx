import { useState, useEffect } from 'react'

export default function ImageWithFallback({ src, alt = '', className = '', fallback, ...rest }) {
  const { onClick, ...otherProps } = rest
  const defaultFallback = fallback || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="%23e5e7eb"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="%236b7280">Image+Unavailable</text></svg>'
  // src can be a string or an array of candidates
  const candidates = Array.isArray(src) ? src.filter(Boolean) : src ? [src] : []
  const [displaySrc, setDisplaySrc] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ... (keep usage of candidates same)
    let active = true
    setLoading(true)

    if (!candidates.length) {
      setDisplaySrc(null)
      setLoading(false)
      return
    }

    // Try each candidate sequentially until one loads
    const tryLoad = (index) => {
      if (!active) return
      if (index >= candidates.length) {
        setDisplaySrc(defaultFallback)
        setLoading(false)
        return
      }

      const url = candidates[index]
      const img = new Image()
      img.onload = () => {
        if (!active) return
        setDisplaySrc(url)
        setLoading(false)
      }
      img.onerror = () => {
        if (!active) return
        tryLoad(index + 1)
      }
      img.src = url
    }

    tryLoad(0)

    return () => {
      active = false
    }
  }, [candidates]) // eslint-disable-line

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      {displaySrc ? (
        <img
          src={displaySrc}
          alt={alt}
          className={className}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null
            setDisplaySrc(defaultFallback)
          }}
          onClick={(e) => {
            if (onClick) {
              onClick(displaySrc)
            }
          }}
          {...otherProps}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <svg width="280" height="140" viewBox="0 0 280 140" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
            <rect width="100%" height="100%" fill="#e5e7eb" />
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="18" fill="#6b7280">
              Image Unavailable
            </text>
          </svg>
        </div>
      )}
    </div>
  )
}
