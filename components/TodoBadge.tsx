'use client';

import React from 'react';

interface TodoBadgeProps {
  label: string;
  className?: string;
}

export default function TodoBadge({ label, className = '' }: TodoBadgeProps) {
  // Hidden in production, visible in development
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd) {
    return null;
  }

  const cleanLabel = label.startsWith('[') ? label : `[TODO: ${label}]`;

  return (
    <span 
      className={`inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-0.5 rounded border border-amber-500/40 bg-amber-500/10 text-amber-300 font-medium ${className}`}
      title="Placeholder requiring input from Ojasvi (hidden in production)"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
      <span>{cleanLabel}</span>
    </span>
  );
}
