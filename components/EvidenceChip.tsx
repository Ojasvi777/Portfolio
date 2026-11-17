'use client';

import React, { useState } from 'react';

export type EvidenceType = 'MEASURED' | 'ESTIMATE' | 'SELF-REPORTED';

interface EvidenceChipProps {
  type: EvidenceType;
  method?: string;
  size?: 'sm' | 'md';
  cleanTooltip?: boolean;
}

export default function EvidenceChip({ type, method, size = 'sm', cleanTooltip = false }: EvidenceChipProps) {
  // Never render SELF-REPORTED chips anywhere on the site
  if (type === 'SELF-REPORTED' || (type as string) === 'self-reported') {
    return null;
  }

  const [showTooltip, setShowTooltip] = useState(false);

  // Evidence colors
  const styles = {
    MEASURED: {
      bg: 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400',
      dot: 'bg-emerald-400',
      label: 'MEASURED'
    },
    ESTIMATE: {
      bg: 'bg-amber-950/40 border-amber-500/30 text-amber-400',
      dot: 'bg-amber-400',
      label: 'ESTIMATE'
    },
    'SELF-REPORTED': {
      bg: 'bg-blue-950/40 border-blue-500/30 text-blue-400',
      dot: 'bg-blue-400',
      label: 'SELF-REPORTED'
    }
  }[type] || {
    bg: 'bg-zinc-800 border-zinc-700 text-zinc-300',
    dot: 'bg-zinc-400',
    label: type
  };

  const isSmall = size === 'sm';

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      tabIndex={0}
      role="note"
      aria-label={`Evidence: ${type}. Method: ${method || 'Not specified'}`}
    >
      <span className={`inline-flex items-center gap-1 font-mono tracking-wider font-semibold rounded border cursor-help select-none transition-colors ${
        isSmall ? 'text-[9px] px-1.5 py-0.5' : 'text-[11px] px-2 py-0.5'
      } ${styles.bg}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
        <span>{styles.label}</span>
      </span>

      {/* Tooltip on hover */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-50 w-56 p-2 rounded-lg bg-[#282a2c] border border-[#3c4043] text-white shadow-xl text-xs font-sans pointer-events-none animate-in fade-in zoom-in-95 duration-150">
          {!cleanTooltip && (
            <div className="text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-0.5">
              Verification Method
            </div>
          )}
          <div className="text-zinc-200 text-[11px] leading-snug">
            {method || 'Method details available in /content/data.json'}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#282a2c]" />
        </div>
      )}
    </div>
  );
}
