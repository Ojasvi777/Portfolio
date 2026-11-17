import React from 'react';
import Link from 'next/link';
import { getProjects } from '@/lib/content';
import EvidenceChip from '@/components/EvidenceChip';
import TodoBadge from '@/components/TodoBadge';
import { ArrowUpRight, FolderKanban, Sparkles, Filter } from 'lucide-react';

export default function WorkPage() {
  const projects = getProjects();

  return (
    <div className="space-y-6 pb-12">
      {/* Header section */}
      <div className="border-b border-[#3c4043] pb-5 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
          <FolderKanban className="w-3.5 h-3.5 text-blue-400" />
          <span>PROJECTS &amp; SYSTEMS</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              The Work
            </h1>
            <p className="text-xs text-[#9aa0a6] mt-1 max-w-2xl leading-relaxed">
              I turn messy user problems into shipped AI products. Explore the systems, trade-offs, and empirical outcomes across all projects.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#1e1f20] border border-[#3c4043] text-zinc-300">
              Total Systems: <span className="text-blue-400 font-bold">{projects.length}</span>
            </span>
          </div>
        </div>
      </div>

      {/* The Work Table */}
      <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl overflow-hidden shadow-lg">
        {/* Table Top Controls */}
        <div className="px-5 py-3.5 border-b border-[#3c4043] flex flex-wrap items-center justify-between gap-2 bg-[#18191b]">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-zinc-200">All Shipped Work ({projects.length})</span>
            <span className="text-[11px] text-[#80868b]">• Click any row to inspect decisions and trade-offs</span>
          </div>
          <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
            <Filter className="w-3 h-3 text-zinc-500" />
            <span>Filter by Stage &amp; Status</span>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#3c4043] bg-[#1e1f20] text-[10px] font-mono uppercase tracking-wider text-[#9aa0a6]">
                <th className="py-3 px-5">Project</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Stage</th>
                <th className="py-3 px-4">Impact</th>
                <th className="py-3 px-4">Evidence</th>
                <th className="py-3 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#282a2c]">
              {projects.map((proj) => (
                <tr 
                  key={proj.slug}
                  className="hover:bg-[#282a2c]/70 transition-colors group cursor-pointer"
                >
                  <td className="py-4 px-5 font-medium text-white max-w-[260px]">
                    <Link href={`/work/${proj.slug}`} className="block">
                      <div className="flex items-center space-x-1.5 font-bold text-white group-hover:text-blue-400 transition-colors">
                        <span>{proj.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-[11px] text-[#9aa0a6] truncate mt-0.5 font-normal">
                        {proj.oneLiner}
                      </div>
                    </Link>
                  </td>

                  <td className="py-4 px-4 text-zinc-300 whitespace-nowrap">
                    <Link href={`/work/${proj.slug}`} className="block">
                      {proj.role}
                    </Link>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap font-mono text-[11px]">
                    <Link href={`/work/${proj.slug}`} className="block">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#131314] text-zinc-300 border border-[#3c4043]">
                        {proj.stage}
                      </span>
                    </Link>
                  </td>

                  <td className="py-4 px-4 text-zinc-200 font-medium">
                    <Link href={`/work/${proj.slug}`} className="block">
                      {proj.impact}
                    </Link>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    <EvidenceChip type={proj.evidence} method={proj.evidenceMethod} />
                  </td>

                  <td className="py-4 px-5 text-right whitespace-nowrap font-mono">
                    <Link href={`/work/${proj.slug}`} className="inline-block">
                      {proj.status.startsWith('[TODO') ? (
                        <TodoBadge label={proj.status} />
                      ) : (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          proj.status === 'Live' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800' :
                          proj.status.includes('waitlist') ? 'bg-blue-950/60 text-blue-400 border border-blue-800' :
                          proj.status === 'Shipped to the startup' ? 'bg-purple-950/60 text-purple-400 border border-purple-800' :
                          proj.status.includes('Concept') ? 'bg-rose-950/60 text-rose-400 border border-rose-800' :
                          proj.status === 'Demo' ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-800' :
                          'bg-zinc-800 text-zinc-300 border border-zinc-700'
                        }`}>
                          {proj.status}
                        </span>
                      )}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-5 py-3 border-t border-[#3c4043] bg-[#18191b] flex items-center justify-between text-[11px] text-[#80868b] font-mono">
          <span>{projects.length} systems documented with verified outcomes</span>
          <Link href="/observe" className="text-blue-400 hover:underline">
            View all metrics in Observe →
          </Link>
        </div>
      </div>
    </div>
  );
}
