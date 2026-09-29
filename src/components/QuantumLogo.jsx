export default function QuantumLogo({ size = 36, className = '', showGlow = true }) {
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
          <linearGradient id="quantumGradOuter" x1="6.5" y1="3" x2="41.5" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="50%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#065f46" />
          </linearGradient>
          <linearGradient id="quantumGradInner" x1="12" y1="9.5" x2="36" y2="38.5" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <radialGradient id="quantumCoreGlow" cx="24" cy="24" r="6" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#b4ea6c" />
            <stop offset="100%" stopColor="#10b981" />
          </radialGradient>
          <filter id="quantumSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#042f2e" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Outer Hexagon Shield */}
        <path
          d="M24 3.5L41.5 13.8V34.2L24 44.5L6.5 34.2V13.8L24 3.5Z"
          fill="url(#quantumGradOuter)"
          stroke="#2dd4bf"
          strokeWidth="1.2"
          strokeLinejoin="round"
          filter="url(#quantumSoftShadow)"
        />

        {/* Geometric Refraction Facets */}
        <path
          d="M24 3.5L41.5 13.8L24 24L6.5 13.8L24 3.5Z"
          fill="white"
          fillOpacity="0.12"
        />
        <path
          d="M41.5 13.8V34.2L24 24L41.5 13.8Z"
          fill="black"
          fillOpacity="0.15"
        />

        {/* Inner Quantum Geometric Hex Ring */}
        <path
          d="M24 10.5L35.5 17.2V30.8L24 37.5L12.5 30.8V17.2L24 10.5Z"
          stroke="url(#quantumGradInner)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Inner Connecting Nodes */}
        <line x1="24" y1="10.5" x2="24" y2="18.5" stroke="#a7f3d0" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="35.5" y1="30.8" x2="29" y2="27" stroke="#a7f3d0" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="12.5" y1="30.8" x2="19" y2="27" stroke="#a7f3d0" strokeWidth="1.8" strokeLinecap="round" />

        {/* Pulsing Quantum Core Nucleus */}
        <circle cx="24" cy="24" r="5" fill="url(#quantumCoreGlow)" />
        <circle cx="24" cy="24" r="2" fill="#ffffff" />
      </svg>
    </div>
  );
}
