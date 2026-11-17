'use client';

import React, { useState, useEffect } from 'react';
import EvidenceChip, { EvidenceType } from '@/components/EvidenceChip';
import TodoBadge from '@/components/TodoBadge';
import {
  BookOpen,
  ListFilter,
  CheckCircle2,
  AlertCircle,
  FileText,
  MessageSquare,
  ChevronRight,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RotateCw,
  Clock,
  Layers,
  ArrowRight
} from 'lucide-react';

interface InlineComment {
  id: string;
  reviewer: string;
  role: string;
  category: 'PM Trade-Off' | 'User Insight' | 'Honest Limit' | 'Heuristic' | 'Prioritization Rule';
  comment: string;
  date: string;
}

interface CaseStudy {
  id: string;
  num: number;
  title: string;
  project: string;
  evidenceChip?: {
    type: EvidenceType;
    method?: string;
    label?: string;
  };
  context: string;
  problem: string;
  insights?: string;
  decision: string;
  outcome: string;
  comments: InlineComment[];
  todos: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    num: 1,
    title: 'The Rs 500 appointment (KGH)',
    project: 'KGH Platform',
    evidenceChip: {
      type: 'SELF-REPORTED',
      method: 'Project timeline & client adoption',
      label: 'Live in Production'
    },
    context: 'Custom e-commerce and consultation appointment platform built for Kathuria Gun House on a tight budget.',
    problem: 'Visitors booked high-value advisory consultations with the CEO and regularly left without making a purchase, creating substantial uncompensated expert time loss.',
    insights: 'Consultations carried real commercial value for serious customers, but the zero-friction booking encouraged tire-kickers and no-shows.',
    decision: 'Introduced a Rs 500 booking fee (for products averaging Rs 5,000) that is 100% credited against any subsequent product purchase, filtering for high-intent buyers while keeping consultations cost-neutral for real customers.',
    outcome: 'Client adopted the policy and has used it continuously since launch, successfully eliminating walk-in time-wasting without hurting sales conversions.',
    comments: [
      {
        id: 'c1-1',
        reviewer: 'Ojasvi',
        role: 'Product Lead',
        category: 'PM Trade-Off',
        comment: 'Friction is usually bad in e-commerce, but intentional friction creates skin-in-the-game for consultative high-ticket sales.',
        date: 'MeharSoft Build'
      }
    ],
    todos: [
      'appointments and purchases before and after',
      'the options you weighed and why you rejected them'
    ]
  },
  {
    id: 'case-2',
    num: 2,
    title: 'Why StageConnect pivoted',
    project: 'StageConnect',
    evidenceChip: {
      type: 'SELF-REPORTED',
      method: 'Waitlist export, not live',
      label: '~500 waitlist'
    },
    context: 'Benchmarked 10+ global and regional casting directories to determine how talent discovery marketplaces fail.',
    problem: 'Benchmarking notes across 10 platforms: TalentTrack is not for everyone; Dazzlerr is a good platform but has limited reach; Casting Bay has good reach but is limited to actors with no networking; CastKro serves only actors and models; Backstage and Mandy are subscription-led and mostly Western; Actors Access and Breakdown Services focus on LA and Canada; Auditioner has stopped working; BandZoogle builds websites for bands. Everyone offered broad directories, leaving brands drowned in unverified WhatsApp and email applications.',
    insights: 'Generic directories lack contract enforcement and identity verification, while performers frequently experience unpaid or dishonored gigs.',
    decision: 'Pivoted away from broad talent discovery to focus strictly on live-performance gigs, prioritizing verified profiles, contract-backed bookings, and an automated role-to-applicant matching algorithm.',
    outcome: 'Reached 700 to 800 prospects, ~500 joined the pre-launch waitlist, and 25 to 30 brands, agencies and theatre groups confirmed participation at launch.',
    comments: [
      {
        id: 'c2-1',
        reviewer: 'Ojasvi',
        role: 'Founder',
        category: 'User Insight',
        comment: 'Broad directories create the illusion of supply. In live entertainment, brands do not want 500 random resumes—they want 3 verified matches who will actually show up.',
        date: 'Market Discovery'
      }
    ],
    todos: [
      'number of user conversations and the quote that convinced you'
    ]
  },
  {
    id: 'case-3',
    num: 3,
    title: 'Finding the second problem (License Verification)',
    project: 'License Verification Automation',
    evidenceChip: {
      type: 'ESTIMATE',
      method: '[TODO: timing method]',
      label: '~80% less manual effort'
    },
    context: 'Built on-site at MeharSoft Technologies during store development.',
    problem: 'While building the client store, noticed the client manually checking customer firearm licenses one by one on a government portal—solving captchas each time and typing records into Excel by hand.',
    insights: 'The client accepted this administrative burden as an unavoidable routine rather than an engineering problem.',
    decision: 'Built an unprompted automation tool combining OpenCV image preprocessing, Tesseract OCR, and regex extraction to fill portal checks automatically, keeping only the legal human captcha validation manual.',
    outcome: 'Reduced manual administrative effort by approximately 80% (ESTIMATE). Next planned iteration: exploration of a CNN-based document reader.',
    comments: [
      {
        id: 'c3-1',
        reviewer: 'Ojasvi',
        role: 'Engineer & PM',
        category: 'PM Trade-Off',
        comment: 'The best product features are rarely on the client PRD. You find them by watching where people spend tedious minutes between tasks.',
        date: 'Internal Toil Cut'
      }
    ],
    todos: [
      'time 10 licenses by hand versus the tool and state the method'
    ]
  },
  {
    id: 'case-4',
    num: 4,
    title: 'Trading 200 ms for trust (FinAssist)',
    project: 'FinAssist RAG',
    evidenceChip: {
      type: 'MEASURED',
      method: '[TODO: N]-question benchmark',
      label: 'Precision@4 95%'
    },
    context: 'Specialized RAG assistant over official American Express cardmember benefit agreements and terms.',
    problem: 'Card terms and reward policies are buried in multi-page PDFs. Plain vector search takes ~5 ms but returns nearest semantic neighbors even when none contain relevant or active terms.',
    insights: 'In consumer finance, a fast wrong answer costs the user money and destroys application credibility.',
    decision: 'Engineered an optional Bayesian re-ranking layer with a Monte Carlo dropout confidence filter that costs ~200 ms (total retrieval ~207 ms vs ~5 ms raw search). The system rejects low-confidence context and refuses to hallucinate.',
    outcome: 'Achieved Precision@4 of 95%, MRR 1.0, and 90% faithfulness on the evaluation benchmark.',
    comments: [
      {
        id: 'c4-1',
        reviewer: 'Ojasvi',
        role: 'Builder',
        category: 'Honest Limit',
        comment: 'Honest limit: The confidence filter is a heuristic uncertainty proxy, not full Bayesian inference. Yet trading 200 ms for verified truth is always the right financial trade-off.',
        date: 'Benchmark Eval'
      }
    ],
    todos: [
      'N for the eval set'
    ]
  },
  {
    id: 'case-5',
    num: 5,
    title: 'Customer analysis at Wise Work',
    project: 'Wise Work Analytics',
    evidenceChip: {
      type: 'MEASURED',
      method: 'Analysis of 250K+ partner interaction logs',
      label: '250K+ Records'
    },
    context: 'Data analysis and customer interaction breakdown across partner enterprise operations.',
    problem: 'Partner company experienced uncharacterized variance in customer support demand and high operational overhead.',
    insights: 'Root-cause analysis isolated core platform users in the 35 to 50 age demographic alongside pronounced seasonal spikes.',
    decision: 'Structured demographic segmentation profiles and seasonality demand projections to inform staffing and feature prioritization.',
    outcome: 'Clarified target user segments and seasonal resource demands across customer interaction channels.',
    comments: [
      {
        id: 'c5-1',
        reviewer: 'Ojasvi',
        role: 'Analyst',
        category: 'Prioritization Rule',
        comment: 'When customer support costs balloon, segmenting by age and seasonality usually uncovers the core 20% driving 80% of volume.',
        date: 'Root-Cause Analysis'
      }
    ],
    todos: [
      'remaining finding, decision it drove, estimated savings with method'
    ]
  },
  {
    id: 'case-6',
    num: 6,
    title: 'Field research at Zudio (team of 7)',
    project: 'Retail Field Research',
    evidenceChip: {
      type: 'MEASURED',
      method: 'In-store survey, Vellore (N=33)',
      label: 'N = 33 Shoppers'
    },
    context: 'In-person primary customer research study conducted at the Zudio retail store in Vellore with a team of 7 researchers.',
    problem: 'Retail store required empirical clarity on primary shopper trade-offs between ultra-low pricing and merchandise quality.',
    insights: 'Surveyed 33 shoppers in person using structured multiple-choice questionnaires and open feedback prompts. Personally approached shoppers, analyzed response distributions, and synthesized findings.',
    decision: 'Recommended positioning around fabric durability and variety rather than race-to-the-bottom price competition.',
    outcome: 'Primary customer requirements documented: fabric quality, assortment variety, and garment durability.',
    comments: [
      {
        id: 'c6-1',
        reviewer: 'Ojasvi',
        role: 'Researcher',
        category: 'User Insight',
        comment: 'Shoppers will forgive simple store layouts, but low prices do not compensate for fabrics that degrade after two washes.',
        date: 'Vellore Field Study'
      }
    ],
    todos: [
      'recompute all tables from the raw responses so every chart uses N=33'
    ]
  }
];

