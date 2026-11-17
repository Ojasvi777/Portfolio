'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  FolderKanban,
  BookOpen,
  ListFilter,
  BarChart3,
  Layers,
  Wrench,
  Workflow,
  Mail,
  Home,
  ExternalLink,
  ArrowRight,
  X
} from 'lucide-react';

interface PaletteItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Projects' | 'Cases' | 'Metrics' | 'Navigation' | 'Contact';
  route: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PALETTE_ITEMS: PaletteItem[] = [
  // Navigation
  {
    id: 'nav-depot',
    title: 'The Depot Yard',
    subtitle: 'Full-screen 3D shipping yard landing experience',
    category: 'Navigation',
    route: '/',
    badge: 'Depot',
    icon: Home
  },
  {
    id: 'nav-work',
    title: 'The Work (Studio)',
    subtitle: 'All 7 projects, roles, impact and evidence status',
    category: 'Navigation',
    route: '/studio/work',
    badge: 'Studio',
    icon: FolderKanban
  },
  {
    id: 'nav-cases',
    title: 'Cases & PRD Reader',
    subtitle: 'Executive doc reader with sticky TOC and inline notes',
    category: 'Navigation',
    route: '/studio/cases',
    badge: 'Studio',
    icon: BookOpen
  },
  {
    id: 'nav-decision-log',
    title: 'Decision Log',
    subtitle: '3D Flip cards: What I chose NOT to build',
    category: 'Navigation',
    route: '/studio/cases#decision-log',
    badge: 'Strategy',
    icon: ListFilter
  },
  {
    id: 'nav-observe',
    title: 'Observe Metrics',
    subtitle: 'Verification table with MEASURED and ESTIMATE chips',
    category: 'Navigation',
    route: '/observe',
    badge: 'Metrics',
    icon: BarChart3
  },
  {
    id: 'nav-toolkit',
    title: 'Toolkit & Tech Stack',
    subtitle: 'AI/ML, Full-stack Engineering, and Product tools',
    category: 'Navigation',
    route: '/studio/toolkit',
    badge: 'Skills',
    icon: Wrench
  },
  {
    id: 'nav-process',
    title: 'Product Process',
    subtitle: 'Discover, Decide, Ship, and Measure methodology',
    category: 'Navigation',
    route: '/studio/process',
    badge: 'Methodology',
    icon: Workflow
  },
  {
    id: 'nav-contact',
    title: 'Say Hello / Contact',
    subtitle: 'Email, LinkedIn, GitHub channels',
    category: 'Contact',
    route: '/studio/contact',
    badge: 'Connect',
    icon: Mail
  },

  // Projects
  {
    id: 'proj-stageconnect',
    title: 'StageConnect',
    subtitle: 'Marketplace for brands, agencies and theatre groups to find live-performance talent',
    category: 'Projects',
    route: '/studio/work/stageconnect',
    badge: 'Pre-launch',
    icon: FolderKanban
  },
  {
    id: 'proj-kgh',
    title: 'KGH platform',
    subtitle: 'Custom e-commerce & appointment booking site for Kathuria Gun House',
    category: 'Projects',
    route: '/studio/work/kgh-platform',
    badge: 'Live',
    icon: FolderKanban
  },
  {
    id: 'proj-license',
    title: 'License Verification Automation',
    subtitle: 'OCR and portal automation checking customer firearm licenses',
    category: 'Projects',
    route: '/studio/work/license-verification',
    badge: 'Automation',
    icon: FolderKanban
  },
  {
    id: 'proj-finassist',
    title: 'FinAssist',
    subtitle: 'Chatbot answering AmEx card questions with source links and confidence scores',
    category: 'Projects',
    route: '/studio/work/finassist',
    badge: 'Demo',
    icon: FolderKanban
  },
  {
    id: 'proj-cropsky',
    title: 'CropSky ML models',
    subtitle: 'XGBoost sensor recommendation & CNN leaf disease detection',
    category: 'Projects',
    route: '/studio/work/cropsky-ml',
    badge: 'Shipped',
    icon: FolderKanban
  },
  {
    id: 'proj-energy',
    title: 'Global Energy Trends Dashboard',
    subtitle: 'Forecasts and trends for energy use across 200+ countries',
    category: 'Projects',
    route: '/studio/work/global-energy',
    badge: 'Complete',
    icon: FolderKanban
  },
  {
    id: 'proj-perplexity',
    title: 'Perplexity Product Teardown',
    subtitle: 'Teardown of search experience and Evidence-first Answers proposal',
    category: 'Projects',
    route: '/studio/work/perplexity-teardown',
    badge: 'Concept',
    icon: FolderKanban
  },

  // Cases
  {
    id: 'case-500-appt',
    title: 'Case 01: The Rs 500 Appointment',
    subtitle: 'KGH appointment fee trade-off: filtering tire-kickers with skin in the game',
    category: 'Cases',
    route: '/studio/cases#case-1',
    badge: 'Case Study',
    icon: BookOpen
  },
  {
    id: 'case-stageconnect-pivot',
    title: 'Case 02: Why StageConnect Pivoted',
    subtitle: 'Benchmarking 10+ platforms and shifting from broad directories to verified live gigs',
    category: 'Cases',
    route: '/studio/cases#case-2',
    badge: 'Case Study',
    icon: BookOpen
  },
  {
    id: 'case-license-ocr',
    title: 'Case 03: Finding the Second Problem',
    subtitle: 'License checking unprompted automation: saving ~80% manual administrative effort',
    category: 'Cases',
    route: '/studio/cases#case-3',
    badge: 'Case Study',
    icon: BookOpen
  },
  {
    id: 'case-trust-latency',
    title: 'Case 04: Trading 200 ms for Trust',
    subtitle: 'FinAssist: trading ~200ms latency for a Bayesian confidence filter in financial perk advice',
    category: 'Cases',
    route: '/studio/cases#case-4',
    badge: 'Case Study',
    icon: BookOpen
  },
  {
    id: 'case-wise-work',
    title: 'Case 05: Customer Analysis at Wise Work',
    subtitle: 'Root-cause analysis on 250K+ interaction records to isolate 35-50 demographic',
    category: 'Cases',
    route: '/studio/cases#case-5',
    badge: 'Case Study',
    icon: BookOpen
  },
  {
    id: 'case-zudio-survey',
    title: 'Case 06: Field Research at Zudio',
    subtitle: 'In-person survey of 33 shoppers at Vellore store evaluating fabric quality vs low price',
    category: 'Cases',
    route: '/studio/cases#case-6',
    badge: 'Case Study',
    icon: BookOpen
  },
  {
    id: 'case-calendar-prd',
    title: 'PRD: Google Calendar for Student Event Organizers',
    subtitle: 'Product teardown addressing campus hall booking conflicts & sync gaps',
    category: 'Cases',
    route: '/studio/cases#prd-calendar',
    badge: 'In Progress',
    icon: BookOpen
  },

  // Metrics
  {
    id: 'met-waitlist',
    title: 'Metric: ~500 Waitlist (StageConnect)',
    subtitle: 'Pre-launch waitlist database tally',
    category: 'Metrics',
    route: '/observe',
    badge: 'Waitlist',
    icon: BarChart3
  },
  {
    id: 'met-precision',
    title: 'Metric: 95% Precision@4 (FinAssist)',
    subtitle: 'Measured evaluation benchmark on AMEX card terms',
    category: 'Metrics',
    route: '/observe',
    badge: 'MEASURED',
    icon: BarChart3
  },
  {
    id: 'met-cropsky-acc',
    title: 'Metric: 94.24% Crop Accuracy (CropSky)',
    subtitle: 'Measured XGBoost classification accuracy on soil & sensor samples',
    category: 'Metrics',
    route: '/observe',
    badge: 'MEASURED',
    icon: BarChart3
  },
  {
    id: 'met-kgh-time',
    title: 'Metric: 2-Month Delivery (KGH)',
    subtitle: 'Client project delivery timeframe',
    category: 'Metrics',
    route: '/observe',
    badge: 'Shipped',
    icon: BarChart3
  }
];

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via custom event or parent
          window.dispatchEvent(new CustomEvent('open-command-palette'));
        }
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter items based on search query
  const filteredItems = PALETTE_ITEMS.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.badge?.toLowerCase().includes(q)
    );
  });

  const handleSelect = (item: PaletteItem) => {
    onClose();
    router.push(item.route);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150 select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#1e1f20] border border-[#3c4043] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="relative flex items-center px-4 py-3 border-b border-[#2d2f31] bg-[#18191b]">
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search projects, decisions, metrics, or type to navigate..."
            className="w-full pl-9 pr-16 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-sans"
          />
          <div className="absolute right-4 flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-400 border border-zinc-700">
              ESC
            </kbd>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Search className="w-8 h-8 text-zinc-600 mx-auto" />
              <div className="text-xs text-zinc-400 font-medium">No results found for &ldquo;{query}&rdquo;</div>
              <div className="text-[11px] text-zinc-600">Try searching for StageConnect, FinAssist, or metrics.</div>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-600 text-white' : 'text-zinc-300 hover:bg-[#282a2c]/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-semibold tracking-tight truncate flex items-center gap-2">
                        <span>{item.title}</span>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div
                        className={`text-[11px] truncate ${
                          isSelected ? 'text-white/80' : 'text-zinc-500'
                        }`}
                      >
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 pl-3">
                    <span
                      className={`text-[10px] font-mono uppercase ${
                        isSelected ? 'text-white/70' : 'text-zinc-600'
                      }`}
                    >
                      {item.category}
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-white' : 'text-zinc-600'
                      }`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-[#2d2f31] bg-[#18191b] flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <div>{filteredItems.length} results</div>
        </div>
      </div>
    </div>
  );
}
