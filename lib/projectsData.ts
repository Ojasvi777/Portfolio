import { EvidenceType } from '@/components/EvidenceChip';

export interface ProjectDecision {
  decision: string;
  why: string;
  isTodo?: boolean;
}

export interface ProjectMetricChip {
  label: string;
  type: EvidenceType;
  method?: string;
  isTodo?: boolean;
}

export interface ProjectLinks {
  githubUrl?: string;
  githubLabel?: string;
  liveUrl?: string;
  liveLabel?: string;
  prdUrl?: string;
  prdLabel?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  status: string;
  statusColor: string;
  role: string;
  timeframe?: string;
  stack: string[];
  whyBuilt: string;
  whyBuiltLabel?: string;
  whatIBuilt: string;
  whatIBuiltLabel?: string;
  decisions: ProjectDecision[];
  whatHappened: {
    text: string;
    evidenceChips: ProjectMetricChip[];
    brokenAndFixed?: string;
    knownLimit?: string;
    todos?: string[];
  };
  links: ProjectLinks;
  image?: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'stageconnect',
    title: 'StageConnect',
    summary: 'A marketplace where brands, agencies and theatre groups find live-performance talent.',
    status: 'Pre-launch (waitlist)',
    statusColor: 'text-blue-400 border-blue-400/30 bg-blue-500/10',
    role: 'Founder and CEO',
    timeframe: '2025 to present',
    stack: ['[TODO]'],
    whyBuilt:
      'I ran into the gap myself. There was no single place for people in live performance and the wider entertainment industry to find opportunities, and brands had no good way to find the right person. Before building, I studied 10+ existing platforms (Mandy, Backstage, Actors Access/Breakdown Services, CastKro, Dazzlerr, Casting Bay and others). Most were limited to actors and models, had weak reach, or left brands buried in applications.',
    whatIBuilt:
      'A platform where performers, agencies and brands sign up, brands post live-performance gigs, applicants are matched to the role, and everyone is verified.',
    decisions: [
      {
        decision: 'Narrowed from broad talent discovery to live-performance gigs.',
        why: "Every competitor offered the same broad directory and it wasn't working for brands."
      },
      {
        decision: 'Verify everyone who joins and back bookings with contracts.',
        why: "People told me signed contracts weren't honored or were underpaid, and nothing verified who was real."
      },
      {
        decision: 'Build an applicant-to-role matching algorithm.',
        why: "Brands got too many applications through WhatsApp and email and couldn't find the right person."
      }
    ],
    whatHappened: {
      text:
        'About 325 conversations (300 performers and users, 25 agencies and brands). Reached 700 to 800 prospects. About 500 joined the waitlist. 25 to 30 brands, agencies and theatre groups across India confirmed they will join at launch. Not launched yet. Performers said they will join once it is live; brands said their auditions sit scattered across WhatsApp and email on local devices.',
      evidenceChips: [
        {
          label: 'About 325 Conversations',
          type: 'SELF-REPORTED',
          method: '300 performers and users, 25 agencies and brands'
        },
        {
          label: '700 to 800 Prospects',
          type: 'SELF-REPORTED',
          method: 'Direct user outreach'
        },
        {
          label: 'About 500 Waitlist',
          type: 'SELF-REPORTED',
          method: 'Pre-launch waitlist database export'
        },
        {
          label: '25 to 30 Brands Confirmed',
          type: 'SELF-REPORTED',
          method: 'Pre-launch onboarding confirmations across India'
        }
      ]
    },
    links: {
      githubUrl: '[TODO]',
      liveUrl: '[TODO]'
    },
    image: '/projects/stageconnect.svg'
  },
  {
    id: 'kgh-platform',
    title: 'KGH platform',
    summary:
      'A custom e-commerce and appointment-booking site for the client Kathuria Gun House, delivered in 2 months.',
    status: 'Live',
    statusColor: 'text-emerald-400 border-emerald-400/30 bg-emerald-500/10',
    role: 'Product lead and engineer (intern at MeharSoft)',
    timeframe: 'May to Jul 2025',
    stack: [
      'Next.js',
      'PostgreSQL',
      'Prisma',
      'AWS (EC2, Lambda, CloudWatch)',
      'Razorpay'
    ],
    whyBuilt:
      'The client needed an online store and appointment booking on a fixed deadline and a tight budget. I led it: client calls, UI/UX, feature planning, and a team of 5 to 6 interns.',
    whatIBuilt:
      'An online store with Razorpay payments, appointment booking and homepage reviews.',
    decisions: [
      {
        decision:
          'Picked hosting and database for cost: compared Hostinger and the AWS free tier, and used managed cloud PostgreSQL.',
        why: "The client's budget was tight; this gave them a 6-month free runway before paid usage."
      },
      {
        decision:
          'Made appointments cost Rs 500, credited against the product price (about Rs 5,000) if they buy.',
        why: 'The client asked for a change because people were booking time with the CEO and not buying.'
      },
      {
        decision: "Showed only genuine users' reviews on the homepage.",
        why: 'To build trust with first-time buyers.'
      },
      {
        decision:
          'Assigned and sequenced features across the interns and relayed client changes mid-project.',
        why: 'Two months left no room for rework.'
      }
    ],
    whatHappened: {
      text:
        'Live and used by the client since launch; they are happy. They get more purposeful calls and fewer no-purchase enquiries.',
      evidenceChips: [
        {
          label: '2-Month Delivery',
          type: 'SELF-REPORTED',
          method: 'Contract and delivery timeline sign-off'
        },
        {
          label: 'Fewer No-Purchase Calls',
          type: 'SELF-REPORTED',
          method: 'Client inquiry logs and feedback'
        },
        {
          label: '500+ users & ~25% faster API queries [TODO]',
          type: 'SELF-REPORTED',
          method: 'Optional, only if true',
          isTodo: true
        }
      ],
      todos: [
        '[TODO: confirm client is okay with live link]',
        '[TODO optional, only if true: 500+ users, about 25% faster API queries from indexing.]'
      ]
    },
    links: {
      liveUrl: 'https://buyairgunsindia.in',
      liveLabel: 'Live site',
      githubUrl: 'https://github.com/Avadhoot1905/KGH',
      githubLabel: 'Team repository'
    },
    image: '/projects/kgh-platform.svg'
  },
  {
    id: 'license-verification',
    title: 'License Verification Automation',
    summary: 'Automation that checks customers\' licenses against a government portal.',
    status: '[TODO: in use by the client?]',
    statusColor: 'text-amber-400 border-amber-400/30 bg-amber-500/10',
    role: 'Builder (at MeharSoft, for the KGH client)',
    timeframe: '[TODO]',
    stack: [
      'Python',
      'OpenCV',
      'Tesseract',
      'Playwright/Selenium',
      'Pandas',
      'SQLite',
      'Tkinter',
      'Next.js',
      'Power BI'
    ],
    whyBuilt:
      "While building the store I saw the client's staff check every license by hand: open the government portal, solve a captcha, compare the details, and type the result into Excel. Nobody asked me to fix it. It was slowing them down.",
    whatIBuilt:
      'A tool that reads license documents with OCR, extracts the details, checks them against the portal, updates their Excel records, and tracks verification status in a dashboard.',
    decisions: [
      {
        decision:
          'Used OCR with OpenCV preprocessing and regex parsing instead of a trained model.',
        why: 'The fastest dependable way to ship for a fixed document format. I am considering a CNN-based reader as a next step.'
      },
      {
        decision: 'Left the captcha as the one manual step.',
        why: 'Government portal compliance and avoiding automated captcha bypass.'
      },
      {
        decision:
          'Built a desktop app first (Tkinter, packaged as an executable), then rebuilt it as a Next.js web app.',
        why: '[TODO]',
        isTodo: true
      }
    ],
    whatHappened: {
      text:
        'Manual effort down about 80%. A Power BI dashboard tracks verification status, rejection rates and turnaround. Show only blurred or sample documents, never real customer data.',
      evidenceChips: [
        {
          label: 'Manual Effort Down ~80%',
          type: 'ESTIMATE',
          method: '[TODO: confirm with timing]'
        }
      ],
      todos: [
        '[TODO: in use by the client?]',
        '[TODO: confirm with timing]',
        '[TODO: reason for rebuilding Tkinter into Next.js web app]'
      ]
    },
    links: {
      githubUrl: '[TODO]'
    },
    image: '/assets/images/license2.png'
  },
  {
    id: 'finassist',
    title: 'FinAssist',
    summary:
      'A chatbot that answers American Express card questions with source links and confidence scores.',
    status: 'Demo',
    statusColor: 'text-cyan-400 border-cyan-400/30 bg-cyan-500/10',
    role: 'Solo builder',
    timeframe: '[TODO]',
    stack: [
      'Python',
      'FastAPI',
      'React',
      'TypeScript',
      'FAISS',
      'Sentence Transformers (MiniLM)',
      'Gemini 2.5 Flash',
      'Playwright',
      'Built with Gemini and Google Antigravity'
    ],
    whyBuilt:
      "I went to American Express's website with questions and there was no chatbot, and the site was cluttered. Someone less comfortable with websites would struggle to find answers or end up calling customer support for the basics.",
    whatIBuilt:
      'My first version re-crawled pages on every question, which was wasteful. I rebuilt it as a retrieval system (RAG) over official AmEx cardmember documents, with Gemini writing the answers.',
    decisions: [
      {
        decision: 'RAG over re-crawling.',
        why: 'Indexing documents once is faster and lets every answer cite its source.'
      },
      {
        decision: 'Added a Monte Carlo dropout confidence filter on retrieved chunks.',
        why:
          'Plain search returns the nearest chunks even when none are good matches. The filter rejects low-confidence context. It costs about 200 ms instead of about 5 ms, and I accepted that because wrong card advice can cost people money.'
      },
      {
        decision: 'Refuse to answer when no relevant context exists.',
        why: 'A refusal is better than an invented rule.'
      },
      {
        decision: 'Condensed follow-up questions into standalone queries.',
        why: "Questions like 'does that apply to Gold?' failed in search otherwise."
      },
      {
        decision:
          '[TODO: keep only if this was my reasoning] Kept scope to AmEx only, no bank-account sync, and re-crawling instead of fine-tuning because card terms change.',
        why: '[TODO]',
        isTodo: true
      }
    ],
    whatHappened: {
      text:
        'Precision@4 95%, MRR 1.0, faithfulness 90%, answer correctness about 82%, retrieval about 207 ms. What broke: AmEx pages render with JavaScript, so plain requests returned empty pages (fixed with Playwright); free-tier API limits blocked evaluation runs (fixed by running retrieval metrics offline). Known limit: the confidence filter is a heuristic, not a true uncertainty estimate.',
      evidenceChips: [
        {
          label: 'Precision@4 95%',
          type: 'MEASURED',
          method: 'Automated evaluation benchmark'
        },
        {
          label: 'MRR 1.0',
          type: 'MEASURED',
          method: 'Automated evaluation benchmark'
        },
        {
          label: 'Faithfulness 90%',
          type: 'MEASURED',
          method: 'Automated evaluation benchmark'
        },
        {
          label: 'Answer Correctness ~82%',
          type: 'MEASURED',
          method: 'Automated evaluation benchmark'
        },
        {
          label: 'Retrieval ~207 ms',
          type: 'MEASURED',
          method: 'Versus ~5 ms for plain search'
        }
      ],
      brokenAndFixed:
        'AmEx pages render with JavaScript, so plain requests returned empty pages (fixed with Playwright); free-tier API limits blocked evaluation runs (fixed by running retrieval metrics offline).',
      knownLimit:
        'The confidence filter is a heuristic, not a true uncertainty estimate.'
    },
    links: {
      githubUrl: 'https://github.com/Ojasvi777/FinAssist-rag-finance-assistant-',
      githubLabel: 'View on GitHub'
    },
    image: '/assets/images/finassist1.png'
  },
  {
    id: 'cropsky-ml',
    title: 'CropSky ML models',
    summary:
      'Two models that help farmers choose crops and catch crop diseases early.',
    status: 'Shipped to the startup',
    statusColor: 'text-purple-400 border-purple-400/30 bg-purple-500/10',
    role: 'AI/ML intern at a VIT-TBI agritech startup',
    timeframe: 'Sep to Oct 2024',
    stack: ['Python', 'scikit-learn', 'XGBoost', 'CNN', 'Pandas'],
    whyBuilt:
      "Farmers struggle to spot crop disease early, and beginners don't know which crop suits their plot.",
    whatIBuilt:
      'A crop-recommendation model using soil, temperature and environment sensor data (XGBoost), and a CNN that detects crop disease from images. I worked on both models and cleaned 10K+ agricultural samples.',
    decisions: [
      {
        decision:
          '[TODO: one decision I made, for example why XGBoost for sensor data and a CNN for images]',
        why: '[TODO]',
        isTodo: true
      }
    ],
    whatHappened: {
      text:
        '94.24% accuracy for crop recommendation and 92.6% for disease detection. Both shipped to the startup.',
      evidenceChips: [
        {
          label: '94.24% Crop Rec Accuracy',
          type: 'MEASURED',
          method: 'Measured test evaluation'
        },
        {
          label: '92.6% Disease Detection',
          type: 'MEASURED',
          method: 'Measured CNN test evaluation'
        }
      ],
      todos: [
        '[TODO: one decision I made, for example why XGBoost for sensor data and a CNN for images, and why]',
        '[TODO: dataset and test split.]'
      ]
    },
    links: {
      githubUrl: '[TODO]'
    },
    image: '/projects/cropsky.svg'
  },
  {
    id: 'global-energy',
    title: 'Global Energy Trends Dashboard',
    summary: 'Forecasts and trends for energy use across 200+ countries.',
    status: 'Complete',
    statusColor: 'text-indigo-400 border-indigo-400/30 bg-indigo-500/10',
    role: 'Solo',
    timeframe: '[TODO]',
    stack: ['Python', 'SQL (SQLite)', 'Statsmodels', 'ARIMA', 'Power BI'],
    whyBuilt:
      'I wanted to understand how energy patterns differ by country, energy type, GDP and imports and exports, using Our World in Data.',
    whatIBuilt:
      'A cleaned dataset (the raw data was messy and noisy), a regression and ARIMA forecasts, and an interactive Power BI dashboard.',
    decisions: [
      {
        decision: 'Separated country rows from regional totals.',
        why: "So totals aren't mixed up with individual countries."
      },
      {
        decision: 'Interpolated only short data gaps.',
        why: 'To avoid inventing long stretches of data.'
      },
      {
        decision: 'Used both a regression and ARIMA.',
        why: '[TODO]',
        isTodo: true
      }
    ],
    whatHappened: {
      text:
        '10K+ records, 200+ countries, 1965 to 2023. Regression out-of-sample R-squared about 0.87. ARIMA forecasts for major economies with mean MAPE about 6.5%. 11 datasets exported to Power BI.',
      evidenceChips: [
        {
          label: '10K+ Records (200+ Countries)',
          type: 'MEASURED',
          method: '1965 to 2023 cleaned database'
        },
        {
          label: 'Regression R² ~0.87',
          type: 'MEASURED',
          method: 'Out-of-sample R-squared'
        },
        {
          label: 'Mean MAPE ~6.5%',
          type: 'MEASURED',
          method: 'ARIMA forecasts for major economies'
        }
      ],
      todos: ['[TODO: reason for using both regression and ARIMA]']
    },
    links: {
      githubUrl: '[TODO]'
    },
    image: '/projects/global-energy.svg'
  },
  {
    id: 'perplexity-teardown',
    title: 'Perplexity Product Teardown',
    summary:
      'A teardown of Perplexity\'s search experience and a proposal called Evidence-first Answers.',
    status: 'Concept (not built)',
    statusColor: 'text-rose-400 border-rose-400/30 bg-rose-500/10',
    role: 'Independent',
    timeframe: '2026',
    stack: ['[TODO]'],
    whyBuilt:
      'I wanted to understand why people trust or distrust answers from AI search tools, and what a product could do about it.',
    whyBuiltLabel: 'Why I did it',
    whatIBuilt:
      'Studied user journeys, answer quality, citations, freshness and positioning. Proposed Evidence-first Answers: each factual claim is mapped to a supporting source passage, and partially supported, conflicting or unverified claims are flagged. Wrote the PRD, user stories, MVP scope and technical workflow.',
    whatIBuiltLabel: 'What I did',
    decisions: [
      {
        decision:
          'Weighed verification accuracy against response speed, inference cost and user trust.',
        why: 'Balancing user wait time against ungrounded hallucination risk.'
      },
      {
        decision:
          'Defined success metrics: claim-support precision, unsupported-claim rate, time-to-verified-answer.',
        why: 'To measure whether factual grounding actually improves trust without unacceptable latency.'
      }
    ],
    whatHappened: {
      text:
        'A 4-query exploratory test (factual, technical, comparative, time-sensitive) showed a freshness gap: one answer acknowledged a newer 2026 estimate but did not give the figure. This is a concept and a PRD, not a shipped product.',
      evidenceChips: [
        {
          label: '4-Query Exploratory Test',
          type: 'MEASURED',
          method: 'Factual, technical, comparative, time-sensitive queries'
        },
        {
          label: 'Freshness Gap Documented',
          type: 'MEASURED',
          method: '2026 estimate acknowledgement evaluation'
        }
      ],
      todos: [
        '[TODO: user observation sessions, if done.]',
        '[TODO: PRD link]'
      ]
    },
    links: {
      prdUrl: '[TODO]',
      prdLabel: 'PRD'
    },
    image: '/projects/calendar-teardown.svg'
  }
];
