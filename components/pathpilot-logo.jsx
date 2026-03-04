"use client";

import React from "react";

export default function PathPilotLogo() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-12 w-40" />
    );
  }

  return (
    <div className="relative inline-block">
      <svg
        width="200"
        height="60"
        viewBox="0 0 200 60"
        className="h-12 w-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 0.3 }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* 3D Shadow Layer */}
        <text
          x="100"
          y="42"
          fontFamily="Arial Black, sans-serif"
          fontSize="32"
          fontWeight="900"
          textAnchor="middle"
          fill="url(#shadowGradient)"
          className="transform translate-y-1"
        >
          PathPilot
        </text>
        
        {/* Main 3D Text */}
        <text
          x="100"
          y="40"
          fontFamily="Arial Black, sans-serif"
          fontSize="32"
          fontWeight="900"
          textAnchor="middle"
          fill="url(#textGradient)"
          filter="url(#glow)"
          className="animate-pulse"
        >
          PathPilot
        </text>
        
        {/* Animated underline */}
        <rect
          x="30"
          y="48"
          width="140"
          height="3"
          rx="1.5"
          fill="url(#textGradient)"
          className="animate-pulse"
          style={{ animationDuration: '2s' }}
        />
      </svg>
    </div>
  );
}
