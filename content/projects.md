# Projects

## 1. StageConnect
- Status: Pre-launch (waitlist)
- Role: Founder and CEO
- Timeframe: 2025 to present
- Stack: [TODO]
- Summary: A marketplace where brands, agencies and theatre groups find live-performance talent.
- Why I built it: I ran into the gap myself. There was no single place for people in live performance and the wider entertainment industry to find opportunities, and brands had no good way to find the right person. Before building, I studied 10+ existing platforms (Mandy, Backstage, Actors Access/Breakdown Services, CastKro, Dazzlerr, Casting Bay and others). Most were limited to actors and models, had weak reach, or left brands buried in applications.
- What I built: A platform where performers, agencies and brands sign up, brands post live-performance gigs, applicants are matched to the role, and everyone is verified.
- Decisions:
  - Narrowed from broad talent discovery to live-performance gigs. Why: every competitor offered the same broad directory and it wasn't working for brands.
  - Verify everyone who joins and back bookings with contracts. Why: people told me signed contracts weren't honored or were underpaid, and nothing verified who was real.
  - Build an applicant-to-role matching algorithm. Why: brands got too many applications through WhatsApp and email and couldn't find the right person.
- What happened: About 325 conversations (300 performers and users, 25 agencies and brands). Reached 700 to 800 prospects. About 500 joined the waitlist. 25 to 30 brands, agencies and theatre groups across India confirmed they will join at launch. Not launched yet. Performers said they will join once it is live; brands said their auditions sit scattered across WhatsApp and email on local devices.
- Links: GitHub [TODO]. Website [TODO].

## 2. KGH platform
- Status: Live
- Role: Product lead and engineer (intern at MeharSoft)
- Timeframe: May to Jul 2025
- Stack: Next.js, PostgreSQL, Prisma, AWS (EC2, Lambda, CloudWatch), Razorpay
- Summary: A custom e-commerce and appointment-booking site for the client Kathuria Gun House, delivered in 2 months.
- Why I built it: The client needed an online store and appointment booking on a fixed deadline and a tight budget. I led it: client calls, UI/UX, feature planning, and a team of 5 to 6 interns.
- What I built: An online store with Razorpay payments, appointment booking and homepage reviews.
- Decisions:
  - Picked hosting and database for cost: compared Hostinger and the AWS free tier, and used managed cloud PostgreSQL. Why: the client's budget was tight; this gave them a 6-month free runway before paid usage.
  - Made appointments cost Rs 500, credited against the product price (about Rs 5,000) if they buy. Why: the client asked for a change because people were booking time with the CEO and not buying.
  - Showed only genuine users' reviews on the homepage. Why: to build trust with first-time buyers.
  - Assigned and sequenced features across the interns and relayed client changes mid-project. Why: two months left no room for rework.
- What happened: Live and used by the client since launch; they are happy. They get more purposeful calls and fewer no-purchase enquiries. [TODO optional, only if true: 500+ users, about 25% faster API queries from indexing.]
- Links: Live site https://buyairgunsindia.in [TODO: confirm client is okay]. GitHub, label it 'Team repository': https://github.com/Avadhoot1905/KGH

## 3. License Verification Automation
- Status: [TODO: in use by the client?]
- Role: Builder (at MeharSoft, for the KGH client)
- Timeframe: [TODO]
- Stack: Python, OpenCV, Tesseract, Playwright/Selenium, Pandas, SQLite, Tkinter, Next.js, Power BI
- Summary: Automation that checks customers' licenses against a government portal.
- Why I built it: While building the store I saw the client's staff check every license by hand: open the government portal, solve a captcha, compare the details, and type the result into Excel. Nobody asked me to fix it. It was slowing them down.
- What I built: A tool that reads license documents with OCR, extracts the details, checks them against the portal, updates their Excel records, and tracks verification status in a dashboard.
- Decisions:
  - Used OCR with OpenCV preprocessing and regex parsing instead of a trained model. Why: the fastest dependable way to ship for a fixed document format. I am considering a CNN-based reader as a next step.
  - Left the captcha as the one manual step.
  - Built a desktop app first (Tkinter, packaged as an executable), then rebuilt it as a Next.js web app. Why: [TODO].
- What happened: Manual effort down about 80% [ESTIMATE, TODO: confirm with timing]. A Power BI dashboard tracks verification status, rejection rates and turnaround. Show only blurred or sample documents, never real customer data.
- Links: GitHub [TODO].