interface FlipCardItem {
  id: string;
  project: string;
  feature: string;
  tag: string;
  tagColor: string;
  frontSummary: string;
  backReason: string;
  tradeOffProtected: string;
  builtInstead: string;
  principle: string;
  todo?: string;
}

const FLIP_CARDS: FlipCardItem[] = [
  {
    id: 'fc-kgh',
    project: 'KGH Platform',
    feature: 'Custom In-House Inventory / ERP System',
    tag: 'VERIFIED NO-CUT',
    tagColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/30',
    frontSummary: 'Delivering a custom e-commerce store and booking engine within 2 months on a tight client budget.',
    backReason: 'No feature cuts were needed to hit the delivery date. Rather than expanding scope into an unnecessary custom ERP, used reliable managed PostgreSQL and focused on the core appointment conversion loop.',
    tradeOffProtected: '2-month fixed deadline and tight client budget runway.',
    builtInstead: 'Direct appointment booking fee mechanism and clean product catalog with genuine verified reviews.',
    principle: 'Do not invent back-office complexity when the client needs customer-facing revenue.'
  },
  {
    id: 'fc-finassist',
    project: 'FinAssist RAG',
    feature: 'Sub-5ms Vector-Only Search Without Confidence Filter',
    tag: 'REJECTED TRADE-OFF',
    tagColor: 'border-rose-500/30 text-rose-400 bg-rose-950/30',
    frontSummary: 'Standard semantic vector search is ultra-fast (~5 ms), but returns top-k nearest neighbors even when zero relevant perks exist.',
    backReason: 'In consumer financial agreements, recommending an expired or incorrect card perk costs users actual cash. A wrong answer destroys trust instantly.',
    tradeOffProtected: 'Factual precision, faithfulness, and user financial trust.',
    builtInstead: 'Added Monte Carlo dropout confidence re-ranking that accepts ~200 ms latency to verify relevance before answering.',
    principle: 'Trust over speed when money is involved.'
  },
  {
    id: 'fc-stageconnect',
    project: 'StageConnect',
    feature: 'Broad All-In-One Entertainment Directory',
    tag: 'PIVOT CUT',
    tagColor: 'border-amber-500/30 text-amber-400 bg-amber-950/30',
    frontSummary: 'Initially considered building an open talent marketplace covering actors, models, voiceover artists, and music bands.',
    backReason: 'Benchmarking 10+ platforms revealed that broad directories create massive spam for organizers (hundreds of unqualified WhatsApp/email applications) and zero booking protection for performers.',
    tradeOffProtected: 'High-signal applicant matching and verified contract security.',
    builtInstead: 'Narrowed strictly to live-performance gigs with verified identity badges and contract-backed bookings.',
    principle: 'Niche depth and verified trust beat wide, low-quality directories.'
  },
  {
    id: 'fc-pending',
    project: 'StageConnect & FinAssist Memory Log',
    feature: 'Additional Candidate Features Under Review',
    tag: 'PENDING INPUT',
    tagColor: 'border-blue-500/30 text-blue-400 bg-blue-950/30',
    frontSummary: 'Historical candidate features considered during early prototyping of StageConnect and FinAssist.',
    backReason: 'Strict Truth Rule: Do not invent or extrapolate features that were not explicitly recorded in project documentation.',
    tradeOffProtected: 'Document integrity and absolute factual accuracy.',
    builtInstead: 'Documented placeholders for author verification.',
    principle: 'Never invent decisions or metrics for a portfolio.',
    todo: "add any real 'not built' decisions from StageConnect and FinAssist you remember"
  }
];

