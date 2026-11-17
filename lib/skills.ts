export interface SkillItem {
  name: string;
  category: 'ai-ml' | 'languages' | 'backend' | 'data' | 'cloud' | 'cs-fundamentals' | 'product';
  provenIn: string[];
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  color: string;
  accentBg: string;
  skills: {
    name: string;
    provenIn?: string[];
    tag?: string;
  }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'ai-ml',
    title: 'AI / Machine Learning & Generative AI',
    description: 'RAG architectures, multi-agent chains, computer vision OCR, and predictive models.',
    color: 'text-blue-400',
    accentBg: 'bg-blue-500/10 border-blue-500/20',
    skills: [
      { name: 'RAG (Retrieval-Augmented Generation)', provenIn: ['FinAssist', 'Wise Work'], tag: 'Production' },
      { name: 'Vector Search (FAISS)', provenIn: ['FinAssist'] },
      { name: 'Computer Vision & CNNs', provenIn: ['CropSky', 'License Verification'] },
      { name: 'OCR (Tesseract, OpenCV)', provenIn: ['License Verification System'], tag: '80% Toil Cut' },
      { name: 'Transformer Embeddings (MiniLM)', provenIn: ['FinAssist', 'Wise Work'] },
      { name: 'XGBoost & scikit-learn', provenIn: ['CropSky ML (94.24% Acc)'] },
      { name: 'Time-Series Forecasting (ARIMA)', provenIn: ['Global Energy Trends'] },
      { name: 'Large Language Models (LLMs)', provenIn: ['FinAssist', 'Gemini RAG'] },
      { name: 'Semantic Search Systems', provenIn: ['Wise Work', 'FinAssist'] },
      { name: 'Model Evals & Confidence Scoring', provenIn: ['FinAssist (Precision@4 95%)'] },
      { name: 'Gemini API & Antigravity', provenIn: ['FinAssist'] }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Engineering & Distributed Systems',
    description: 'Production APIs, async pipelines, relational modeling, and stateful multi-tiered backends.',
    color: 'text-purple-400',
    accentBg: 'bg-purple-500/10 border-purple-500/20',
    skills: [
      { name: 'FastAPI', provenIn: ['FinAssist'], tag: 'Core Backend' },
      { name: 'Next.js (App Router)', provenIn: ['KGH Platform (buyairgunsindia.in)'], tag: 'Production' },
      { name: 'PostgreSQL & Prisma ORM', provenIn: ['KGH Platform'] },
      { name: 'REST APIs & Microservices', provenIn: ['KGH Platform', 'Wise Work'] },
      { name: 'Async Programming', provenIn: ['FastAPI Services', 'FinAssist'] },
      { name: 'SQL Indexing & Query Tuning', provenIn: ['KGH (25% Query Speedup)'] },
      { name: 'MongoDB & SQLite', provenIn: ['License Verification', 'Global Energy'] },
      { name: 'Node.js & Express.js', provenIn: ['Fullstack Services'] }
    ]
  },
  {
    id: 'languages',
    title: 'Programming Languages',
    description: 'Object-oriented, functional, and database scripting across production environments.',
    color: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10 border-emerald-500/20',
    skills: [
      { name: 'Python', provenIn: ['FinAssist', 'License OCR', 'CropSky', 'Wise Work'], tag: 'Primary' },
      { name: 'TypeScript & JavaScript', provenIn: ['KGH Platform', 'FinAssist Frontend'] },
      { name: 'SQL (PostgreSQL, SQLite)', provenIn: ['KGH Platform', 'Global Energy Trends'] },
      { name: 'Java', provenIn: ['DSA & Core Systems'] },
      { name: 'C / C++', provenIn: ['Competitive Programming (Top 200)'] }
    ]
  },
  {
    id: 'data',
    title: 'Data Science & Analytical Modeling',
    description: 'Large-scale tabular cleansing, statistical regression, and interactive dashboards.',
    color: 'text-cyan-400',
    accentBg: 'bg-cyan-500/10 border-cyan-500/20',
    skills: [
      { name: 'Pandas & NumPy', provenIn: ['Wise Work (250K+ records)', 'CropSky'], tag: '250K+ Cleaned' },
      { name: 'Statsmodels (Regression R² ~0.87)', provenIn: ['Global Energy Trends', 'CropSky'] },
      { name: 'Power BI & Executive Dashboards', provenIn: ['Global Energy', 'License Verification'] },
      { name: 'Matplotlib & Seaborn', provenIn: ['CropSky', 'Data Analysis'] },
      { name: 'Data Validation & ETL', provenIn: ['Wise Work', 'Global Energy (10K+ records)'] },
      { name: 'Statistical Hypothesis Testing', provenIn: ['Global Energy Trends'] }
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud Infrastructure & Engineering Tools',
    description: 'Cloud deployment, containerization, CI/CD, and web scraping automation.',
    color: 'text-amber-400',
    accentBg: 'bg-amber-500/10 border-amber-500/20',
    skills: [
      { name: 'AWS (EC2, Lambda, S3, IAM, CloudWatch, SNS)', provenIn: ['KGH Platform', 'SIH 2025'], tag: 'AWS Certified' },
      { name: 'Git & GitHub CI/CD', provenIn: ['All Projects'] },
      { name: 'Playwright & Selenium (Scraping/Testing)', provenIn: ['FinAssist Ingestion', 'License Verification'] },
      { name: 'pytest (Unit & Integration Testing)', provenIn: ['Backend Services'] },
      { name: 'Razorpay Payment Gateway Integration', provenIn: ['KGH Platform (buyairgunsindia.in)'] }
    ]
  },
  {
    id: 'product-cs',
    title: 'Product Management & CS Fundamentals',
    description: 'System design, user discovery, feature prioritization, and engineering execution.',
    color: 'text-rose-400',
    accentBg: 'bg-rose-500/10 border-rose-500/20',
    skills: [
      { name: 'Problem Discovery & User Interviews', provenIn: ['StageConnect', 'Zudio Field Study (33 shoppers)'], tag: 'User Centric' },
      { name: 'Competitor Benchmarking (10+ Platforms)', provenIn: ['StageConnect Pivot'] },
      { name: 'Prioritization & Trade-off Framing', provenIn: ['FinAssist Latency vs Trust', 'KGH ₹500 Fee'] },
      { name: 'Product Requirement Documents (PRDs)', provenIn: ['Perplexity Teardown', 'StageConnect'] },
      { name: 'Data Structures & Algorithms (DSA)', provenIn: ['VIT Top Coder (Top 200)'] },
      { name: 'System Design & Scalable Architecture', provenIn: ['KGH Platform', 'Wise Work RAG'] },
      { name: 'Operating Systems & DBMS Architecture', provenIn: ['PostgreSQL & SQLite Systems'] }
    ]
  }
];
