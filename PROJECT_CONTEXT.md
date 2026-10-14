# SummaText — Comprehensive Project Context & Changelog

> **Project Name**: SummaText (NLP-Based Intelligent Text Summarizer)  
> **Academic Level**: 4th-Year Computer Engineering / Computer Science Capstone Project  
> **Repository**: [https://github.com/adityadm05/SummaText](https://github.com/adityadm05/SummaText)  
> **Default Branch**: `main`  
> **Cost Model**: 100% Free / ₹0 (Zero external paid APIs, 100% local NLP inference)  
> **Last Updated**: October 14, 2026

---

## 1. Executive Summary & Objective

**SummaText** is an end-to-end Natural Language Processing (NLP) web application designed to demonstrate the practical concepts of **Extractive Text Summarization**. 

The system accepts long-form articles, essays, or documents and distills them into concise summaries while preserving the most salient information. Unlike opaque black-box LLM wrappers, SummaText is built on **classical and mathematical NLP algorithms** that can be systematically explained, evaluated, and demonstrated during academic vivas and technical defenses.

### Key Capabilities:
1. **Three Extractive Algorithms**: Compare Word Frequency, TF-IDF Centroid Cosine Similarity, and Graph-based TextRank.
2. **Dynamic Length Control**: Short (~30%), Medium (~50%), and Detailed (~70%) compression settings.
3. **Real-Time Analytics**: Live character/word counts, sentence reduction stats, compression ratio, and execution latency.
4. **Interactive ROUGE Evaluation**: Dedicated tab to evaluate candidate summaries against human ground-truth references using **ROUGE-1**, **ROUGE-2**, and **ROUGE-L** metrics.
5. **Modern Decoupled Architecture**: High-speed React + Tailwind CSS frontend communicating with a high-performance Python FastAPI backend.

---

## 2. System Architecture & NLP Pipeline

```
                                      ┌─────────────────────────────────────┐
                                      │         User Browser (Web UI)       │
                                      │   React 19 + Vite + Tailwind CSS    │
                                      └──────────────────┬──────────────────┘
                                                         │ HTTP REST
                                                         ▼
                                      ┌─────────────────────────────────────┐
                                      │        FastAPI Backend Engine       │
                                      │         Uvicorn ASGI Server         │
                                      └──────────────────┬──────────────────┘
                                                         │
                        ┌────────────────────────────────┼────────────────────────────────┐
                        ▼                                ▼                                ▼
             ┌─────────────────────┐          ┌─────────────────────┐          ┌─────────────────────┐
             │   Text Cleaning &   │          │ Summarization Core  │          │ Evaluation Engine   │
             │   Tokenization      │          │                     │          │                     │
             │ • HTML & whitespace │          │ 1. Frequency Score  │          │ • Compression %     │
             │ • NLTK punkt_tab    │ ───────► │ 2. TF-IDF Centroid  │ ───────► │ • Word counts       │
             │ • Stopwords filter  │          │ 3. TextRank (Page-  │          │ • ROUGE-1/2/L       │
             │ • Sentence bounds   │          │    Rank / NetworkX) │          │ • Latency bench     │
             └─────────────────────┘          └─────────────────────┘          └─────────────────────┘
```

### The 7-Step NLP Pipeline:
1. **Input**: Raw text input from user (minimum 50 chars, up to 50,000 chars).
2. **Normalization & Cleaning**: Unicode normalization (NFKD), HTML tag removal via regex, multi-space collapse.
3. **Sentence Segmentation**: NLTK `sent_tokenize` using pre-compiled `punkt_tab` model.
4. **Word Tokenization & Stopword Elimination**: Case-insensitive filtering against English NLTK stopwords.
5. **Sentence Scoring**:
   - **Frequency**: Word counts normalized by highest frequency; sentence score = sum of word weights / sentence length.
   - **TF-IDF**: Sentence vectors formed with scikit-learn `TfidfVectorizer`. Document centroid calculated; sentence score = cosine similarity to document centroid vector.
   - **TextRank**: Pairwise cosine similarity matrix built across sentences. Represented as an undirected weighted NetworkX graph. Google PageRank algorithm run iteratively until convergence.
6. **Sentence Selection**: Highest scoring sentences selected based on requested ratio (30%, 50%, 70%) and **re-ordered into their original chronological index** to maintain discourse cohesion.
7. **Statistical & ROUGE Evaluation**: Evaluates character/word ratios and token n-gram overlap against gold standards.

---

## 3. Technology Stack & Rationale

| Layer | Technologies Selected | Justification |
|---|---|---|
| **Frontend** | React 19, Vite 8, Tailwind CSS v4 | Sub-second HMR dev, instant production builds (<1s), responsive utility-first UI without bloated component libraries. |
| **Backend** | Python 3.13, FastAPI, Uvicorn | Native async I/O, automatic Pydantic v2 data validation, built-in Swagger UI at `/docs`. |
| **NLP Engine** | NLTK 3.10, scikit-learn 1.9, NetworkX 3.7 | Zero API cost, no GPU needed, 100% reproducible math, runnable on standard low-spec CPU. |
| **Evaluation** | rouge-score 0.1.2 | Standard academic benchmark library used in research literature. |
| **Testing** | pytest 9.1, httpx (TestClient) | Automated verification of algorithmic correctness and endpoint reliability. |
| **Hosting** | Render Blueprint (`render.yaml`), Vercel, Docker | Free-tier compatible, 1-click reproducible cloud deployment. |

---

## 4. File-by-File Inventory

```
NLP_MiniP/
├── backend/
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py              # Pydantic v2 request/response schemas
│   ├── nlp/
│   │   ├── __init__.py
│   │   ├── evaluator.py            # Word counts, compression ratio, ROUGE scorer
│   │   ├── preprocessor.py         # Text cleaning, sentence & word tokenization
│   │   └── summarizers/
│   │       ├── __init__.py
│   │       ├── frequency.py        # Frequency salience algorithm
│   │       ├── textrank.py         # NetworkX PageRank algorithm
│   │       └── tfidf.py            # TF-IDF centroid similarity algorithm
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── test_api.py             # Integration tests for FastAPI endpoints
│   │   └── test_summarizers.py     # Unit tests for preprocessing & all 3 algorithms
│   ├── Dockerfile                  # Container definition for Hugging Face Spaces
│   ├── main.py                     # FastAPI application entry with lifespan management
│   ├── requirements.txt            # Python dependencies with Python 3.13 wheel bounds
│   └── .env.example                # Backend configuration template
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg             # App favicon
│   │   └── icons.svg               # SVG icons
│   ├── src/
│   │   ├── components/
│   │   │   ├── Controls.jsx        # Algorithm & length toggle buttons
│   │   │   ├── Footer.jsx          # Project attribution & metadata
│   │   │   ├── Header.jsx          # Header bar & tab navigation switcher
│   │   │   ├── RougeEvaluator.jsx  # Interactive ROUGE evaluator interface
│   │   │   ├── Statistics.jsx      # 6 responsive metric cards
│   │   │   ├── SummaryOutput.jsx   # Right workspace: output & copy to clipboard
│   │   │   └── TextInput.jsx       # Left workspace: textarea & sample text loader
│   │   ├── services/
│   │   │   └── api.js              # Fetch client with AbortController timeout
│   │   ├── App.css                 # Custom CSS keyframe animations
│   │   ├── App.jsx                 # Main stateful component
│   │   ├── index.css               # Tailwind CSS entrypoint
│   │   └── main.jsx                # React 19 root DOM bootstrap
│   ├── index.html                  # HTML entrypoint
│   ├── package.json                # Frontend dependencies & scripts
│   ├── package-lock.json           # Locked npm dependencies
│   ├── vercel.json                 # Vercel SPA rewrite rules
│   ├── vite.config.js              # Vite server & backend proxy configuration
│   ├── .gitignore                  # Frontend-specific ignore rules
│   └── .env.example                # Frontend environment template
│
├── docs/
│   ├── deployment_guide.md         # Comprehensive hosting manual (Render, Vercel, HF)
│   ├── documentation.md            # 10-chapter academic report (32 KB)
│   └── viva_questions.md           # 35 technical viva questions & answers (13 KB)
│
├── render.yaml                     # Render Blueprint for automated 1-click cloud deployment
├── README.md                       # Comprehensive GitHub repository landing page
├── PROJECT_CONTEXT.md              # Full context & historical changelog (this file)
└── .gitignore                      # Git exclusion rules (node_modules, venv, pycache)
```

---

## 5. Chronological Changelog & Work Done

### Phase 1: Architecture Selection & Setup
- **Decision**: Selected **Architecture C** (Three pure extractive algorithms: Word Frequency, TF-IDF Centroid, TextRank). This guarantees ₹0 cloud cost, eliminates API rate-limiting/token billing, and aligns directly with undergraduate NLP syllabus requirements.
- **Repository Setup**: Created root directory, established git tracking, and authored comprehensive `.gitignore` handling Python virtualenvs and Node builds.

### Phase 2: Backend NLP Engine Implementation
- **Preprocessing Module (`preprocessor.py`)**: Built text cleaner (regex normalization, unicode handling), NLTK sentence segmenter, and stopword filter.
- **Frequency Summarizer (`frequency.py`)**: Implemented word frequency counter, normalization by maximum term frequency, and sentence scoring.
- **TF-IDF Summarizer (`tfidf.py`)**: Implemented `TfidfVectorizer` sentence matrix calculation and cosine similarity scoring against the document centroid vector.
- **TextRank Summarizer (`textrank.py`)**: Implemented graph construction with NetworkX, cosine similarity edge weighting, and PageRank iterative scoring.
- **Evaluation Module (`evaluator.py`)**: Implemented character/word compression calculations and Google Research `rouge_score` bindings.
- **Pydantic Models (`schemas.py`)**: Designed strict schema contracts for request validation (`SummarizeRequest`, `RougeRequest`) and typed responses (`SummarizeResponse`, `RougeResponse`, `HealthResponse`).

### Phase 3: Critical Bug Fixes & Refinements
1. **Frontend Scaffolding Correction**:
   - *Issue*: `npm create vite@latest` defaulted to a vanilla TypeScript boilerplate with `main.ts` and `counter.ts`.
   - *Fix*: Purged TS boilerplate, installed `react`, `react-dom`, `@vitejs/plugin-react`, created [main.jsx](file:///c:/Users/Aditya/Desktop/NLP_MiniP/frontend/src/main.jsx), updated [index.html](file:///c:/Users/Aditya/Desktop/NLP_MiniP/frontend/index.html) to mount `<div id="root">`, and updated [package.json](file:///c:/Users/Aditya/Desktop/NLP_MiniP/frontend/package.json).
2. **API Contract Alignment**:
   - *Issue*: Frontend `App.jsx` was transmitting float ratios (`0.3`, `0.5`, `0.7`), whereas backend Pydantic schema required string literals (`'short'`, `'medium'`, `'detailed'`).
   - *Fix*: Updated `lengthMap` in [App.jsx](file:///c:/Users/Aditya/Desktop/NLP_MiniP/frontend/src/App.jsx) to pass `'short'`, `'medium'`, and `'detailed'`.
3. **Display Metric Alignment**:
   - *Issue*: Backend was already outputting percentages for reduction ratios; frontend was multiplying by 100 a second time.
   - *Fix*: Standardized [Statistics.jsx](file:///c:/Users/Aditya/Desktop/NLP_MiniP/frontend/src/components/Statistics.jsx) to display `stats.compression_ratio` directly.
4. **Python 3.13 Wheel Resolution**:
   - *Issue*: Pinned package `scikit-learn==1.5.0` had no prebuilt binary wheels for Python 3.13 on Windows, triggering an extensive source compilation.
   - *Fix*: Updated [requirements.txt](file:///c:/Users/Aditya/Desktop/NLP_MiniP/backend/requirements.txt) with compatible version bounds (`scikit-learn>=1.5.2`, `fastapi>=0.115.0`) allowing pip to install prebuilt wheels in seconds.
5. **Non-Blocking FastAPI Lifespan Handler**:
   - *Issue*: `@app.on_event("startup")` was deprecated and unconditional calls to `nltk.download('punkt')` caused network timeouts on startup.
   - *Fix*: Converted [main.py](file:///c:/Users/Aditya/Desktop/NLP_MiniP/backend/main.py) to modern `asynccontextmanager lifespan(app)`, checking for local corpora first without blocking server readiness.
6. **Render Blueprint Schema Fix (`render.yaml`)**:
   - *Issue*: Frontend static site was misconfigured as `type: web` with `runtime: static`.
   - *Fix*: Updated [render.yaml](file:///c:/Users/Aditya/Desktop/NLP_MiniP/render.yaml) to use `type: static`, removed invalid web service fields (`runtime`, `plan`, `region`), and added NLTK data downloads directly into the backend build step.

### Phase 4: Verification, Git Versioning & Remote Push
- **Automated Tests**: Authored [test_summarizers.py](file:///c:/Users/Aditya/Desktop/NLP_MiniP/backend/tests/test_summarizers.py) and [test_api.py](file:///c:/Users/Aditya/Desktop/NLP_MiniP/backend/tests/test_api.py). Verified that all 11 unit and integration tests pass with 100% success.
- **Frontend Build**: Verified production build using `npm run build` — compiled cleanly in 808 ms.
- **Git Commit & Push**: Committed all 44 repository files across 3 structured commits and pushed directly to `origin/main` on GitHub:
  - Commit `613a315`: *Initial commit: Complete SummaText NLP summarizer project*
  - Commit `25c9a5a`: *Add Render Blueprint (render.yaml) and Vercel routing (vercel.json)*
  - Commit `637dba4`: *Fix render.yaml: use type:static for frontend, add NLTK download to backend build step*
- **Remote Verification**: Confirmed `git diff origin/main` is 0 and branch is fully synchronized with GitHub.

---

## 6. How to Run Locally

### Start Backend Server:
```powershell
cd c:\Users\Aditya\Desktop\NLP_MiniP\backend
.\venv\Scripts\Activate.ps1
uvicorn main:app --reload --port 8000
```
* Interactive Swagger API Docs: `http://localhost:8000/docs`
* Health Endpoint: `http://localhost:8000/health`

### Start Frontend Dev Server:
```powershell
cd c:\Users\Aditya\Desktop\NLP_MiniP\frontend
npm run dev
```
* Application UI: `http://localhost:5173`

---

## 7. Cloud Deployment Checklist

### Deploy via Render (1-Click Blueprint)
1. Navigate to [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** ➔ **Blueprint**.
3. Connect repository: `https://github.com/adityadm05/SummaText`.
4. Render automatically reads `render.yaml` and launches both the backend and frontend on free-tier infrastructure.

### Deploy via Vercel (Frontend) + Hugging Face Spaces (Backend)
1. **Backend**: Push `backend/` to a new Docker Space at [huggingface.co/spaces](https://huggingface.co/spaces) using the included `Dockerfile`.
2. **Frontend**: Import the repo into [vercel.com](https://vercel.com), set root directory to `frontend`, set environment variable `VITE_API_URL` to your backend URL, and deploy.
