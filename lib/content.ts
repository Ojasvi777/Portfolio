import fs from 'fs';
import path from 'path';

export interface MetricItem {
  metric: string;
  value: string;
  evidence: 'MEASURED' | 'ESTIMATE' | 'SELF-REPORTED';
  method: string;
}

export interface ProjectItem {
  slug: string;
  name: string;
  role: string;
  stage: string;
  oneLiner: string;
  problem: string;
  decisions: string;
  solution?: string;
  outcome?: string;
  traction?: string;
  impact: string;
  evidence: 'MEASURED' | 'ESTIMATE' | 'SELF-REPORTED';
  evidenceMethod?: string;
  status: string;
  stack?: string;
  link?: string;
  repo?: string;
  notes?: string;
}

export function getMetricsData(): MetricItem[] {
  const filePath = path.join(process.cwd(), 'content', 'data.json');
  if (!fs.existsSync(filePath)) return [];
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

export function getProjects(): ProjectItem[] {
  return [
    {
      slug: 'stageconnect',
      name: 'StageConnect',
      role: 'Founder and CEO',
      stage: 'Pre-launch (waitlist)',
      oneLiner: 'A marketplace where brands, agencies and theatre groups find live-performance talent.',
      problem: 'I ran into the gap myself. There was no single place for people in live performance and the wider entertainment industry to find opportunities, and brands had no good way to find the right person.',
      decisions: 'Narrowed from broad talent discovery to live-performance gigs; verify everyone who joins and back bookings with contracts; build an applicant-to-role matching algorithm.',
      traction: 'About 325 conversations (300 performers and users, 25 agencies and brands). Reached 700 to 800 prospects. About 500 joined the waitlist. 25 to 30 brands confirmed at launch.',
      impact: 'About 500 joined waitlist',
      evidence: 'SELF-REPORTED',
      evidenceMethod: 'Pre-launch waitlist database export',
      status: 'Pre-launch (waitlist)',
      stack: '[TODO]',
      link: '[TODO]'
    },
    {
      slug: 'kgh-platform',
      name: 'KGH platform',
      role: 'Product lead and engineer (intern at MeharSoft)',
      stage: 'Live',
      oneLiner: 'A custom e-commerce and appointment-booking site for the client Kathuria Gun House, delivered in 2 months.',
      problem: 'The client needed an online store and appointment booking on a fixed deadline and a tight budget.',
      decisions: 'Picked hosting and database for cost (AWS free tier + managed cloud PostgreSQL); made appointments cost Rs 500 credited against product purchase; showed only genuine users reviews.',
      outcome: 'Live and used by the client since launch; they are happy. They get more purposeful calls and fewer no-purchase enquiries.',
      impact: 'Delivered in 2 months, live and used',
      evidence: 'SELF-REPORTED',
      evidenceMethod: 'Client sign-off and delivery milestone records',
      status: 'Live',
      link: 'buyairgunsindia.in',
      repo: 'github.com/Avadhoot1905/KGH',
      stack: 'Next.js, PostgreSQL, Prisma, AWS (EC2, Lambda, CloudWatch), Razorpay'
    },
    {
      slug: 'license-verification',
      name: 'License Verification Automation',
      role: 'Builder (at MeharSoft, for the KGH client)',
      stage: '[TODO: in use by the client?]',
      oneLiner: 'Automation that checks customers\' licenses against a government portal.',
      problem: 'While building the store I saw the client\'s staff check every license by hand: open government portal, solve a captcha, compare details, and type into Excel.',
      decisions: 'Used OCR with OpenCV preprocessing and regex parsing instead of a trained model; left captcha as one manual step; built desktop app first (Tkinter) then rebuilt as Next.js app.',
      solution: 'A tool that reads license documents with OCR, extracts details, checks against portal, updates Excel records, and tracks verification status in a Power BI dashboard.',
      impact: 'Manual effort down about 80%',
      evidence: 'ESTIMATE',
      evidenceMethod: '[TODO: confirm with timing]',
      status: '[TODO: in use by the client?]',
      stack: 'Python, OpenCV, Tesseract, Playwright/Selenium, Pandas, SQLite, Tkinter, Next.js, Power BI'
    },
    {
      slug: 'finassist',
      name: 'FinAssist',
      role: 'Solo builder',
      stage: 'Demo',
      oneLiner: 'A chatbot that answers American Express card questions with source links and confidence scores.',
      problem: 'I went to American Express\'s website with questions and there was no chatbot, and the site was cluttered.',
      decisions: 'RAG over re-crawling; added a Monte Carlo dropout confidence filter (~200 ms vs ~5 ms); refuse to answer when no relevant context exists; condensed follow-ups into standalone queries.',
      outcome: 'Precision@4 95%, MRR 1.0, faithfulness 90%, answer correctness about 82%, retrieval about 207 ms.',
      impact: 'Precision@4 95%, MRR 1.0, 90% Faithfulness',
      evidence: 'MEASURED',
      evidenceMethod: 'Automated 12-question benchmark suite',
      status: 'Demo',
      repo: 'github.com/Ojasvi777/FinAssist-rag-finance-assistant-',
      stack: 'Python, FastAPI, React, TypeScript, FAISS, Sentence Transformers (MiniLM), Gemini 2.5 Flash, Playwright'
    },
    {
      slug: 'cropsky-ml',
      name: 'CropSky ML models',
      role: 'AI/ML intern at a VIT-TBI agritech startup',
      stage: 'Shipped to the startup',
      oneLiner: 'Two models that help farmers choose crops and catch crop diseases early.',
      problem: 'Farmers struggle to spot crop disease early, and beginners don\'t know which crop suits their plot.',
      decisions: '[TODO: one decision I made, for example why XGBoost for sensor data and a CNN for images, and why].',
      solution: 'A crop-recommendation model using soil, temperature and environment sensor data (XGBoost), and a CNN that detects crop disease from images. Worked on both models and cleaned 10K+ agricultural samples.',
      impact: '94.24% crop rec / 92.6% disease detection',
      evidence: 'MEASURED',
      evidenceMethod: 'Measured model evaluation test set',
      status: 'Shipped to the startup',
      stack: 'Python, scikit-learn, XGBoost, CNN, Pandas'
    },
    {
      slug: 'global-energy',
      name: 'Global Energy Trends Dashboard',
      role: 'Solo',
      stage: 'Complete',
      oneLiner: 'Forecasts and trends for energy use across 200+ countries.',
      problem: 'I wanted to understand how energy patterns differ by country, energy type, GDP and imports and exports, using Our World in Data.',
      decisions: 'Separated country rows from regional totals; interpolated only short data gaps; used both regression and ARIMA.',
      outcome: '10K+ records, 200+ countries, 1965 to 2023. Regression out-of-sample R-squared about 0.87. ARIMA forecasts for major economies with mean MAPE about 6.5%. 11 datasets exported to Power BI.',
      impact: 'R² ~0.87 / Mean MAPE ~6.5% across 200+ countries',
      evidence: 'MEASURED',
      evidenceMethod: '10K+ country records (1965 to 2023)',
      status: 'Complete',
      stack: 'Python, SQL (SQLite), Statsmodels, ARIMA, Power BI'
    },
    {
      slug: 'perplexity-teardown',
      name: 'Perplexity Product Teardown',
      role: 'Independent',
      stage: 'Concept (not built)',
      oneLiner: 'A teardown of Perplexity\'s search experience and a proposal called Evidence-first Answers.',
      problem: 'I wanted to understand why people trust or distrust answers from AI search tools, and what a product could do about it.',
      decisions: 'Weighed verification accuracy against response speed, inference cost and user trust; defined success metrics (claim-support precision, unsupported-claim rate, time-to-verified-answer).',
      outcome: 'A 4-query exploratory test showed a freshness gap: one answer acknowledged a newer 2026 estimate but did not give the figure. This is a concept and a PRD, not a shipped product.',
      impact: '4-Query Exploratory Audit & Evidence PRD',
      evidence: 'MEASURED',
      evidenceMethod: '4-query exploratory benchmark',
      status: 'Concept (not built)',
      stack: '[TODO]',
      notes: '[TODO: PRD link]'
    }
  ];
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return getProjects().find(p => p.slug === slug);
}

export function getAboutContent() {
  const filePath = path.join(process.cwd(), 'content', 'about.md');
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf-8');
}

export function getCasesContent() {
  const filePath = path.join(process.cwd(), 'content', 'cases.md');
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf-8');
}

export function getLeadershipContent() {
  const filePath = path.join(process.cwd(), 'content', 'leadership.md');
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf-8');
}

export function getToolkitContent() {
  const filePath = path.join(process.cwd(), 'content', 'toolkit.md');
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf-8');
}

export function getProcessContent() {
  const filePath = path.join(process.cwd(), 'content', 'process.md');
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf-8');
}

export function getContactContent() {
  const filePath = path.join(process.cwd(), 'content', 'contact.md');
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf-8');
}
