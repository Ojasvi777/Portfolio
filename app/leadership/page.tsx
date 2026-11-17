import React from 'react';
import EvidenceChip from '@/components/EvidenceChip';
import TodoBadge from '@/components/TodoBadge';
import { Users, Award, Trophy, School, Globe, DollarSign, Sparkles } from 'lucide-react';

export default function LeadershipPage() {
  return (
    <div className="space-y-8 max-w-4xl pb-12">
      <div className="border-b border-[#3c4043] pb-5 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
          <Users className="w-3.5 h-3.5 text-blue-400" />
          <span>LEADERSHIP, OUTREACH & HACKATHONS</span>
        </div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Leadership & Community
        </h1>
        <p className="text-xs text-[#9aa0a6] max-w-2xl leading-relaxed">
          Cross-functional leadership across 50+ members, festival operations, school outreach, and competitive hackathons.
        </p>
      </div>

      {/* Vice Chairperson, Dramatics */}
      <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#282a2c] pb-3">
          <div>
            <h2 className="text-base font-bold text-white">Vice Chairperson, Dramatics, VIT</h2>
            <div className="text-xs text-[#9aa0a6] font-mono">1 year tenure • VIT Vellore</div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/60 text-blue-400 border border-blue-800">
            Operations & Leadership
          </span>
        </div>

        <ul className="space-y-2.5 text-xs text-zinc-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">●</span>
            <div>
              Ran <strong>50 to 60 events</strong> and about 6 fests; delivered 5 Riviera events (4 external, 1 internal) with about 10 teams per external event and <strong>about 500 attendees</strong>.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 mt-0.5">●</span>
            <div>
              Raised <strong>Rs 60K+ in sponsorships</strong>; arranged judges' travel and stay; secured faculty and student welfare committee approvals.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-0.5">●</span>
            <div>
              Ran outreach sessions at <strong>3 to 4 schools (200 to 300 students each)</strong> and a food seminar at a public high school in Punjab.
            </div>
          </li>
        </ul>
      </div>

      {/* Hackathons */}
      <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl p-6 space-y-4">
        <div className="border-b border-[#282a2c] pb-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Competitive Hackathons</span>
          </h2>
          <div className="text-xs text-[#9aa0a6]">Building practical AI applications under 24-48 hour constraints.</div>
        </div>

        <div className="space-y-3 text-xs">
          {/* SIH */}
          <div className="bg-[#18191b] p-4 rounded-xl border border-[#3c4043] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">Smart India Hackathon (SIH)</span>
              <TodoBadge label="exact result wording" />
            </div>
            <p className="text-zinc-300 leading-relaxed">
              AI early warning for crowdsourced ocean hazards: image upload, AI hazard classification, auto-dispatch to maritime authorities, and human-in-the-loop review for uncertain edge cases.
            </p>
          </div>

          {/* JETRO */}
          <div className="bg-[#18191b] p-4 rounded-xl border border-[#3c4043] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">JETRO Hackathon, Japan</span>
              <span className="text-[10px] font-mono text-zinc-400">
                Top 150 of ~3,000 global participants <TodoBadge label="confirm on certificate" className="ml-1" />
              </span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              AI crop-demand estimation system correlating agricultural yield forecasts with regional logistics to reduce seasonal food spoilage nationally.
            </p>
          </div>

          {/* Caterpillar */}
          <div className="bg-[#18191b] p-4 rounded-xl border border-[#3c4043] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">Caterpillar Hackathon</span>
              <span className="text-[10px] font-mono text-amber-400 font-semibold">
                Top 30 of 400 teams
              </span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              Hands-free voice assistant for offline on-site construction workers with on-device ML hazard detection (pits, loose rocks) and machine-training modules.
            </p>
          </div>
        </div>
      </div>

      {/* Community */}
      <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl p-6 space-y-2">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-400" />
          <span>Community & Developer Engagement</span>
        </h2>
        <p className="text-xs text-zinc-300">
          Attended Google DevFest and networked with developers across engineering, product, and AI sectors.
        </p>
      </div>
    </div>
  );
}