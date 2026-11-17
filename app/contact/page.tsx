'use client';

import React, { useState } from 'react';
import { KeyRound, Mail, Linkedin, Github, FileText, Check, Copy, Phone } from 'lucide-react';
import TodoBadge from '@/components/TodoBadge';

export default function ContactPage() {
  const [apiKeyGenerated, setApiKeyGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const fakeKey = "oj_live_4a89f7e8c21b99a0";

  const handleGenerateKey = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setApiKeyGenerated(true);
    }, 600);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(fakeKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl pb-12">
      <div className="border-b border-[#3c4043] pb-5 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
          <KeyRound className="w-3.5 h-3.5 text-blue-400" />
          <span>CONTACT &amp; DIRECT ACCESS</span>
        </div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Get in Touch
        </h1>
        <p className="text-xs text-[#9aa0a6] max-w-xl leading-relaxed">
          Connect directly for product management opportunities, engineering roles, or collaborative projects.
        </p>
      </div>

      {/* Key Generation Container */}
      <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#282a2c]">
          <div>
            <h2 className="text-sm font-semibold text-white">Developer Session Key</h2>
            <p className="text-xs text-[#9aa0a6]">Provision a verified developer access key to unlock communication APIs.</p>
          </div>

          <button
            onClick={handleGenerateKey}
            disabled={isGenerating || apiKeyGenerated}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-[#282a2c] disabled:text-[#80868b] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5 text-white" />
            <span className="text-white font-semibold">
              {apiKeyGenerated ? 'Key Generated' : isGenerating ? 'Provisioning...' : 'Generate Access Key'}
            </span>
          </button>
        </div>

        {apiKeyGenerated && (
          <div className="bg-[#18191b] p-3 rounded-lg border border-emerald-500/30 flex items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center space-x-2 truncate">
              <span className="text-emerald-400 font-bold">● LIVE:</span>
              <span className="text-zinc-200 truncate">{fakeKey}</span>
            </div>
            <button
              onClick={handleCopyKey}
              className="text-zinc-300 hover:text-white flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-[#282a2c] border border-zinc-700"
            >
              {copiedKey ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        )}

        {/* Direct Links */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-mono text-[#9aa0a6] uppercase font-semibold">Direct Communication Links</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Email */}
            <a
              href="mailto:ojasvikathuria777@gmail.com"
              className="bg-[#18191b] p-4 rounded-xl border border-[#3c4043] hover:border-blue-500/50 transition-colors space-y-1 block group"
            >
              <div className="flex items-center space-x-2 text-zinc-300 font-medium">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="group-hover:text-blue-400 transition-colors">Email</span>
              </div>
              <div className="text-white font-mono text-xs font-semibold truncate">
                ojasvikathuria777@gmail.com
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+919779918777"
              className="bg-[#18191b] p-4 rounded-xl border border-[#3c4043] hover:border-emerald-500/50 transition-colors space-y-1 block group"
            >
              <div className="flex items-center space-x-2 text-zinc-300 font-medium">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="group-hover:text-emerald-400 transition-colors">Phone</span>
              </div>
              <div className="text-white font-mono text-xs font-semibold">
                +91 9779918777
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/ojasvi-kathuria-2a8932299"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#18191b] p-4 rounded-xl border border-[#3c4043] hover:border-blue-400/50 transition-colors space-y-1 block group"
            >
              <div className="flex items-center space-x-2 text-zinc-300 font-medium">
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span className="group-hover:text-blue-400 transition-colors">LinkedIn</span>
              </div>
              <div className="text-[#9aa0a6] truncate font-mono text-[11px]">
                linkedin.com/in/ojasvi-kathuria-2a8932299
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Ojasvi777"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#18191b] p-4 rounded-xl border border-[#3c4043] hover:border-blue-400/50 transition-colors space-y-1 block group"
            >
              <div className="flex items-center space-x-2 text-zinc-300 font-medium">
                <Github className="w-4 h-4 text-zinc-300" />
                <span className="group-hover:text-white transition-colors">GitHub</span>
              </div>
              <div className="text-[#9aa0a6] truncate font-mono text-[11px]">
                github.com/Ojasvi777
              </div>
            </a>

            {/* Resume PDF */}
            <div className="bg-[#18191b] p-4 rounded-xl border border-[#3c4043] space-y-1 sm:col-span-2">
              <div className="flex items-center space-x-2 text-zinc-300 font-medium">
                <FileText className="w-4 h-4 text-purple-400" />
                <span>Resume PDF</span>
              </div>
              <div>
                <TodoBadge label="Upload your resume PDF to public/resume.pdf" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
