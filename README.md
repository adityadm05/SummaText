# 📝 SummaText — NLP-Based Intelligent Text Summarizer

> A web-based text summarization application that demonstrates core NLP concepts through three extractive summarization algorithms. Built as a 4th-year Computer Engineering project.

![Python](https://img.shields.io/badge/Python-3.11-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌟 Features

- **Three Summarization Methods** — Compare results from Frequency-based, TF-IDF, and TextRank algorithms
- **Adjustable Summary Length** — Short (~30%), Medium (~50%), or Detailed (~70%) summaries
- **Real-time Statistics** — Word count, sentence count, compression ratio, processing time
- **ROUGE Evaluation** — Compute ROUGE-1, ROUGE-2, and ROUGE-L scores against reference summaries
- **Clean Modern UI** — Responsive React interface with Tailwind CSS
- **Zero API Cost** — Runs entirely on local NLP libraries, no external AI/API calls
- **Publicly Deployed** — Frontend on Vercel, Backend on Hugging Face Spaces

---

## 🏗️ Architecture

```
                    USER
                      │
                      ▼
            ┌──────────────────┐
            │  React Frontend  │  ← Vercel (HTTPS, CDN)
            │  Vite + Tailwind │
            └────────┬─────────┘
                     │ REST API (HTTPS)
                     ▼
            ┌──────────────────┐
            │  FastAPI Backend │  ← Hugging Face Spaces (Docker)
            └────────┬─────────┘
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
   ┌─────────┐ ┌─────────┐ ┌──────────┐
   │Frequency│ │ TF-IDF  │ │ TextRank │
   │  Based  │ │  Based  │ │  (Graph) │
   └─────────┘ └─────────┘ └──────────┘
        │            │            │
        └────────────┼────────────┘
                     ▼
            ┌──────────────────┐
            │   Evaluation &   │
            │   Statistics     │
            └──────────────────┘
```

---

## 🔬 NLP Methodology

### Summarization Pipeline

1. **Text Cleaning** — Whitespace normalization, unicode handling
2. **Sentence Segmentation** — NLTK Punkt tokenizer
3. **Word Tokenization** — NLTK word tokenizer
4. **Stopword Removal** — NLTK English stopwords corpus
5. **Sentence Scoring** — Using one of three methods:
   - **Frequency-Based**: Score sentences by normalized word frequency sums
   - **TF-IDF**: Score by cosine similarity to document centroid vector
   - **TextRank**: Graph-based PageRank scoring on sentence similarity graph
6. **Sentence Selection** — Top-N sentences preserving original order
7. **Evaluation** — Compression ratio, ROUGE scores

### Key NLP Concepts Demonstrated

| Concept | Implementation |
|---|---|
| Tokenization | NLTK `sent_tokenize`, `word_tokenize` |
| Stopword Removal | NLTK English stopwords |
| TF-IDF | scikit-learn `TfidfVectorizer` |
| Cosine Similarity | scikit-learn `cosine_similarity` |
| Graph-based Ranking | NetworkX PageRank |
| ROUGE Evaluation | `rouge-score` library |

---

## 💻 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Python 3.11 + FastAPI |
| NLP | NLTK + scikit-learn + NetworkX |
| Evaluation | rouge-score |
| Frontend Hosting | Vercel |
| Backend Hosting | Hugging Face Spaces (Docker) |

---

## 📁 Project Structure

```
NLP_MiniP/
├── backend/
│   ├── nlp/
│   │   ├── __init__.py
│   │   ├── preprocessor.py          # Text cleaning & tokenization
│   │   ├── evaluator.py             # Statistics & ROUGE scores
│   │   └── summarizers/
│   │       ├── __init__.py
│   │       ├── frequency.py         # Frequency-based summarizer
│   │       ├── tfidf.py             # TF-IDF based summarizer
│   │       └── textrank.py          # TextRank graph-based summarizer
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py               # Pydantic request/response models
│   ├── tests/
│   │   ├── __init__.py
│   │   └── test_summarizers.py      # Unit tests
│   ├── main.py                      # FastAPI application
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── TextInput.jsx
│   │   │   ├── SummaryOutput.jsx
│   │   │   ├── Controls.jsx
│   │   │   ├── Statistics.jsx
│   │   │   ├── RougeEvaluator.jsx
│   │   │   └── Footer.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
├── docs/
│   ├── documentation.md             # Full project documentation
│   ├── viva_questions.md            # 35 viva Q&A
│   └── deployment_guide.md          # Deployment instructions
├── screenshots/
├── README.md
├── .gitignore
└── .env.example
```

---

## 🚀 Local Installation

### Prerequisites

- Python 3.11+
- Node.js 18+
- Git

### Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Download NLTK data
python -c "import nltk; nltk.download('punkt_tab'); nltk.download('stopwords')"

# Run the server
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port | `8000` |
| `CORS_ORIGINS` | Allowed CORS origins | `http://localhost:5173` |
| `ENVIRONMENT` | Runtime environment | `development` |

### Frontend (`frontend/.env`)

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend API URL | `` (empty, uses Vite proxy in dev) |

---

## 📡 API Documentation

### Endpoints

#### `GET /health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "methods_available": ["frequency", "tfidf", "textrank"]
}
```

#### `POST /api/summarize`
Generate a text summary.

**Request Body:**
```json
{
  "text": "Your long text here...",
  "method": "textrank",
  "summary_length": "medium"
}
```

**Response:**
```json
{
  "summary": "Generated summary text...",
  "method": "textrank",
  "sentences": [
    {"text": "Selected sentence.", "score": 0.85, "original_index": 2}
  ],
  "statistics": {
    "original_word_count": 500,
    "summary_word_count": 150,
    "original_sentence_count": 20,
    "summary_sentence_count": 6,
    "original_char_count": 2800,
    "summary_char_count": 850,
    "compression_ratio": 70.0,
    "word_reduction_ratio": 70.0
  },
  "processing_time": 0.045
}
```

#### `POST /api/rouge`
Compute ROUGE scores between reference and candidate summaries.

**Request Body:**
```json
{
  "reference": "Reference summary text...",
  "hypothesis": "Generated summary text..."
}
```

**Response:**
```json
{
  "rouge1": {"precision": 0.65, "recall": 0.72, "f1": 0.68},
  "rouge2": {"precision": 0.45, "recall": 0.50, "f1": 0.47},
  "rougeL": {"precision": 0.60, "recall": 0.67, "f1": 0.63}
}
```

---

## 🌐 Deployment

### Frontend → Vercel
1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Set root directory to `frontend`
4. Set `VITE_API_URL` environment variable to backend URL
5. Deploy

### Backend → Hugging Face Spaces
1. Create new Space at [huggingface.co/spaces](https://huggingface.co/spaces)
2. Select Docker SDK
3. Push `backend/` contents to the Space repository
4. The Dockerfile handles everything automatically

See [Deployment Guide](docs/deployment_guide.md) for detailed instructions.

---

## 📊 Sample Results

| Metric | Short | Medium | Detailed |
|---|---|---|---|
| Compression Ratio | ~70% | ~50% | ~30% |
| Summary Sentences | ~30% of original | ~50% of original | ~70% of original |
| Processing Time | < 0.1s | < 0.1s | < 0.1s |

---

## 🔮 Future Scope

- Abstractive summarization using Hugging Face Transformers (BART/T5)
- Multi-language support
- PDF/DOCX file upload
- Keyword extraction and topic modeling
- User accounts and summary history
- Batch summarization
- Mobile application
- Browser extension

---

## 📚 Documentation

- [Full Project Documentation](docs/documentation.md)
- [Viva Questions & Answers](docs/viva_questions.md)
- [Deployment Guide](docs/deployment_guide.md)

---

## 👨‍💻 Contributors

- **Aditya** — Developer

---

## 📄 License

This project is developed for academic purposes as a 4th-year Computer Engineering project.

---

*Built with ❤️ using Python, React, and NLP*
