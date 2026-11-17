import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROJECTS_DATA, ProjectItem } from '@/lib/projectsData';
import EvidenceChip from '@/components/EvidenceChip';
import TodoBadge from '@/components/TodoBadge';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  FileText
} from 'lucide-react';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return PROJECTS_DATA.map((p) => ({
    slug: p.id,
  }));
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = PROJECTS_DATA.find((p) => p.id === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      {/* Top back navigation */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs text-[#9aa0a6] hover:text-white transition-colors py-1 font-mono"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cargo Yard // The Work</span>
        </Link>
      </div>

      {/* 1. TITLE, ONE-LINE SUMMARY, STATUS TAG, MY ROLE, TIMEFRAME, STACK CHIPS */}
      <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#282a2c]">
          <div className="flex flex-wrap items-center gap-2">
            {project.status.startsWith('[TODO') ? (
              <TodoBadge label={project.status} />
            ) : (
              <span
                className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded border ${project.statusColor}`}
              >
                {project.status}
              </span>
            )}
            <span className="text-xs font-mono text-zinc-300">
              Role: <strong className="text-white">{project.role}</strong>
            </span>
          </div>

          {project.timeframe && (
            project.timeframe === '[TODO]' ? (
              <TodoBadge label="Timeframe [TODO]" />
            ) : (
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#131314] border border-[#3c4043] text-blue-300">
                {project.timeframe}
              </span>
            )
          )}
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {project.title}
          </h1>
          <p className="text-sm text-zinc-300 mt-1 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Stack chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#282a2c]">
          <span className="text-xs font-mono text-[#9aa0a6] mr-1">Stack:</span>
          {project.stack.map((tech, i) => (
            tech.includes('[TODO]') ? (
              <TodoBadge key={i} label={tech} />
            ) : (
              <span
                key={i}
                className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#131314] border border-[#3c4043] text-zinc-200"
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
        <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl p-5 space-y-2">
          <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider block">
            02 / {project.whyBuiltLabel || 'Why I built it'}
          </span>
          <p className="text-xs md:text-sm text-zinc-200 leading-relaxed">
            {project.whyBuilt}
          </p>
        </div>

        {/* 3. What I built */}
        <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl p-5 space-y-2">
          <span className="font-mono text-xs font-bold text-blue-400 uppercase tracking-wider block">
            03 / {project.whatIBuiltLabel || 'What I built'}
          </span>
          <p className="text-xs md:text-sm text-zinc-200 leading-relaxed">
            {project.whatIBuilt}
          </p>
        </div>
      </div>

      {/* 4. DECISIONS I MADE (3 to 4 items, each Decision + Why) */}
      <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl p-5 space-y-3">
        <span className="font-mono text-xs font-bold text-purple-400 uppercase tracking-wider block">
          04 / Decisions I made
        </span>

        <div className="space-y-3">
          {project.decisions.map((item, idx) => (
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
              <div className="text-xs text-zinc-300 pl-4 border-l-2 border-amber-400/30 ml-2 leading-relaxed">
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
      <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl p-5 space-y-4">
        <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider block">
          05 / What happened
        </span>

        <p className="text-xs md:text-sm text-zinc-200 leading-relaxed">
          {project.whatHappened.text}
        </p>

        {/* Evidence Chips row */}
        {project.whatHappened.evidenceChips.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#282a2c]">
            {project.whatHappened.evidenceChips.map((chip, idx) => {
              if (chip.isTodo) {
                return <TodoBadge key={idx} label={chip.label} />;
              }
              return (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 p-2 rounded-lg bg-[#18191b] border border-[#3c4043]"
                >
                  <span className="text-xs font-medium text-white">{chip.label}</span>
                  <EvidenceChip type={chip.type} method={chip.method} />
                </div>
              );
            })}
          </div>
        )}

        {/* Anything that broke and how I fixed it */}
        {project.whatHappened.brokenAndFixed && (
          <div className="p-3.5 rounded-lg bg-rose-950/30 border border-rose-500/30 space-y-1 text-xs">
            <span className="font-mono text-[11px] font-bold text-rose-300 uppercase tracking-wider block">
              What broke &amp; how I fixed it:
            </span>
            <p className="text-rose-100/90 leading-relaxed">
              {project.whatHappened.brokenAndFixed}
            </p>
          </div>
        )}

        {/* Known Limit */}
        {project.whatHappened.knownLimit && (
          <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs">
            <span className="font-mono text-[11px] font-semibold text-amber-300 mr-2">
              Known Limit:
            </span>
            <span className="text-zinc-300">{project.whatHappened.knownLimit}</span>
          </div>
        )}

        {/* Visible TODOs in dev */}
        {project.whatHappened.todos && project.whatHappened.todos.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.whatHappened.todos.map((todo, idx) => (
              <TodoBadge key={idx} label={todo} />
            ))}
          </div>
        )}
      </div>

      {/* 6. LINKS ROW */}
      <div className="bg-[#18191b] border border-[#3c4043] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#9aa0a6] uppercase tracking-wider">
            06 / Links //
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* GitHub Button */}
          {project.links.githubUrl && (
            project.links.githubUrl === '[TODO]' ? (
              <TodoBadge label="GitHub [TODO]" />
            ) : (
              <a
                href={project.links.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#282a2c] hover:bg-[#333538] text-white font-mono text-xs font-semibold border border-[#3c4043] shadow transition-all hover:scale-[1.02]"
              >
                <Github className="w-4 h-4 text-zinc-200" />
                <span>{project.links.githubLabel || 'View on GitHub'}</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </a>
            )
          )}

          {/* Live site Button */}
          {project.links.liveUrl && (
            project.links.liveUrl === '[TODO]' ? (
              <TodoBadge label="Live site [TODO]" />
            ) : (
              <a
                href={project.links.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold shadow transition-all hover:scale-[1.02]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{project.links.liveLabel || 'Live site'}</span>
              </a>
            )
          )}

          {/* PRD Button */}
          {project.links.prdUrl && (
            project.links.prdUrl === '[TODO]' ? (
              <TodoBadge label="PRD [TODO]" />
            ) : (
              <a
                href={project.links.prdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold shadow transition-all hover:scale-[1.02]"
              >
                <FileText className="w-4 h-4" />
                <span>{project.links.prdLabel || 'PRD'}</span>
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}
