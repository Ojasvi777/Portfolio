import { EvidenceType } from '@/components/EvidenceChip';
import { CarouselImage } from '@/components/ImageCarousel';
import { ManifestTab } from '@/components/DepotManifestModal';

export interface ChipInfo {
  label: string;
  type: EvidenceType;
  method: string;
}

export interface ContainerItem {
  id: string;
  num: string;
  label: string;
  splitLabel: [string, string];
  manifestTab: ManifestTab;
  ctaLabel: string;
  color: string;
  colorDark: string;
  // Yard dock positioning coordinates (% of container yard area)
  dockLeft: number;
  dockTop: number;
  angle: number;
  trolleyPercent: number; // Crane alignment along top rail
  clawHeightVh: number;   // Cable drop height to touch container
  headline: string;
  highlightWord?: string;
  tags: string[];
  description: string;
  evidenceChips?: ChipInfo[];
  images: CarouselImage[];
}

export const CONTAINERS_DATA: ContainerItem[] = [
  {
    id: 'leadership',
    num: '01',
    label: 'LEADERSHIP',
    splitLabel: ['LEADER', 'SHIP'],
    manifestTab: 'leadership',
    ctaLabel: 'Explore Leadership & Awards',
    color: '#d32f2f', // Vermilion Red
    colorDark: '#9a1a1a',
    dockLeft: 14,
    dockTop: 47,
    angle: -11,
    trolleyPercent: 21,
    clawHeightVh: 39,
    headline: 'Leadership, National Fests & Awards.',
    tags: [
      'NIT Trichy Winner',
      'IIT Madras',
      'IIM Bangalore',
      'IIT Bombay',
      'Acting & Modelling Awards',
      'Club Leadership'
    ],
    description:
      'Represented and competed at India\'s premier national fests including NIT Trichy, IIT Madras, IIM Bangalore, and IIT Bombay. Won multiple national accolades across acting, dramatics, and modelling competitions while leading college clubs and hackathon teams.',
    evidenceChips: [
      {
        label: 'NIT Trichy & IIT Trophies',
        type: 'SELF-REPORTED',
        method: 'National cultural & tech fest award records'
      },
      {
        label: 'Acting & Modelling Awards',
        type: 'SELF-REPORTED',
        method: 'Collegiate stage competition certificates'
      }
    ],
    images: [
      { src: '/projects/leadership-awards.svg', caption: 'National Fest Accolades · NIT Trichy, IIT Madras, IIM-B, IIT Bombay' },
      { src: '/projects/stageconnect.svg', caption: 'Club & Team Leadership' }
    ]
  },
  {
    id: 'the-work',
    num: '02',
    label: 'THE WORK',
    splitLabel: ['THE', 'WORK'],
    manifestTab: 'work',
    ctaLabel: 'Inspect All 7 Projects',
    color: '#e65100', // Terracotta Orange
    colorDark: '#a33900',
    dockLeft: 4,
    dockTop: 67,
    angle: -6,
    trolleyPercent: 11,
    clawHeightVh: 59,
    headline: 'The Work · 7 Projects & Models.',
    tags: [
      'StageConnect',
      'KGH Platform',
      'License Automation',
      'FinAssist',
      'CropSky ML',
      'Travel Concierge',
      'Energy Dashboard',
      'Perplexity Teardown'
    ],
    description:
      '7 products, platforms, data models, and teardowns. Built from scratch with real users, clear architecture trade-offs, and empirical outcomes.',
    evidenceChips: [
      {
        label: '~500 Waitlist',
        type: 'SELF-REPORTED',
        method: 'Waitlist database export'
      },
      {
        label: '2-Month Delivery',
        type: 'SELF-REPORTED',
        method: 'Client sign-off records'
      },
      {
        label: '~80% Less Toil',
        type: 'ESTIMATE',
        method: 'Operator time savings audit'
      }
    ],
    images: [
      { src: '/assets/images/finassist1.png', caption: 'FinAssist · AMEX Card Spend & Points Optimizer' },
      { src: '/assets/images/finassist4.png', caption: 'FinAssist · End-to-End RAG Pipeline Architecture' },
      { src: '/assets/images/finassist2.png', caption: 'FinAssist · Grounded Chat & FAISS Context Cache' },
      { src: '/assets/images/finassist3.png', caption: 'FinAssist · Verified Benefits Retrieval & Citations' },
      { src: '/assets/images/license2.png', caption: 'License Automation · Smart Form III & DL OCR Engine' },
      { src: '/assets/images/license1.png', caption: 'License Automation · Order Verification' },
      { src: '/assets/images/travel2.png', caption: 'Travel Concierge · Multi-Agent Routing Console' },
      { src: '/assets/images/travel1.png', caption: 'Travel Concierge · Dynamic Timeline & Itinerary' },
      { src: '/assets/images/travel3.png', caption: 'Travel Concierge · Autonomous Trip Planner' },
      { src: '/projects/stageconnect.svg', caption: 'StageConnect · 500+ Waitlist Marketplace' },
      { src: '/projects/kgh-platform.svg', caption: 'KGH Platform · 2-Month Delivery' },
      { src: '/projects/cropsky.svg', caption: 'CropSky · 94.24% Crop ML & Disease Model' }
    ]
  },
  {
    id: 'about-me',
    num: '03',
    label: 'ABOUT ME',
    splitLabel: ['ABOUT', 'ME'],
    manifestTab: 'about',
    ctaLabel: 'Read Full Bio & Certifications',
    color: '#1565c0', // Deep Cobalt Blue
    colorDark: '#0d3c75',
    dockLeft: 23,
    dockTop: 72,
    angle: 3,
    trolleyPercent: 30,
    clawHeightVh: 64,
    headline: 'About Me.',
    tags: [
      'VIT Vellore \'27',
      'AWS Certified AI',
      'Deep Learning (A-Z)',
      'PowerBI Certified',
      'Product Thinker'
    ],
    description:
      'Final-year CS and Business Systems student at VIT Vellore. Certified in AWS AI, Deep Learning (A-Z) by Udemy, and Microsoft PowerBI. Combining deep technical fluency with customer discovery and product prioritization.',
    evidenceChips: [
      {
        label: 'VIT Vellore May 2027',
        type: 'MEASURED',
        method: 'Official university registration'
      },
      {
        label: 'AWS Certified AI',
        type: 'MEASURED',
        method: 'AWS credential verification'
      },
      {
        label: 'Deep Learning (A-Z)',
        type: 'MEASURED',
        method: 'Udemy certificate verification'
      },
      {
        label: 'PowerBI Certified',
        type: 'MEASURED',
        method: 'Credential verification record'
      }
    ],
    images: [
      { src: '/projects/about-credentials.svg', caption: 'Academic & AI Certifications · VIT Vellore 2027' },
      { src: '/projects/stageconnect.svg', caption: 'Product & Tech Leadership' }
    ]
  },
  {
    id: 'say-hello',
    num: '04',
    label: 'SAY HELLO',
    splitLabel: ['SAY', 'HELLO'],
    manifestTab: 'contact',
    ctaLabel: 'Generate API Key & Connect',
    color: '#1e40af', // Centered Royal Blue
    colorDark: '#13286b',
    dockLeft: 37,
    dockTop: 49,
    angle: -2,
    trolleyPercent: 44,
    clawHeightVh: 42,
    headline: 'Hi, I\'m',
    highlightWord: 'Ojasvi.',
    tags: [
      'ojasvikathuria777@gmail.com',
      'LinkedIn',
      'GitHub',
      'Direct Connect',
      'VIT Vellore'
    ],
    description:
      'I find the problem first. Then I build the AI. I turn messy user problems into shipped AI products. Generate an API key to unlock my direct contact channels.',
    evidenceChips: [
      {
        label: 'Final-Year Student',
        type: 'MEASURED',
        method: 'VIT Vellore 2023-2027 enrollment'
      }
    ],
    images: [
      { src: '/ojasvi.png', caption: 'Ojasvi Kathuria · Connect' }
    ]
  },
  {
    id: 'pm-work',
    num: '05',
    label: 'PM WORK',
    splitLabel: ['PM', 'WORK'],
    manifestTab: 'cases',
    ctaLabel: 'Open PRDs & Teardowns',
    color: '#c62828', // Crimson Red
    colorDark: '#8e1b1b',
    dockLeft: 60,
    dockTop: 51,
    angle: 18,
    trolleyPercent: 68,
    clawHeightVh: 43,
    headline: 'PM Work & Teardowns.',
    tags: [
      'Google Calendar PRD',
      'Decision Logs',
      'Product Teardowns',
      'Trade-off Matrices'
    ],
    description:
      'Structured Product Requirements Documents (PRDs), product teardowns, user problem framing, and the Decision Log of "What I chose NOT to build" — highlighting strategic trade-off thinking.',
    evidenceChips: [
      {
        label: 'Precision@4 95%',
        type: 'MEASURED',
        method: 'Automated 12-question benchmark'
      },
      {
        label: 'Trade-off Documented',
        type: 'MEASURED',
        method: 'Architecture decision logs'
      }
    ],
    images: [
      { src: '/projects/calendar-teardown.svg', caption: 'Google Calendar PRD & Teardown' },
      { src: '/assets/images/finassist2.png', caption: 'Trading 200 ms for Trust · FAISS Filter' },
      { src: '/projects/kgh-platform.svg', caption: 'The Rs 500 Appointment Fee' },
      { src: '/projects/stageconnect.svg', caption: 'Why StageConnect Pivoted' }
    ]
  },
  {
    id: 'process',
    num: '06',
    label: 'PROCESS',
    splitLabel: ['PRO', 'CESS'],
    manifestTab: 'observe',
    ctaLabel: 'Audit Verified Metrics & Evals',
    color: '#f59e0b', // Golden Amber
    colorDark: '#a16207',
    dockLeft: 48,
    dockTop: 68,
    angle: -3,
    trolleyPercent: 55,
    clawHeightVh: 60,
    headline: 'Process & Evals.',
    tags: [
      'Discover',
      'Decide',
      'Ship',
      'Measure'
    ],
    description:
      'Discover: talk to users, benchmark competitors, find the real problem. Decide: prioritize, make trade-offs, and say what I won\'t build. Ship & measure: build with AI tools, evaluate whether it works.',
    evidenceChips: [
      {
        label: '2-Month Ship',
        type: 'SELF-REPORTED',
        method: 'Project timeline'
      },
      {
        label: 'Evidence-Backed',
        type: 'MEASURED',
        method: 'Site-wide data.json audit'
      }
    ],
    images: [
      { src: '/assets/images/license2.png', caption: 'Toil Automation Discovery · OCR Engine' },
      { src: '/projects/cropsky.svg', caption: 'Model Evaluation · CropSky 94.24%' }
    ]
  },
  {
    id: 'toolkit',
    num: '07',
    label: 'TOOL KIT',
    splitLabel: ['TOOL', 'KIT'],
    manifestTab: 'work',
    ctaLabel: 'Inspect Technical Stack',
    color: '#78909c', // Slate Cargo Gray
    colorDark: '#455a64',
    dockLeft: 73,
    dockTop: 67,
    angle: 5,
    trolleyPercent: 81,
    clawHeightVh: 59,
    headline: 'Tool Kit · Technical Stack.',
    tags: [
      'Gemini API & RAG',
      'Python & PyTorch',
      'Next.js & TypeScript',
      'FAISS Vector DB',
      'PowerBI & SQL'
    ],
    description:
      'AI & ML: Gemini API, RAG (FAISS), XGBoost, CNNs, OCR (Tesseract, OpenCV), Model Evals. Engineering: Python, Next.js, React, PostgreSQL, FastAPI, AWS. Analytics: PowerBI, SQL, Mixpanel.',
    evidenceChips: [
      {
        label: 'AWS Certified AI',
        type: 'MEASURED',
        method: 'AWS credential verification'
      },
      {
        label: 'PowerBI Certified',
        type: 'MEASURED',
        method: 'Credential verification record'
      }
    ],
    images: [
      { src: '/assets/images/license2.png', caption: 'Automation & OCR Pipeline' },
      { src: '/assets/images/finassist4.png', caption: 'FAISS Vector Pipeline' }
    ]
  }
];
