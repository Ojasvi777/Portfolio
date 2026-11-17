'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FolderKanban, 
  Workflow, 
  Wrench, 
  BookOpen, 
  ListFilter, 
  Activity, 
  Terminal, 
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  GraduationCap,
  Layers,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navGroups = [
    {
      group: 'PORTFOLIO',
      items: [
        {
          name: 'The Work',
          href: '/work',
          icon: FolderKanban,
          badge: '8 Projects'
        },
        {
          name: 'Cases & Decisions',
          href: '/cases',
          icon: BookOpen,
          badge: '6 Cases'
        },
        {
          name: 'Decision Log',
          href: '/cases#decision-log',
          icon: ListFilter,
          badge: 'What I Said No To'
        }
      ]
    },
    {
      group: 'ENGINEERING & TOOLS',
      items: [
        {
          name: 'Skills & Toolkit',
          href: '/toolkit',
          icon: Wrench,
          badge: 'Stack'
        },
        {
          name: 'Process',
          href: '/process',
          icon: Workflow,
          badge: 'Methodology'
        },
        {
          name: 'Metrics Ledger',
          href: '/observe',
          icon: Activity,
          badge: 'Evidence'
        }
      ]
    },
    {
      group: 'PROFILE',
      items: [
        {
          name: 'About Ojasvi',
          href: '/about',
          icon: GraduationCap,
          badge: 'VIT ' + 27
        },
        {
          name: 'Leadership & Fests',
          href: '/leadership',
          icon: Layers,
          badge: 'Outreach'
        }
      ]
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-sm"
        />
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-[#1e1f20] border-r border-[#3c4043] flex flex-col justify-between
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        h-screen select-none
      `}>
        {/* Top Header */}
        <div>
          <div className="p-4 border-b border-[#3c4043] flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-xs font-mono font-bold text-blue-400 group-hover:border-blue-400 transition-colors">
                OJ
              </div>
              <div>
                <div className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                  <span>Ojasvi</span>
                </div>
                <div className="text-[11px] text-[#9aa0a6]">Product &amp; AI Builder</div>
              </div>
            </Link>
          </div>

          {/* Navigation Groups */}
          <nav className="p-3 space-y-5 overflow-y-auto max-h-[calc(100vh-180px)]">
            {navGroups.map((grp) => (
              <div key={grp.group} className="space-y-1">
                <div className="px-3 text-[10px] font-mono font-bold tracking-wider text-[#80868b] uppercase">
                  {grp.group}
                </div>
                <div className="space-y-0.5">
                  {grp.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                          isActive
                            ? 'bg-[#282a2c] text-white font-medium border border-zinc-700/80 shadow-sm'
                            : 'text-[#bdc1c6] hover:bg-[#282a2c]/60 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <Icon className={`w-4 h-4 flex-shrink-0 ${
                            isActive ? 'text-blue-400' : 'text-[#9aa0a6]'
                          }`} />
                          <span className="truncate">{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#131314] text-[#9aa0a6] border border-[#3c4043]">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Candidate Meta */}
        <div className="p-3 border-t border-[#3c4043] bg-[#18191b]">
          <div className="p-3 rounded-xl bg-[#282a2c] border border-[#3c4043] text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-400">VIT VELLORE</span>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.5 rounded">
                CGPA 8.88
              </span>
            </div>
            <div className="font-semibold text-white text-xs truncate">
              Ojasvi Kathuria
            </div>
            <div className="text-[11px] text-[#9aa0a6] leading-tight">
              B.Tech CS &amp; Business Systems
            </div>
            <div className="text-[10px] font-mono text-blue-400 pt-0.5">
              AWS Certified AI Practitioner
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