export default function CasesReader() {
  const [activeTab, setActiveTab] = useState<'reader' | 'decision-log'>('reader');
  const [activeSection, setActiveSection] = useState<string>('case-1');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Active TOC section observer
  useEffect(() => {
    if (activeTab !== 'reader') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -60% 0%',
        threshold: 0
      }
    );

    const sections = document.querySelectorAll('.case-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [activeTab]);

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header & Tabs */}
      <div className="border-b border-[#3c4043] pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400 mb-1">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>STUDIO // CASES & PRDs</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Cases, Decisions & PRD Reader
          </h1>
          <p className="text-xs text-[#9aa0a6] mt-1 max-w-2xl leading-relaxed">
            Every product decision involves trade-offs, constraints, and choosing what not to build. Doc-style case reviews with verified evidence chips and inline PM annotations.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-[#1e1f20] border border-[#3c4043] self-start md:self-auto">
          <button
            onClick={() => setActiveTab('reader')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'reader'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Doc Reader</span>
          </button>
          <button
            onClick={() => setActiveTab('decision-log')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'decision-log'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Decision Log (Flip Cards)</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          VIEW 1: DOC-STYLE CASE & PRD READER (WITH STICKY TOC & INLINE CALLOUTS)
         ========================================================================= */}
      {activeTab === 'reader' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sticky Table of Contents (Desktop Sidebar) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-4">
            <div className="p-4 rounded-xl bg-[#1e1f20] border border-[#3c4043] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#2d2f31]">
                <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase">
                  Table of Contents
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                  7 Sections
                </span>
              </div>

              <nav className="space-y-1 text-xs">
                {CASE_STUDIES.map((c) => {
                  const isActive = activeSection === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => scrollToSection(c.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between group ${
                        isActive
                          ? 'bg-blue-600/15 text-blue-400 font-medium border-l-2 border-blue-500'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#282a2c]/50'
                      }`}
                    >
                      <span className="truncate">
                        <span className="font-mono text-[10px] opacity-60 mr-1.5">0{c.num}</span>
                        {c.title.split('(')[0].trim()}
                      </span>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-blue-400" />}
                    </button>
                  );
                })}

                {/* PRD Section link */}
                <button
                  onClick={() => scrollToSection('prd-calendar')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between group ${
                    activeSection === 'prd-calendar'
                      ? 'bg-blue-600/15 text-blue-400 font-medium border-l-2 border-blue-500'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#282a2c]/50'
                  }`}
                >
                  <span className="truncate">
                    <span className="font-mono text-[10px] opacity-60 mr-1.5">PRD</span>
                    Google Calendar Teardown
                  </span>
                  {activeSection === 'prd-calendar' && <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-blue-400" />}
                </button>
              </nav>

              <div className="pt-2 border-t border-[#2d2f31]">
                <button
                  onClick={() => setActiveTab('decision-log')}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono text-amber-400/90 hover:bg-amber-950/20 transition-colors"
                >
                  <span>Decision Log Cards</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Document Metadata Card */}
            <div className="p-3.5 rounded-xl bg-[#131314] border border-[#2d2f31] text-[11px] text-zinc-400 space-y-2">
              <div className="flex items-center gap-1.5 text-zinc-300 font-semibold font-mono text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Truth & Evidence Rules</span>
              </div>
              <p className="leading-relaxed">
                All metrics tagged <EvidenceChip type="MEASURED" size="sm" /> or <EvidenceChip type="ESTIMATE" size="sm" /> are linked directly to verification methods in data.json.
              </p>
            </div>
          </aside>

          {/* Main Document Reader Canvas (9 cols on lg) */}
          <main className="lg:col-span-9 space-y-8">
            {/* Document Header Banner */}
            <div className="p-5 md:p-6 rounded-2xl bg-[#1e1f20] border border-[#3c4043] shadow-xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2d2f31] pb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800 text-blue-400 font-mono text-[11px]">
                    PRODUCT CASE DOSSIER
                  </span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-400 font-mono text-[11px]">DOC-VER-2026.11</span>
                </div>
                <div className="text-zinc-400 text-[11px] font-mono">
                  Author: <span className="text-white font-medium">Ojasvi</span> (Product Lead)
                </div>
              </div>

              <div className="space-y-1">
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  Product Trade-Offs, User Research & Architectural Decisions
                </h2>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Real case studies derived from client e-commerce delivery, startup marketplace pivoting, automated administrative toil extraction, and latency-vs-accuracy benchmarking.
                </p>
              </div>
            </div>

            {/* Case Studies Sections */}
            <div className="space-y-8">
              {CASE_STUDIES.map((c) => (
                <article
                  key={c.id}
                  id={c.id}
                  className="case-section scroll-mt-24 rounded-2xl bg-[#1e1f20] border border-[#3c4043] p-6 md:p-7 shadow-xl space-y-5 transition-all"
                >
                  {/* Case Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2d2f31] pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                          CASE 0{c.num}
                        </span>
                        <span className="text-xs text-zinc-400 font-mono">{c.project}</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                        {c.title}
                      </h3>
                    </div>

                    {c.evidenceChip && (
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#141518] border border-[#2d2f31] self-start sm:self-auto">
                        <span className="text-xs text-zinc-200 font-medium">
                          {c.evidenceChip.label}
                        </span>
                        <EvidenceChip
                          type={c.evidenceChip.type}
                          method={c.evidenceChip.method}
                          size="sm"
                        />
                      </div>
                    )}
                  </div>

                  {/* Document Grid: Problem & Insight */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#161719] border border-[#2d2f31] space-y-1.5">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1.5">
                        <AlertCircle className="w-3 h-3" />
                        <span>The Problem</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {c.problem}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#161719] border border-[#2d2f31] space-y-1.5">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        <span>Key Insight</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {c.insights || c.context}
                      </p>
                    </div>
                  </div>

                  {/* Decision & Trade-Off Section */}
                  <div className="p-4 rounded-xl bg-[#131826]/70 border border-blue-900/40 space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>The Decision & Strategic Trade-Off</span>
                    </div>
                    <p className="text-xs md:text-sm text-zinc-200 leading-relaxed">
                      {c.decision}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className="p-3.5 rounded-xl bg-[#141d18]/60 border border-emerald-900/40 text-xs">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold mb-1">
                      Measured Outcome & Client Impact
                    </div>
                    <p className="text-zinc-200 leading-relaxed font-sans">
                      {c.outcome}
                    </p>
                  </div>

                  {/* Inline Google Docs-Style Review Comments */}
                  {c.comments.map((cm) => (
                    <div
                      key={cm.id}
                      className="relative p-3.5 rounded-xl bg-[#242629] border border-[#3c4043] shadow-md flex items-start gap-3 my-2"
                    >
                      <div className="w-7 h-7 rounded-full bg-blue-600/30 border border-blue-500/60 flex items-center justify-center text-xs font-mono font-bold text-blue-300 flex-shrink-0 mt-0.5">
                        OK
                      </div>
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{cm.reviewer}</span>
                            <span className="text-[10px] font-mono text-zinc-400">({cm.role})</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-950/70 text-blue-400 border border-blue-800">
                              {cm.category}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-zinc-500">{cm.date}</span>
                        </div>
                        <p className="text-xs text-zinc-300 italic leading-relaxed">
                          &ldquo;{cm.comment}&rdquo;
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Todos / Placeholders */}
                  {c.todos && c.todos.length > 0 && (
                    <div className="pt-2 border-t border-[#2d2f31] flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono uppercase text-zinc-500">Unresolved Items:</span>
                      {c.todos.map((td, idx) => (
                        <TodoBadge key={idx} label={td} />
                      ))}
                    </div>
                  )}
                </article>
              ))}

              {/* PRD Teardown Section: Google Calendar */}
              <article
                id="prd-calendar"
                className="case-section scroll-mt-24 rounded-2xl bg-[#1e1f20] border border-[#3c4043] p-6 md:p-7 shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2d2f31] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-950/60 text-amber-400 border border-amber-800">
                        PRD TEARDOWN
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">Product Requirements Document</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight mt-1">
                      Google Calendar for Student Event Organizers
                    </h3>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 self-start sm:self-auto">
                    Stage: In Progress
                  </span>
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-zinc-300">
                  <div className="p-3.5 rounded-xl bg-[#161719] border border-[#2d2f31] space-y-1">
                    <div className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                      Problem Hypothesis
                    </div>
                    <p>
                      Student event organizers struggle with cross-club multi-team scheduling, campus hall booking conflicts, and attendee sync across fragmented chat apps.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#161719] border border-[#2d2f31] space-y-2">
                    <div className="text-[10px] font-mono uppercase text-blue-400 font-bold">
                      PRD Status & Verification Check
                    </div>
                    <p className="text-zinc-400">
                      Per the strict truth rule: Findings, user interviews, and PRD specifications will only be presented once finalized.
                    </p>
                    <TodoBadge label="findings, interviews and PRD link once finished. Show 'in progress' until then, never fake it." />
                  </div>
                </div>
              </article>
            </div>
          </main>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: DECISION LOG (INTERACTIVE 3D FLIP CARDS)
         ========================================================================= */}
      {activeTab === 'decision-log' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#1e1f20] border border-[#3c4043] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-amber-950/60 text-amber-400 border border-amber-800">
                  PRIORITIZATION & TRADE-OFF LOG
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-xs text-zinc-400 font-mono">Interactive 3D Cards</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                What I Chose NOT to Build
              </h2>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Prioritization is the defining skill of product management. Saying no to good ideas protects engineering runway, prevents architectural bloat, and safeguards user trust. Click or tap any card to flip and inspect the rationale.
              </p>
            </div>

            <div className="text-xs text-zinc-400 flex items-center gap-1.5 font-mono">
              <RotateCw className="w-3.5 h-3.5 text-blue-400 animate-spin-slow" />
              <span>Click card to flip</span>
            </div>
          </div>

          {/* 3D Flip Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FLIP_CARDS.map((card) => {
              const isFlipped = !!flippedCards[card.id];

              return (
                <div
                  key={card.id}
                  onClick={() => toggleFlip(card.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFlip(card.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isFlipped}
                  aria-label={`Flip card for ${card.project}: ${card.feature}`}
                  className="group relative h-[320px] w-full rounded-2xl cursor-pointer perspective-1000 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <div
                    className={`relative w-full h-full rounded-2xl transition-transform duration-500 preserve-3d shadow-xl ${
                      isFlipped ? '[transform:rotateY(180deg)]' : ''
                    }`}
                  >
                    {/* CARD FRONT */}
                    <div className="absolute inset-0 w-full h-full rounded-2xl bg-[#1e1f20] border border-[#3c4043] p-6 flex flex-col justify-between backface-hidden group-hover:border-blue-500/50 transition-colors">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-zinc-400">
                            {card.project}
                          </span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${card.tagColor}`}>
                            {card.tag}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-semibold block mb-1">
                            Decision: What was NOT built
                          </span>
                          <h3 className="text-base md:text-lg font-bold text-white tracking-tight leading-snug">
                            {card.feature}
                          </h3>
                        </div>

                        <p className="text-xs text-zinc-300 leading-relaxed">
                          {card.frontSummary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#2d2f31] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                        <span className="flex items-center gap-1.5 text-blue-400">
                          <RotateCw className="w-3.5 h-3.5" />
                          <span>Tap to reveal PM rationale</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                      </div>
                    </div>

                    {/* CARD BACK (Flipped 180deg) */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-2xl bg-[#141926] border border-blue-500/60 p-6 flex flex-col justify-between backface-hidden [transform:rotateY(180deg)] shadow-2xl"
                    >
                      <div className="space-y-3 overflow-y-auto pr-1">
                        <div className="flex items-center justify-between border-b border-blue-900/50 pb-2">
                          <span className="text-xs font-mono text-blue-300 font-bold">
                            {card.project} // Rationale
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">
                            Click to flip back
                          </span>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                              Why I said NO:
                            </span>
                            <p className="text-zinc-200 mt-0.5 leading-relaxed">
                              {card.backReason}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 gap-2 pt-1">
                            <div className="p-2 rounded bg-[#0f1420] border border-blue-950 text-[11px]">
                              <span className="text-zinc-400 font-mono">Protected:</span>{' '}
                              <span className="text-emerald-300 font-medium">{card.tradeOffProtected}</span>
                            </div>
                            <div className="p-2 rounded bg-[#0f1420] border border-blue-950 text-[11px]">
                              <span className="text-zinc-400 font-mono">Built instead:</span>{' '}
                              <span className="text-blue-300 font-medium">{card.builtInstead}</span>
                            </div>
                          </div>

                          {card.todo && (
                            <div className="pt-1">
                              <TodoBadge label={card.todo} />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-blue-900/50 flex items-center justify-between text-[11px] font-mono text-blue-400">
                        <span className="truncate italic text-zinc-300">
                          &ldquo;{card.principle}&rdquo;
                        </span>
                        <RotateCw className="w-3.5 h-3.5 flex-shrink-0 ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
