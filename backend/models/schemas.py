from pydantic import BaseModel, Field
from typing import List, Literal, Dict

class SummarizeRequest(BaseModel):
    text: str = Field(..., min_length=50, max_length=50000, description="The input text to summarize")
    method: Literal['frequency', 'tfidf', 'textrank'] = Field(..., description="The summarization algorithm to use")
    summary_length: Literal['short', 'medium', 'detailed'] = Field(..., description="The length of the summary")

class SentenceInfo(BaseModel):
    text: str
    score: float
    original_index: int

class StatisticsResponse(BaseModel):
    original_word_count: int
    summary_word_count: int
    original_sentence_count: int
    summary_sentence_count: int
    original_char_count: int
    summary_char_count: int
    compression_ratio: float
    word_reduction_ratio: float

class SummarizeResponse(BaseModel):
    summary: str
    method: str
    sentences: List[SentenceInfo]
    statistics: StatisticsResponse
    processing_time: float

class RougeRequest(BaseModel):
    reference: str
    hypothesis: str

class RougeScoreDict(BaseModel):
    p: float
    r: float
    f: float

class RougeResponse(BaseModel):
    rouge1: RougeScoreDict
    rouge2: RougeScoreDict
    rougeL: RougeScoreDict

class HealthResponse(BaseModel):
    status: str
    version: str
    methods_available: List[str]
