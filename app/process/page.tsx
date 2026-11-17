import React from 'react';
import { Workflow, Search, Sliders, Rocket, Activity } from 'lucide-react';

export default function ProcessPage() {
  const steps = [
    {
      num: '01',
      name: 'Discover',
      icon: Search,
      color: 'text-blue-400 border-blue-500/30 bg-blue-950/40',
      description: 'Talk to users, benchmark competitors, and find the real problem rather than building immediate assumptions.',
      examples: 'StageConnect competitor benchmark across 10+ platforms; Zudio on-ground field survey of 33 shoppers.'
    },
    {
      num: '02',
      name: 'Decide',
      icon: Sliders,
      color: 'text-amber-400 border-amber-500/30 bg-amber-950/40',
      description: 'Prioritize ruthlessly, calculate trade-offs, and explicitly define what will NOT be built.',
      examples: 'KGH Rs 500 appointment fee credited against purchase; FinAssist trading 200 ms latency for trust.'
    },
    {
      num: '03',
      name: 'Ship',
      icon: Rocket,
      color: 'text-purple-400 border-purple-500/30 bg-purple-950/40',
      description: 'Execute under real-world constraints. Build with modern AI and engineering tools, coordinate timelines, and deliver.',
      examples: 'KGH e-commerce & appointment platform delivered in 2 months; CropSky dual ML models shipped to agritech startup.'
    },
    {
      num: '04',
      name: 'Measure',
      icon: Activity,
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40',
      description: 'Evaluate whether the solution actually solved the problem using rigorous empirical benchmarks.',
      examples: 'FinAssist eval suite (Precision@4 95%, MRR 1.0, Faithfulness 90%); verified evidence chips on every number in this portfolio.'
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-[#3c4043] pb-5 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
          <Workflow className="w-3.5 h-3.5 text-blue-400" />
          <span>PRODUCT EXECUTION METHODOLOGY</span>
        </div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Product Process
        </h1>
        <p className="text-xs text-[#9aa0a6] max-w-2xl leading-relaxed">
          How I approach product work: Discover the problem, make the hard trade-offs, ship on time, and measure real outcomes.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.num} className="bg-[#1e1f20] border border-[#3c4043] rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg border font-mono text-xs font-bold ${s.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h2 className="text-base font-bold text-white tracking-tight">
                    {s.num}. {s.name}
                  </h2>
                </div>
              </div>

              <p className="text-xs text-zinc-200 leading-relaxed">
                {s.description}
              </p>

              <div className="bg-[#18191b] p-3 rounded-lg border border-[#3c4043]/60 text-xs">
                <span className="font-mono text-[10px] uppercase text-[#9aa0a6] block mb-0.5">Real Evidence in Portfolio:</span>
                <span className="text-zinc-300">{s.examples}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
