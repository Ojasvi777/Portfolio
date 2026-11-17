'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Menu, 
  KeyRound, 
  Download, 
  ExternalLink,
  Layers,
  Sparkles,
  ArrowRight,
  FileDown
} from 'lucide-react';
import CommandPalette from '@/components/CommandPalette';
import ContactApiKeyModal from '@/components/ContactApiKeyModal';

interface TopBarProps {
  onToggleSidebar: () => void;
}

export default function TopBar({ onToggleSidebar }: TopBarProps) {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Listen for global custom event 'open-command-palette'
  useEffect(() => {
    const handleOpen = () => setIsPaletteOpen(true);
    window.addEventListener('open-command-palette', handleOpen);
    return () => window.removeEventListener('open-command-palette', handleOpen);
  }, []);

  const handleDownloadResume = () => {
    // Check if resume file exists or open contact modal
    window.open('/studio/contact', '_self');
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#1e1f20] border-b border-[#3c4043] px-4 md:px-6 py-2.5 flex items-center justify-between text-white select-none">
        {/* Left: Mobile Toggle & Quick Search with Cmd+K */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="p-1.5 rounded-lg hover:bg-[#282a2c] text-[#9aa0a6] hover:text-white transition-colors md:hidden"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Quick Search Button */}
          <button
            onClick={() => setIsPaletteOpen(true)}
            className="relative flex items-center w-64 lg:w-80 bg-[#131314] hover:bg-[#18191b] border border-[#3c4043] rounded-xl pl-9 pr-3 py-1.5 text-xs text-left text-[#80868b] hover:text-[#e3e3e3] hover:border-slate-500 transition-all cursor-pointer group"
          >
            <Search className="w-3.5 h-3.5 text-[#9aa0a6] absolute left-3 group-hover:text-blue-400 transition-colors pointer-events-none" />
            <span className="truncate">Search projects, cases, metrics...</span>
            <div className="ml-auto hidden sm:flex items-center gap-0.5">
              <kbd className="px-1.5 py-0.2 rounded bg-zinc-800 text-[10px] font-mono text-zinc-400 border border-zinc-700">
                ⌘K
              </kbd>
            </div>
          </button>
        </div>

        {/* Right: Studio Actions (AI Studio Layout Mapping) */}
        <div className="flex items-center space-x-2.5">
          {/* Import Projects / Resume Download Button */}
          <button
            onClick={handleDownloadResume}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300 hover:text-white bg-[#131314] hover:bg-[#282a2c] border border-[#3c4043] transition-colors"
            title="Import projects / Download Resume"
          >
            <FileDown className="w-3.5 h-3.5 text-zinc-400" />
            <span>Import Projects</span>
          </button>

          {/* Home Link */}
          <Link
            href="/"
            className="hidden md:inline-flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg bg-[#131314] text-zinc-300 border border-[#3c4043] hover:text-white hover:border-blue-500/50 transition-colors"
          >
            <span>The Depot</span>
            <ArrowRight className="w-3 h-3 text-zinc-400" />
          </Link>

          {/* 'Create API Key' Contact Button (AI Studio gag) */}
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5 text-white" />
            <span>Create API key</span>
          </button>
        </div>
      </header>

      {/* Global Modals */}
      <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
      <ContactApiKeyModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>
  );
}
