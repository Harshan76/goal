import React from 'react';

export function ProgressRing({
  progress = 0,
  size = 120,
  strokeWidth = 8,
  glowColor = '#38bdf8',
  strokeColor = 'url(#ringGradient)',
  label,
  subLabel,
  className = '',
  showPercentage = true,
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  const strokeDashoffset = circumference - (normalizedProgress / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="50%" stop-color="#0284c7" />
            <stop offset="100%" stop-color="#06b6d4" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: normalizedProgress > 0 ? 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.4))' : 'none',
          }}
        />
      </svg>

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
        {showPercentage ? (
          <span className="font-display font-extrabold text-white text-2xl tracking-tight leading-none">
            {normalizedProgress}%
          </span>
        ) : null}
        {label && <span className="text-[11px] font-semibold text-slate-300 mt-1 uppercase tracking-wider">{label}</span>}
        {subLabel && <span className="text-[10px] text-slate-500 font-medium">{subLabel}</span>}
      </div>
    </div>
  );
}
