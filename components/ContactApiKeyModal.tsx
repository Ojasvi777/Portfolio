'use client';

import React, { useState } from 'react';
import { KeyRound, Mail, Linkedin, Github, FileText, Check, Copy, X, Terminal, Phone } from 'lucide-react';
import TodoBadge from '@/components/TodoBadge';

interface ContactApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactApiKeyModal({ isOpen, onClose }: ContactApiKeyModalProps) {
  const [keyGenerated, setKeyGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  if (!isOpen) return null;

  const fakeKey = 'oj_live_4a89f7e8c21b99a0';

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setKeyGenerated(true);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fakeKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#18191b] border border-[#3c4043] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#282a2c] flex items-center justify-between bg-[#1e1f20]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Direct Contact & Channels</h2>
              <div className="text-[11px] text-[#9aa0a6] font-mono">ojasvikathuria777@gmail.com</div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-2 space-y-4 text-xs">
          <p className="text-zinc-300 leading-relaxed text-[11px]">
            Reach out directly for product management opportunities, engineering roles, or collaborations. You can generate an access session token or reach out directly below:
          </p>

          {!keyGenerated ? (
            <div className="p-4 rounded-xl bg-[#131314] border border-[#282a2c] text-center space-y-2.5">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">SESSION KEY PROTOCOL</div>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <Terminal className="w-3.5 h-3.5 animate-spin" />
                    <span className="text-white font-semibold">Provisioning session key...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-3.5 h-3.5 text-white" />
                    <span className="text-white font-semibold">Generate Developer Access Key</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-[#131314] border border-emerald-500/40 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  KEY PROVISIONED
                </span>
                <button
                  onClick={handleCopy}
                  className="text-zinc-400 hover:text-white flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700"
                >
                  {copiedKey ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="font-mono text-zinc-200 text-xs tracking-wider bg-black/40 p-2 rounded border border-zinc-800">
                {fakeKey}
              </div>
            </div>
          )}

          {/* Direct Communication Channels */}
          <div className="space-y-2.5 pt-1">
            <div className="text-[10px] font-mono uppercase text-[#80868b] tracking-wider font-semibold">
              Direct Contact Information
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {/* Email */}
              <a
                href="mailto:ojasvikathuria777@gmail.com"
                className="p-3 rounded-xl bg-[#131314] border border-[#282a2c] hover:border-blue-500/50 transition-colors space-y-1 block group"
              >
                <div className="flex items-center space-x-1.5 text-zinc-300 font-medium text-[11px]">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span className="group-hover:text-blue-400 transition-colors">Email</span>
                </div>
                <div className="text-white font-mono text-[11px] font-semibold truncate">
                  ojasvikathuria777@gmail.com
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+919779918777"
                className="p-3 rounded-xl bg-[#131314] border border-[#282a2c] hover:border-emerald-500/50 transition-colors space-y-1 block group"
              >
                <div className="flex items-center space-x-1.5 text-zinc-300 font-medium text-[11px]">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="group-hover:text-emerald-400 transition-colors">Phone</span>
                </div>
                <div className="text-white font-mono text-[11px] font-semibold">
                  +91 9779918777
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/ojasvi-kathuria-2a8932299"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#131314] border border-[#282a2c] hover:border-blue-500/50 transition-colors space-y-1 block group"
              >
                <div className="flex items-center space-x-1.5 text-zinc-300 font-medium text-[11px]">
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span className="group-hover:text-blue-400 transition-colors">LinkedIn</span>
                </div>
                <div className="text-[#9aa0a6] truncate font-mono text-[10px]">
                  in/ojasvi-kathuria-2a8932299
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Ojasvi777"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#131314] border border-[#282a2c] hover:border-blue-500/50 transition-colors space-y-1 block group"
              >
                <div className="flex items-center space-x-1.5 text-zinc-300 font-medium text-[11px]">
                  <Github className="w-3.5 h-3.5 text-zinc-300" />
                  <span className="group-hover:text-white transition-colors">GitHub</span>
                </div>
                <div className="text-[#9aa0a6] truncate font-mono text-[10px]">
                  github.com/Ojasvi777
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#1e1f20] border-t border-[#282a2c] flex items-center justify-between text-[11px] text-[#80868b] px-6">
          <span>Vellore Institute of Technology · B.Tech CS &amp; BS</span>
          <button 
            onClick={onClose}
            className="text-zinc-300 hover:text-white font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
