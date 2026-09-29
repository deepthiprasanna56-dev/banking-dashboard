export default function ApexLogo({ size = 36, className = '', showGlow = true }) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      {showGlow && (
        <div 
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-teal-500/40 via-emerald-400/30 to-lime-300/40 blur-md opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" 
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="apexGradMain" x1="6" y1="3" x2="42" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="45%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>
          <linearGradient id="apexGradFacet" x1="24" y1="3" x2="42" y2="35" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
          <radialGradient id="apexCoreGlow" cx="24" cy="24" r="7" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="65%" stopColor="#b4ea6c" />
            <stop offset="100%" stopColor="#10b981" />
          </radialGradient>
          <filter id="apexShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="3.5" floodColor="#042f2e" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Outer Apex Hexagon Prism */}
        <path
          d="M24 3.5L42 13.8V34.2L24 44.5L6 34.2V13.8L24 3.5Z"
          fill="url(#apexGradMain)"
          stroke="#2dd4bf"
          strokeWidth="1.3"
          strokeLinejoin="round"
          filter="url(#apexShadow)"
        />

        {/* Top-Right Refraction Facet */}
        <path
          d="M24 3.5L42 13.8L24 24L6 13.8L24 3.5Z"
          fill="white"
          fillOpacity="0.16"
        />

        {/* Lower Right Depth Shade */}
        <path
          d="M42 13.8V34.2L24 24L42 13.8Z"
          fill="black"
          fillOpacity="0.2"
        />

        {/* Inner Geometric Apex Chevron / Diamond */}
        <path
          d="M24 10L36 17.5V30.5L24 38L12 30.5V17.5L24 10Z"
          stroke="url(#apexGradFacet)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Intersecting Precision Nodes */}
        <line x1="24" y1="10" x2="24" y2="18" stroke="#a7f3d0" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="36" y1="30.5" x2="29" y2="26.5" stroke="#a7f3d0" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="12" y1="30.5" x2="19" y2="26.5" stroke="#a7f3d0" strokeWidth="1.8" strokeLinecap="round" />

        {/* Central Luminous Core */}
        <circle cx="24" cy="24" r="5" fill="url(#apexCoreGlow)" />
        <circle cx="24" cy="24" r="2" fill="#ffffff" />
      </svg>
    </div>
  );
}
