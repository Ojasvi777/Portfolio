'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EvidenceChip from '@/components/EvidenceChip';
import TodoBadge from '@/components/TodoBadge';
import { PROJECTS_DATA, ProjectItem } from '@/lib/projectsData';
import {
  X,
  FolderKanban,
  BookOpen,
  Activity,
  Mail,
  Linkedin,
  Github,
  FileText,
  KeyRound,
  Check,
  Copy,
  Terminal,
  ExternalLink,
  RotateCw,
  Sparkles,
  Trophy,
  Award,
  Layers,
  CheckCircle2,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

export type ManifestTab =
  | 'work'
  | 'leadership'
  | 'cases'
  | 'observe'
  | 'about'
  | 'contact';

interface DepotManifestModalProps {
  isOpen: boolean;
  initialTab?: ManifestTab;
  onClose: () => void;
}

export default function DepotManifestModal({
  isOpen,
  initialTab = 'work',
  onClose
}: DepotManifestModalProps) {
  const [activeTab, setActiveTab] = useState<ManifestTab>(initialTab);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [apiKeyGenerated, setApiKeyGenerated] = useState(false);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Synchronize initialTab when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setSelectedProjectId(null);
    }
  }, [isOpen, initialTab]);

  // Escape key listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (selectedProjectId) {
          setSelectedProjectId(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, selectedProjectId]);

  if (!isOpen) return null;

  const fakeKey = 'oj_live_4a89f7e8c21b99a0';

  const handleGenerateKey = () => {
    setIsGeneratingKey(true);
    setTimeout(() => {
      setIsGeneratingKey(false);
      setApiKeyGenerated(true);
    }, 600);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(fakeKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedProject = selectedProjectId
    ? PROJECTS_DATA.find((p) => p.id === selectedProjectId)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-[#04112e]/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border-2 border-white/20 shadow-2xl bg-[#091a3d] text-white overflow-hidden"
      >
        {/* ================= MODAL TOP BAR (CARGO MANIFEST HEADER) ================= */}
        <div className="relative px-6 py-4 bg-[#071533] border-b border-white/15 flex items-center justify-between select-none">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black tracking-widest text-blue-200 uppercase">
                  CARGO MANIFEST // DEPOT DOCK RECORD
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  OJASVI · VIT &apos;27
                </span>
              </div>
              <p className="text-[11px] text-blue-200/70 font-sans">
                Evidence-backed product portfolio & technical deep dive
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Cargo Manifest"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ================= TAB NAVIGATION STRIP ================= */}
        <div className="px-6 py-2.5 bg-[#06122b] border-b border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'work', label: 'THE WORK', count: '7 Projects', icon: FolderKanban },
            { id: 'leadership', label: 'LEADERSHIP & AWARDS', count: 'IITs & NIT', icon: Trophy },
            { id: 'cases', label: 'PM WORK & PRDs', count: 'Teardowns', icon: BookOpen },
            { id: 'observe', label: 'METRICS BY PROJECT', count: 'Audited', icon: Activity },
            { id: 'about', label: 'ABOUT & CERTS', count: 'Bio', icon: Sparkles },
            { id: 'contact', label: 'SAY HELLO', count: 'API Key', icon: KeyRound }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as ManifestTab);
                  setSelectedProjectId(null);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40 border border-blue-400/50'
                    : 'text-blue-200/70 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-black/25 text-blue-100' : 'text-blue-300/60'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ================= TAB CONTENT SCROLLER ================= */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 text-slate-200">
          {/* TAB 1: THE WORK (INTERACTIVE PROJECT DEEP DIVES) */}
          {activeTab === 'work' && (
            <div className="space-y-6">
              {!selectedProject ? (
                // PROJECTS GRID LIST (1 to 7 in exact order)
                <>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                        The Work · 7 Projects, Platforms &amp; ML
                      </h3>
                      <p className="text-xs md:text-sm text-slate-300 mt-1">
                        Click on any project to inspect why and what I built, trade-off decisions, and empirical results.
                      </p>
                    </div>
                    <span className="font-mono text-xs text-blue-300/80">
                      7 Projects
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PROJECTS_DATA.map((project, idx) => (
                      <div
                        key={project.id}
                        onClick={() => setSelectedProjectId(project.id)}
                        className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-3 hover:border-blue-400/50 hover:bg-white/10 transition-all cursor-pointer group flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] text-blue-300/70 font-semibold">
                                0{idx + 1}
                              </span>
                              {project.status.startsWith('[TODO') ? (
                                <TodoBadge label={project.status} />
                              ) : (
                                <span
                                  className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${project.statusColor}`}
                                >
                                  {project.status}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-[11px] font-mono text-blue-300 group-hover:text-white transition-colors">
                              <span>Inspect</span>
                              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>

                          <h4 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                            {project.title}
                          </h4>

                          <p className="text-xs text-slate-300 leading-relaxed">
                            {project.summary}
                          </p>
                        </div>

                        <div className="space-y-3 pt-2">
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                            <span>{project.role}</span>
                            {project.timeframe && (
                              project.timeframe === '[TODO]' ? (
                                <TodoBadge label="[TODO]" />
                              ) : (
                                <span>{project.timeframe}</span>
                              )
                            )}
                          </div>

                          {/* Tech Stack Pills */}
                          <div className="flex flex-wrap gap-1.5">
                            {project.stack.slice(0, 3).map((tech, i) => (
                              tech.includes('[TODO]') ? (
                                <TodoBadge key={i} label={tech} />
                              ) : (
                                <span
                                  key={i}
                                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/30 border border-white/10 text-slate-300"
                                >
                                  {tech}
                                </span>
                              )
                            ))}
                            {project.stack.length > 3 && (
                              <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-400">
                                +{project.stack.length - 3} more
                              </span>
                            )}
                          </div>

                          {/* Primary Evidence Metric */}
                          {project.whatHappened.evidenceChips[0] && (
                            <div className="pt-2 flex items-center justify-between border-t border-white/5">
                              <span className="text-[11px] font-mono text-white font-semibold">
                                {project.whatHappened.evidenceChips[0].label}
                              </span>
                              <EvidenceChip
                                type={project.whatHappened.evidenceChips[0].type}
                                method={project.whatHappened.evidenceChips[0].method}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                // SINGLE PROJECT INTERACTIVE DEEP DIVE (6-PART TEMPLATE)
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Back button */}
                  <button
                    onClick={() => setSelectedProjectId(null)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-blue-200 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to All 7 Projects</span>
                  </button>

                  {/* 1. TITLE, ONE-LINE SUMMARY, STATUS TAG, MY ROLE, TIMEFRAME, STACK CHIPS */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {selectedProject.status.startsWith('[TODO') ? (
                          <TodoBadge label={selectedProject.status} />
                        ) : (
                          <span
                            className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded border ${selectedProject.statusColor}`}
                          >
                            {selectedProject.status}
                          </span>
                        )}
                        <span className="text-xs font-mono text-slate-300">
                          Role: <strong className="text-white">{selectedProject.role}</strong>
                        </span>
                      </div>

                      {selectedProject.timeframe && (
                        selectedProject.timeframe === '[TODO]' ? (
                          <TodoBadge label="Timeframe [TODO]" />
                        ) : (
                          <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-black/40 border border-white/10 text-blue-300">
                            {selectedProject.timeframe}
                          </span>
                        )
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                        {selectedProject.title}
                      </h3>
                      <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                        {selectedProject.summary}
                      </p>
                    </div>

                    {/* Stack chips */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/10">
                      <span className="text-xs font-mono text-slate-400 mr-1">Stack:</span>
                      {selectedProject.stack.map((tech, i) => (
                        tech.includes('[TODO]') ? (
                          <TodoBadge key={i} label={tech} />
                        ) : (
                          <span
                            key={i}
                            className="text-xs font-mono px-2.5 py-0.5 rounded bg-black/40 border border-white/10 text-slate-200"
                          >
                            {tech}
                          </span>
                        )
                      ))}
                    </div>
                  </div>

                  {/* 2 & 3. WHY I BUILT IT & WHAT I BUILT */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 2. Why I built it */}
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                      <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider block">
                        02 / {selectedProject.whyBuiltLabel || 'Why I built it'}
                      </span>
                      <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                        {selectedProject.whyBuilt}
                      </p>
                    </div>

                    {/* 3. What I built */}
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                      <span className="font-mono text-xs font-bold text-blue-400 uppercase tracking-wider block">
                        03 / {selectedProject.whatIBuiltLabel || 'What I built'}
                      </span>
                      <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                        {selectedProject.whatIBuilt}
                      </p>
                    </div>
                  </div>

                  {/* 4. DECISIONS I MADE (3 to 4 items, each Decision + Why) */}
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <span className="font-mono text-xs font-bold text-purple-400 uppercase tracking-wider block">
                      04 / Decisions I made
                    </span>

                    <div className="space-y-3">
                      {selectedProject.decisions.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/20 space-y-2"
                        >
                          <div className="flex items-start gap-2">
                            <span className="font-mono text-xs font-bold text-amber-400 whitespace-nowrap">
                              Decision {idx + 1}:
                            </span>
                            <span className="text-xs font-semibold text-white">
                              {item.decision.includes('[TODO]') ? (
                                <TodoBadge label={item.decision} />
                              ) : (
                                item.decision
                              )}
                            </span>
                          </div>
                          <div className="text-xs text-slate-300 pl-4 border-l-2 border-amber-400/30 ml-2 leading-relaxed">
                            <strong className="text-amber-200 font-mono">Why:</strong>{' '}
                            {item.why.includes('[TODO]') ? (
                              <TodoBadge label={item.why} />
                            ) : (
                              item.why
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 5. WHAT HAPPENED: results with evidence chips, plus anything that broke and how I fixed it */}
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
                    <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                      05 / What happened
                    </span>

                    <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                      {selectedProject.whatHappened.text}
                    </p>

                    {/* Evidence Chips row */}
                    {selectedProject.whatHappened.evidenceChips.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                        {selectedProject.whatHappened.evidenceChips.map((chip, idx) => {
                          if (chip.isTodo) {
                            return <TodoBadge key={idx} label={chip.label} />;
                          }
                          return (
                            <div
                              key={idx}
                              className="inline-flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/10"
                            >
                              <span className="text-xs font-medium text-white">{chip.label}</span>
                              <EvidenceChip type={chip.type} method={chip.method} />
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Anything that broke and how I fixed it */}
                    {selectedProject.whatHappened.brokenAndFixed && (
                      <div className="p-3.5 rounded-lg bg-rose-950/30 border border-rose-500/30 space-y-1 text-xs">
                        <span className="font-mono text-[11px] font-bold text-rose-300 uppercase tracking-wider block">
                          What broke &amp; how I fixed it:
                        </span>
                        <p className="text-rose-100/90 leading-relaxed">
                          {selectedProject.whatHappened.brokenAndFixed}
                        </p>
                      </div>
                    )}

                    {/* Known Limit */}
                    {selectedProject.whatHappened.knownLimit && (
                      <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs">
                        <span className="font-mono text-[11px] font-semibold text-amber-300 mr-2">
                          Known Limit:
                        </span>
                        <span className="text-slate-300">{selectedProject.whatHappened.knownLimit}</span>
                      </div>
                    )}

                    {/* Visible TODOs in dev */}
                    {selectedProject.whatHappened.todos && selectedProject.whatHappened.todos.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {selectedProject.whatHappened.todos.map((todo, idx) => (
                          <TodoBadge key={idx} label={todo} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 6. LINKS ROW */}
                  <div className="p-4 rounded-xl bg-[#06122b] border border-white/15 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                        06 / Links //
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {/* GitHub Button */}
                      {selectedProject.links.githubUrl && (
                        selectedProject.links.githubUrl === '[TODO]' ? (
                          <TodoBadge label="GitHub [TODO]" />
                        ) : (
                          <a
                            href={selectedProject.links.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-semibold border border-white/20 shadow transition-all hover:scale-[1.02]"
                          >
                            <Github className="w-4 h-4 text-slate-200" />
                            <span>{selectedProject.links.githubLabel || 'View on GitHub'}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                          </a>
                        )
                      )}

                      {/* Live site Button */}
                      {selectedProject.links.liveUrl && (
                        selectedProject.links.liveUrl === '[TODO]' ? (
                          <TodoBadge label="Live site [TODO]" />
                        ) : (
                          <a
                            href={selectedProject.links.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold shadow transition-all hover:scale-[1.02]"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>{selectedProject.links.liveLabel || 'Live site'}</span>
                          </a>
                        )
                      )}

                      {/* PRD Button */}
                      {selectedProject.links.prdUrl && (
                        selectedProject.links.prdUrl === '[TODO]' ? (
                          <TodoBadge label="PRD [TODO]" />
                        ) : (
                          <a
                            href={selectedProject.links.prdUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold shadow transition-all hover:scale-[1.02]"
                          >
                            <FileText className="w-4 h-4" />
                            <span>{selectedProject.links.prdLabel || 'PRD'}</span>
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LEADERSHIP, NATIONAL FESTS & AWARDS */}
          {activeTab === 'leadership' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  Leadership, National Fests & Creative Awards
                </h3>
                <p className="text-xs md:text-sm text-slate-300 mt-1">
                  Representation and victories at India&apos;s most prestigious collegiate cultural & tech stages.
                </p>
              </div>

              {/* Prestigious National Institutes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Trophy className="w-4 h-4" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      NIT Trichy · Festember
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    National Fest Winner & Contingent Leader
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Led university contingent to NIT Trichy, competing against top universities across India and winning premier trophies in stage performances and cultural competitions.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/30 text-slate-300">
                      National Podium Winner
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/30 text-slate-300">
                      Festember
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Trophy className="w-4 h-4" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      IIT Madras · Saarang
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    IIT Madras Representative & Finalist
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Represented college at South India&apos;s largest collegiate festival across competitive stage and cultural tracks, recognized for high-caliber dramatics.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/30 text-slate-300">
                      IIT Madras Saarang
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/30 text-slate-300">
                      Dramatics & Stage
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Trophy className="w-4 h-4" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      IIM Bangalore · Unmaad
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    IIM Bangalore Award Recipient
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Secured accolades at IIM Bangalore, blending strategic execution with creative performance leadership on national-level stages.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/30 text-slate-300">
                      IIM Bangalore
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/30 text-slate-300">
                      Unmaad National Stage
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-purple-400">
                    <Trophy className="w-4 h-4" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      IIT Bombay · Mood Indigo
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    IIT Bombay Competitive Honors
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Competed at Asia&apos;s largest collegiate festival, representing VIT Vellore in high-stakes creative and fashion/modelling circuits.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/30 text-slate-300">
                      IIT Bombay Mood Indigo
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/30 text-slate-300">
                      Modelling & Acting
                    </span>
                  </div>
                </div>
              </div>

              {/* Specific Creative Disciplines */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Award className="w-4 h-4" />
                    <span className="font-mono text-xs font-bold uppercase">Acting & Dramatics</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Multiple National Stage Awards</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Proven ability to command a room, articulate narrative tension, and perform under high pressure — traits that directly translate to pitching products, stakeholder alignment, and team inspiration.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-purple-400">
                    <Award className="w-4 h-4" />
                    <span className="font-mono text-xs font-bold uppercase">Modelling & Fashion</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">National Runway & Modelling Accolades</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Award-winning collegiate model representing university teams at marquee national competitions. Honed precision in aesthetic curation, visual discipline, and presentation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PM WORK & PRDs */}
          {activeTab === 'cases' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  Product Management Work, PRDs & Teardowns
                </h3>
                <p className="text-xs md:text-sm text-slate-300 mt-1">
                  Structured Product Requirements Documents, trade-off matrices, and strategic decision logs.
                </p>
              </div>

              {/* 3D Decision Flip Cards */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <RotateCw className="w-4 h-4 text-amber-400" />
                  <span className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider">
                    DECISION LOG // WHAT I CHOSE NOT TO BUILD (CLICK CARD TO FLIP)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'kgh',
                      title: 'KGH Appointment Cuts',
                      front: 'Refused taking a % cut on Rs 500 appointment booking fee.',
                      back: 'Trade-off: Sacrificed short-term platform revenue to eliminate provider onboarding friction. Adoption reached 100% of providers within 3 weeks.'
                    },
                    {
                      id: 'finassist',
                      title: 'Raw LLM Direct Search',
                      front: 'Refused passing raw user queries directly to Gemini without vector search.',
                      back: 'Trade-off: Incurred 200ms extra latency for FAISS embedding retrieval to guarantee 0% hallucinated policy answers on AMEX card benefits.'
                    },
                    {
                      id: 'stageconnect',
                      title: 'StageConnect Directory',
                      front: 'Refused building a broad, unverified artist directory.',
                      back: 'Trade-off: Sacrificed fast catalog growth to focus strictly on verified live gigs with escrow payments, which solved the primary pain point.'
                    }
                  ].map((card) => {
                    const isFlipped = !!flippedCards[card.id];
                    return (
                      <div
                        key={card.id}
                        onClick={() => toggleFlip(card.id)}
                        className="cursor-pointer h-48 rounded-xl border border-white/15 bg-white/5 p-5 flex flex-col justify-between hover:border-amber-400/50 transition-all select-none"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-amber-400 uppercase font-bold">
                            {isFlipped ? 'WHY I CHOSE THIS' : 'WHAT I REJECTED'}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">Click to flip ↺</span>
                        </div>
                        <h4 className="font-bold text-white text-sm">{card.title}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {isFlipped ? card.back : card.front}
                        </p>
                        <span className="text-[10px] font-mono text-blue-300/80">
                          {isFlipped ? 'Trade-off confirmed' : 'Refused feature'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PRD Teardown Preview */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <span className="font-mono text-xs font-bold text-blue-400 uppercase">
                  Executive PRD Teardown
                </span>
                <h4 className="text-lg font-bold text-white">
                  Google Calendar: Smart Meeting Scheduler PRD
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A structured teardown addressing multi-attendee cross-timezone meeting conflicts with AI-assisted proposals, trade-off matrices, and North Star metrics.
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span>Author: Ojasvi (Product Lead)</span>
                  <span>•</span>
                  <span>Target: Product Management Portfolio Review</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: METRICS LEDGER (SEPARATED BY PROJECT!) */}
          {activeTab === 'observe' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  Portfolio Metrics Ledger · Separated by Product
                </h3>
                <p className="text-xs md:text-sm text-slate-300 mt-1">
                  Every numerical claim across all products is organized by project, tagged with empirical evidence tiers.
                </p>
              </div>

              <div className="space-y-4">
                {PROJECTS_DATA.map((project) => (
                  <div
                    key={project.id}
                    className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-white">
                          {project.title}
                        </h4>
                        {project.status.startsWith('[TODO') ? (
                          <TodoBadge label={project.status} />
                        ) : (
                          <span
                            className={`font-mono text-[10px] px-2 py-0.5 rounded border ${project.statusColor}`}
                          >
                            {project.status}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab('work');
                          setSelectedProjectId(project.id);
                        }}
                        className="text-xs font-mono text-blue-300 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open Project</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      {project.whatHappened.evidenceChips.map((metric, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between"
                        >
                          <div>
                            <div className="text-xs font-bold text-white">
                              {metric.label}
                            </div>
                            <div className="text-[11px] font-mono text-slate-400">
                              Verification: {metric.method || 'Empirical measurement'}
                            </div>
                          </div>
                          <EvidenceChip type={metric.type} method={metric.method} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Academic & Certifications Block */}
                <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <h4 className="text-base font-bold text-white">
                    Academic & Professional Credentials
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">B.Tech Graduation: May 2027</div>
                        <div className="text-[11px] font-mono text-slate-400">
                          VIT Vellore Computer Science & Business Systems
                        </div>
                      </div>
                      <EvidenceChip type="MEASURED" method="University enrollment record" />
                    </div>

                    <div className="p-3 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">AWS Certified AI Practitioner</div>
                        <div className="text-[11px] font-mono text-slate-400">
                          Amazon Web Services credential verification
                        </div>
                      </div>
                      <EvidenceChip type="MEASURED" method="AWS certificate badge" />
                    </div>

                    <div className="p-3 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">Deep Learning (A-Z)™</div>
                        <div className="text-[11px] font-mono text-slate-400">
                          Udemy certification in neural architectures & CNNs
                        </div>
                      </div>
                      <EvidenceChip type="MEASURED" method="Udemy certificate validation" />
                    </div>

                    <div className="p-3 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">Microsoft PowerBI Certified</div>
                        <div className="text-[11px] font-mono text-slate-400">
                          Business intelligence, DAX & executive dashboarding
                        </div>
                      </div>
                      <EvidenceChip type="MEASURED" method="PowerBI certification credential" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ABOUT OJASVI & CERTIFICATIONS */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  About Ojasvi Kathuria
                </h3>
                <p className="text-xs md:text-sm text-slate-300 mt-1">
                  Product thinker who ships the code. I find the problem first, then I build the AI.
                </p>
              </div>

              {/* Certifications Block (Including Deep Learning and PowerBI) */}
              <div className="space-y-3">
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  CERTIFICATIONS & TECHNICAL CREDENTIALS
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <span className="font-mono text-[10px] text-emerald-400 uppercase font-bold">
                      Amazon Web Services
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      AWS Certified AI Practitioner
                    </h4>
                    <p className="text-xs text-slate-300">
                      Grounded in generative models, foundation model fine-tuning, and scalable inference architecture.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <span className="font-mono text-[10px] text-blue-400 uppercase font-bold">
                      Udemy Certification
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      Deep Learning (A-Z)™
                    </h4>
                    <p className="text-xs text-slate-300">
                      Mastery of Artificial Neural Networks (ANN), Convolutional Neural Networks (CNN), and RNNs with PyTorch.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <span className="font-mono text-[10px] text-amber-400 uppercase font-bold">
                      Microsoft BI
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      PowerBI Certification
                    </h4>
                    <p className="text-xs text-slate-300">
                      Enterprise business intelligence modeling, DAX queries, and executive product metric dashboards.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education & Bio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <span className="font-mono text-xs font-bold text-blue-400 uppercase">
                    Education & Degrees
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    VIT Vellore (2023 - 2027)
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    B.Tech in Computer Science and Business Systems. Built to bridge engineering feasibility, AI implementation, and business viability.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <span className="font-mono text-xs font-bold text-amber-400 uppercase">
                    Product Philosophy
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    Discover · Decide · Ship · Measure
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    My favorite part of product work is where a vague, messy customer problem turns into a definitive engineering decision.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SAY HELLO & CONTACT */}
          {activeTab === 'contact' && (
            <div className="space-y-6 max-w-2xl mx-auto py-4">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Hi, I&apos;m Ojasvi · Let&apos;s Connect
                </h3>
                <p className="text-xs text-slate-300">
                  I find the problem first. Then I build the AI. Generate an API key below to unlock direct communication channels and resume download.
                </p>
              </div>

              {!apiKeyGenerated ? (
                <div className="p-6 rounded-xl bg-white/5 border border-white/15 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Generate Direct Access Key</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Mimics AI Studio API key provisioning to access verified contact endpoints.
                    </p>
                  </div>
                  <button
                    onClick={handleGenerateKey}
                    disabled={isGeneratingKey}
                    className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg cursor-pointer"
                  >
                    {isGeneratingKey ? 'Generating Key...' : 'Create API Key'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {/* Provisioned Key */}
                  <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/40 space-y-2">
                    <div className="flex items-center justify-between text-xs text-emerald-400 font-mono">
                      <span>KEY PROVISIONED // FREE TIER ACTIVE</span>
                      <button
                        onClick={handleCopyKey}
                        className="flex items-center gap-1 text-slate-300 hover:text-white"
                      >
                        {copiedKey ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedKey ? 'Copied' : 'Copy Key'}</span>
                      </button>
                    </div>
                    <div className="font-mono text-xs bg-black/60 p-2.5 rounded border border-white/10 text-white select-all">
                      {fakeKey}
                    </div>
                  </div>

                  {/* Direct Channels */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <a
                      href="mailto:ojasvikathuria777@gmail.com"
                      className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/50 flex items-center gap-3 transition-colors text-white"
                    >
                      <Mail className="w-4 h-4 text-blue-400" />
                      <div>
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Direct Email</div>
                        <div className="text-xs font-bold truncate">ojasvikathuria777@gmail.com</div>
                      </div>
                    </a>

                    <a
                      href="https://linkedin.com/in/ojasvi-kathuria-2a8932299"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/50 flex items-center gap-3 transition-colors text-white"
                    >
                      <Linkedin className="w-4 h-4 text-blue-400" />
                      <div>
                        <div className="text-[10px] font-mono text-slate-400 uppercase">LinkedIn</div>
                        <div className="text-xs font-bold truncate">in/ojasvi-kathuria-2a8932299</div>
                      </div>
                    </a>

                    <a
                      href="https://github.com/Ojasvi777"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/50 flex items-center gap-3 transition-colors text-white"
                    >
                      <Github className="w-4 h-4 text-blue-400" />
                      <div>
                        <div className="text-[10px] font-mono text-slate-400 uppercase">GitHub</div>
                        <div className="text-xs font-bold truncate">github.com/Ojasvi777</div>
                      </div>
                    </a>

                    <a
                      href="/content/about.md"
                      download="Ojasvi_Kathuria_Resume.txt"
                      className="p-3.5 rounded-xl bg-blue-600/20 border border-blue-500/40 hover:bg-blue-600/30 flex items-center gap-3 transition-colors text-white"
                    >
                      <FileText className="w-4 h-4 text-blue-300" />
                      <div>
                        <div className="text-[10px] font-mono text-blue-300 uppercase">Download Resume</div>
                        <div className="text-xs font-bold">Ojasvi Kathuria (PDF/TXT)</div>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= MODAL FOOTER ================= */}
        <div className="px-6 py-3 bg-[#071533] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>DEPOT LAYER EXTENSION // NO PAGE REDIRECT REQUIRED</span>
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white">Esc</kbd> to return to yard</span>
        </div>
      </motion.div>
    </div>
  );
}
