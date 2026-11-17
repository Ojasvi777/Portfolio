import React from 'react';
import Link from 'next/link';
import { User, Award, GraduationCap, Github, Linkedin, Mail, Phone, Code, Sparkles, Terminal } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-8 max-w-4xl pb-12">
      <div className="border-b border-[#3c4043] pb-5 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
          <User className="w-3.5 h-3.5 text-blue-400" />
          <span>ABOUT // PROFILE & BACKGROUND</span>
        </div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          I turn messy user problems into shipped AI products.
        </h1>
        <p className="text-xs text-[#9aa0a6] max-w-2xl leading-relaxed">
          Product thinker who ships the code. I find the problem first, then build the AI.
        </p>
      </div>

      {/* Intro Card with Photo & Summary */}
      <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border border-[#3c4043] flex-shrink-0 bg-[#141517] shadow-xl">
          <img
            src="/ojasvi.png"
            alt="Ojasvi"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-3 flex-1">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
            <span>B.Tech CS &amp; Business Systems · VIT '27</span>
          </div>
          <h2 className="text-lg font-bold text-white">Ojasvi Kathuria</h2>
          <p className="text-xs text-zinc-300 leading-relaxed">
            I'm Ojasvi, a final-year CS and Business Systems student at VIT Vellore. I founded StageConnect, led a 2-month client build as an intern at MeharSoft, and shipped crop-recommendation and disease-detection models at CropSky. My favorite part of product work is where a vague problem turns into a decision.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
            <a
              href="mailto:ojasvikathuria777@gmail.com"
              className="text-blue-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
            >
              <Mail className="w-3.5 h-3.5" /> ojasvikathuria777@gmail.com
            </a>
            <span className="text-zinc-600">•</span>
            <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> +91 9779918777
            </span>
          </div>
        </div>
      </div>

      {/* What I Do */}
      <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-mono text-zinc-400 uppercase font-semibold">What I Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-[#18191b] p-4 rounded-xl border border-[#3c4043] space-y-1.5">
            <div className="text-blue-400 font-bold font-mono text-[11px] uppercase">1. Discover</div>
            <div className="text-zinc-200 leading-relaxed">
              Talk to users, benchmark competitors, and isolate the real underlying problem.
            </div>
          </div>
          <div className="bg-[#18191b] p-4 rounded-xl border border-[#3c4043] space-y-1.5">
            <div className="text-amber-400 font-bold font-mono text-[11px] uppercase">2. Decide</div>
            <div className="text-zinc-200 leading-relaxed">
              Prioritize, make architectural trade-offs, and say what I will not build.
            </div>
          </div>
          <div className="bg-[#18191b] p-4 rounded-xl border border-[#3c4043] space-y-1.5">
            <div className="text-emerald-400 font-bold font-mono text-[11px] uppercase">3. Ship &amp; Measure</div>
            <div className="text-zinc-200 leading-relaxed">
              Build with AI tools, deploy reliably, and empirically evaluate whether it works.
            </div>
          </div>
        </div>
      </div>

      {/* Verified Education & Credentials */}
      <div className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-mono text-zinc-400 uppercase font-semibold">Education &amp; Credentials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Degree */}
          <div className="bg-[#18191b] p-3.5 rounded-xl border border-[#3c4043] flex items-center space-x-3">
            <GraduationCap className="w-4 h-4 text-zinc-400 flex-shrink-0" />
            <div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase">Degree</div>
              <div className="text-zinc-200 font-medium">B.Tech in Computer Science &amp; Business Systems</div>
              <div className="text-zinc-400 text-[11px]">Vellore Institute of Technology (VIT), May 2027</div>
            </div>
          </div>

          {/* CGPA */}
          <div className="bg-[#18191b] p-3.5 rounded-xl border border-[#3c4043] flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-400 flex-shrink-0 text-xs">
              8.88
            </div>
            <div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase">CGPA</div>
              <div className="text-emerald-400 font-semibold font-mono text-sm">8.88 / 10</div>
              <div className="text-zinc-400 text-[11px]">VIT Vellore Official Record</div>
            </div>
          </div>

          {/* AWS Certification */}
          <div className="bg-[#18191b] p-3.5 rounded-xl border border-[#3c4043] flex items-center space-x-3">
            <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase">Certification</div>
              <div className="text-zinc-200 font-medium">AWS Certified AI Practitioner (AIF-C01)</div>
              <div className="text-zinc-400 text-[11px]">Machine Learning &amp; Cloud AI Services</div>
            </div>
          </div>

          {/* VIT Top Coder */}
          <div className="bg-[#18191b] p-3.5 rounded-xl border border-[#3c4043] flex items-center space-x-3">
            <Code className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase">Competitive Programming</div>
              <div className="text-zinc-200 font-medium">VIT Top Coder (Ranked Top 200)</div>
              <div className="text-zinc-400 text-[11px]">Competitive coding &amp; algorithmic problem solving</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
