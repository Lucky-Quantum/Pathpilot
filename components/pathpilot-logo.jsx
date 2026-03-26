"use client";

import React from "react";

export default function PathPilotLogo() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-16 w-40" />
    );
  }

  return (
    <div className="relative inline-block">
      <img
        src="/pathpilot_logo.svg"
        alt="PathPilot Logo"
        width={340}
        height={160}
        className="h-16 w-auto object-contain"
      />
    </div>
  );
}
