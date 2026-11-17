import React from 'react';
import { Wrench, Cpu, Code2, Database, Cloud, BookOpen, Layers } from 'lucide-react';

export default function ToolkitPage() {
  const skillSections = [
    {
      title: 'AI / Machine Learning',
      icon: Cpu,
      color: 'text-blue-400',
      skills: [
        'Machine Learning',
        'Deep Learning',
        'Generative AI',
        'Large Language Models (LLMs)',
        'RAG (Retrieval-Augmented Generation)',
        'Semantic Search',
        'Transformer Embeddings',
        'Agentic AI (CrewAI, LangChain)',
        'FAISS Vector Store',
        'scikit-learn',
        'Statsmodels',
        'Time-Series Forecasting (ARIMA)',
        'OCR (Tesseract, OpenCV)',
        'Model Evals & Benchmarks',
        'Gemini API',
        'Google Antigravity'
      ]
    },
    {
      title: 'Programming Languages',
      icon: Code2,
      color: 'text-emerald-400',
      skills: [
        'Python',
        'TypeScript',
        'JavaScript',
        'SQL',
        'Java',
        'C/C++'
      ]
    },
    {
      title: 'Backend & Databases',
      icon: Database,
      color: 'text-purple-400',
      skills: [
        'FastAPI',
        'Next.js (App Router)',
        'React',
        'Node.js & Express.js',
        'PostgreSQL & pgvector',
        'MongoDB',
        'Redis',
        'Prisma ORM',
        'REST APIs & Microservices',
        'Async Workflows',
        'JWT / OAuth & RBAC'
      ]
    },
    {
      title: 'Data & Analytics',
      icon: Layers,
      color: 'text-cyan-400',
      skills: [
        'Pandas',
        'NumPy',
        'Matplotlib & Seaborn',
        'Power BI',
        'Excel',
        'Data Validation & ETL Pipelines',
        'Statistical Modeling'
      ]
    },
    {
      title: 'Cloud & Infrastructure',
      icon: Cloud,
      color: 'text-amber-400',
      skills: [
        'AWS (EC2, Lambda, S3, IAM, CloudWatch, SNS)',
        'Docker & Docker Compose',
        'Git & GitHub CI/CD',
        'pytest',
        'Playwright & Selenium'
      ]
    },
    {
      title: 'Product Management',
      icon: BookOpen,
      color: 'text-rose-400',
      skills: [
        'Problem discovery',
        'User interviews & research',
        'Competitor benchmarking',
        'Feature prioritization & trade-off analysis',
        'Product Requirement Documents (PRDs)',
        'Stakeholder & client management',
        'Go-To-Market & Waitlist Growth'
      ]
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl pb-12">
      <div className="border-b border-[#3c4043] pb-5 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
          <Wrench className="w-3.5 h-3.5 text-blue-400" />
          <span>TECHNICAL SKILLS &amp; CAPABILITIES</span>
        </div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Skills &amp; Technical Toolkit
        </h1>
        <p className="text-xs text-[#9aa0a6] max-w-2xl leading-relaxed">
          Comprehensive stack across AI/ML systems, backend engineering, cloud platforms, and product discovery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillSections.map((sec) => {
          const Icon = sec.icon;
          return (
            <div key={sec.title} className="bg-[#1e1f20] border border-[#3c4043] rounded-2xl p-5 space-y-3 flex flex-col">
              <div className="flex items-center space-x-2 text-xs font-mono font-semibold">
                <Icon className={`w-4 h-4 ${sec.color}`} />
                <span className="text-white">{sec.title}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {sec.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-[#18191b] border border-[#3c4043]/70 px-2.5 py-1 rounded-lg text-[11px] font-mono text-zinc-300 hover:border-blue-500/40 hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