## 4. FinAssist
- Status: Demo
- Role: Solo builder
- Timeframe: [TODO]
- Stack: Python, FastAPI, React, TypeScript, FAISS, Sentence Transformers (MiniLM), Gemini 2.5 Flash, Playwright. Built with Gemini and Google Antigravity.
- Summary: A chatbot that answers American Express card questions with source links and confidence scores.
- Why I built it: I went to American Express's website with questions and there was no chatbot, and the site was cluttered. Someone less comfortable with websites would struggle to find answers or end up calling customer support for the basics.
- What I built: My first version re-crawled pages on every question, which was wasteful. I rebuilt it as a retrieval system (RAG) over official AmEx cardmember documents, with Gemini writing the answers.
- Decisions:
  - RAG over re-crawling. Why: indexing documents once is faster and lets every answer cite its source.
  - Added a Monte Carlo dropout confidence filter on retrieved chunks. Why: plain search returns the nearest chunks even when none are good matches. The filter rejects low-confidence context. It costs about 200 ms instead of about 5 ms, and I accepted that because wrong card advice can cost people money.
  - Refuse to answer when no relevant context exists. Why: a refusal is better than an invented rule.
  - Condensed follow-up questions into standalone queries. Why: questions like 'does that apply to Gold?' failed in search otherwise.
  - [TODO: keep only if this was my reasoning] Kept scope to AmEx only, no bank-account sync, and re-crawling instead of fine-tuning because card terms change.
- What happened: Precision@4 95%, MRR 1.0, faithfulness 90%, answer correctness about 82%, retrieval about 207 ms [MEASURED, automated eval]. What broke: AmEx pages render with JavaScript, so plain requests returned empty pages (fixed with Playwright); free-tier API limits blocked evaluation runs (fixed by running retrieval metrics offline). Known limit: the confidence filter is a heuristic, not a true uncertainty estimate.
- Links: GitHub https://github.com/Ojasvi777/FinAssist-rag-finance-assistant-

## 5. CropSky ML models
- Status: Shipped to the startup
- Role: AI/ML intern at a VIT-TBI agritech startup
- Timeframe: Sep to Oct 2024
- Stack: Python, scikit-learn, XGBoost, CNN, Pandas
- Summary: Two models that help farmers choose crops and catch crop diseases early.
- Why I built it: Farmers struggle to spot crop disease early, and beginners don't know which crop suits their plot.
- What I built: A crop-recommendation model using soil, temperature and environment sensor data (XGBoost), and a CNN that detects crop disease from images. I worked on both models and cleaned 10K+ agricultural samples.
- Decisions: [TODO: one decision I made, for example why XGBoost for sensor data and a CNN for images, and why].
- What happened: 94.24% accuracy for crop recommendation and 92.6% for disease detection [MEASURED]. Both shipped to the startup.
- Links: [TODO or hide, startup code may be private].

## 6. Global Energy Trends Dashboard
- Status: Complete
- Role: Solo
- Timeframe: [TODO]
- Stack: Python, SQL (SQLite), Statsmodels, ARIMA, Power BI
- Summary: Forecasts and trends for energy use across 200+ countries.
- Why I built it: I wanted to understand how energy patterns differ by country, energy type, GDP and imports and exports, using Our World in Data.
- What I built: A cleaned dataset (the raw data was messy and noisy), a regression and ARIMA forecasts, and an interactive Power BI dashboard.
- Decisions:
  - Separated country rows from regional totals. Why: so totals aren't mixed up with individual countries.
  - Interpolated only short data gaps. Why: to avoid inventing long stretches of data.
  - Used both a regression and ARIMA. Why: [TODO].
- What happened: 10K+ records, 200+ countries, 1965 to 2023. Regression out-of-sample R-squared about 0.87. ARIMA forecasts for major economies with mean MAPE about 6.5% [MEASURED]. 11 datasets exported to Power BI.
- Links: GitHub [TODO].

## 7. Perplexity Product Teardown
- Status: Concept (not built)
- Role: Independent
- Timeframe: 2026
- Stack: [TODO]
- Summary: A teardown of Perplexity's search experience and a proposal called Evidence-first Answers.
- Why I did it: I wanted to understand why people trust or distrust answers from AI search tools, and what a product could do about it.
- What I did: Studied user journeys, answer quality, citations, freshness and positioning. Proposed Evidence-first Answers: each factual claim is mapped to a supporting source passage, and partially supported, conflicting or unverified claims are flagged. Wrote the PRD, user stories, MVP scope and technical workflow.
- Decisions:
  - Weighed verification accuracy against response speed, inference cost and user trust.
  - Defined success metrics: claim-support precision, unsupported-claim rate, time-to-verified-answer.
- What happened: A 4-query exploratory test (factual, technical, comparative, time-sensitive) showed a freshness gap: one answer acknowledged a newer 2026 estimate but did not give the figure. This is a concept and a PRD, not a shipped product. [TODO: user observation sessions, if done.]
- Links: PRD [TODO]. No GitHub button.
