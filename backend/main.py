import time
import logging
import nltk
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import math

from models.schemas import (
    SummarizeRequest, SummarizeResponse, RougeRequest, RougeResponse, HealthResponse
)
from nlp.preprocessor import preprocess
from nlp.summarizers import frequency, tfidf, textrank
from nlp.evaluator import compute_statistics, compute_rouge_scores

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing NLP resources...")
    for pkg in ('punkt_tab', 'stopwords'):
        try:
            nltk.data.find(f'tokenizers/{pkg}' if 'punkt' in pkg else f'corpora/{pkg}')
        except LookupError:
            try:
                nltk.download(pkg, quiet=True)
            except Exception:
                pass
    logger.info("SummaText NLP Engine is ready.")
    yield

app = FastAPI(
    title="SummaText API",
    description="NLP-Based Intelligent Text Summarizer API",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # NOTE: Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", response_model=HealthResponse)
@app.get("/health", response_model=HealthResponse)
def health_check():
    """
    Health check endpoint returning available methods.
    """
    return HealthResponse(
        status="ok",
        version="1.0.0",
        methods_available=["frequency", "tfidf", "textrank"]
    )

@app.post("/api/summarize", response_model=SummarizeResponse)
def summarize_endpoint(request: SummarizeRequest):
    """
    Main summarization endpoint.
    """
    start_time = time.time()
    
    preprocessed = preprocess(request.text)
    total_sentences = preprocessed["sentence_count"]
    
    if total_sentences == 0:
        raise HTTPException(status_code=400, detail="Input text contains no valid sentences.")
        
    if request.summary_length == "short":
        num_sentences = max(1, math.ceil(total_sentences * 0.3))
    elif request.summary_length == "medium":
        num_sentences = max(min(2, total_sentences), math.ceil(total_sentences * 0.5))
    elif request.summary_length == "detailed":
        num_sentences = max(min(3, total_sentences), math.ceil(total_sentences * 0.7))
    else:
        raise HTTPException(status_code=400, detail="Invalid summary length.")
        
    if request.method == "frequency":
        result = frequency.summarize(request.text, num_sentences)
    elif request.method == "tfidf":
        result = tfidf.summarize(request.text, num_sentences)
    elif request.method == "textrank":
        result = textrank.summarize(request.text, num_sentences)
    else:
        raise HTTPException(status_code=400, detail="Invalid summarization method.")
        
    summary_text = result["summary"]
    
    stats = compute_statistics(request.text, summary_text)
    processing_time = time.time() - start_time
    
    return SummarizeResponse(
        summary=summary_text,
        method=result["method"],
        sentences=result["selected_sentences"],
        statistics=stats,
        processing_time=processing_time
    )

@app.post("/api/rouge", response_model=RougeResponse)
def rouge_endpoint(request: RougeRequest):
    """
    ROUGE evaluation endpoint.
    """
    scores = compute_rouge_scores(request.reference, request.hypothesis)
    return RougeResponse(**scores)
