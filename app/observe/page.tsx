import React from 'react';
import { getMetricsData } from '@/lib/content';
import EvidenceChip from '@/components/EvidenceChip';
import TodoBadge from '@/components/TodoBadge';
import { Activity, ShieldCheck, Info } from 'lucide-react';

export default function ObservePage() {
  const metrics = getMetricsData();

  const countByEvidence = {
    MEASURED: metrics.filter(m => m.evidence === 'MEASURED').length,
    ESTIMATE: metrics.filter(m => m.evidence === 'ESTIMATE').length,
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-[#3c4043] pb-5 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>OBSERVE // METRICS &amp; EVIDENCE LEDGER</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Observe: Metrics Ledger
            </h1>
            <p className="text-xs text-[#9aa0a6] mt-1 max-w-2xl leading-relaxed">
              Numerical claims across the portfolio are categorized by their empirical verification level: <strong className="text-emerald-400">MEASURED</strong> or <strong className="text-amber-400">ESTIMATE</strong>. Hover over any chip to inspect the underlying verification method.
            </p>
          </div>

          {/* Verification Breakdown Counters */}
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400">
              {countByEvidence.MEASURED} MEASURED
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-400">
              {countByEvidence.ESTIMATE} ESTIMATE
            </span>
          </div>
        </div>
      </div>

      {/* Main Metrics Table */}
      <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl overflow-hidden shadow-lg">
        <div className="px-5 py-3.5 border-b border-[#3c4043] flex items-center justify-between bg-[#18191b] text-xs">
          <span className="font-semibold text-zinc-200">Portfolio Metrics Ledger ({metrics.length})</span>
          <span className="text-[11px] text-[#80868b] font-mono">Verified dataset entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#3c4043] bg-[#1e1f20] text-[10px] font-mono uppercase tracking-wider text-[#9aa0a6]">
                <th className="py-3 px-5">Metric Description</th>
                <th className="py-3 px-4">Value</th>
                <th className="py-3 px-4">Evidence Level</th>
                <th className="py-3 px-5">Verification Method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#282a2c]">
              {metrics.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#282a2c]/60 transition-colors">
                  <td className="py-3.5 px-5 font-medium text-white max-w-[280px]">
                    {item.metric}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-zinc-100 whitespace-nowrap">
                    {item.value}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {item.evidence === 'SELF-REPORTED' ? (
                      <span className="text-[10px] font-mono text-zinc-500">—</span>
                    ) : (
                      <EvidenceChip type={item.evidence as any} method={item.method} />
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-zinc-400 text-[11px]">
                    {item.method.includes('[TODO') ? (
                      <TodoBadge label={item.method} />
                    ) : (
                      <span>{item.method}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-[#3c4043] bg-[#18191b] flex items-center justify-between text-[11px] text-[#80868b]">
          <span>Empirical accountability across all published metrics</span>
        </div>
      </div>
    </div>
  );
}
