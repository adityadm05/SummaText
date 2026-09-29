import re
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
import unicodedata
from typing import List, Dict, Any

def clean_text(text: str) -> str:
    """
    Remove extra whitespace, normalize unicode, strip HTML tags if any.
    """
    text = re.sub(r'<[^>]+>', '', text)
    text = unicodedata.normalize('NFKD', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def segment_sentences(text: str) -> List[str]:
    """
    Use NLTK sent_tokenize to split into sentences.
    """
    if not text.strip():
        return []
    return sent_tokenize(text)

def tokenize_words(text: str) -> List[str]:
    """
    Use NLTK word_tokenize.
    """
    if not text.strip():
        return []
    return word_tokenize(text)

def remove_stopwords(tokens: List[str]) -> List[str]:
    """
    Remove English stopwords using NLTK.
    """
    try:
        stop_words = set(stopwords.words('english'))
    except LookupError:
        nltk.download('stopwords', quiet=True)
        stop_words = set(stopwords.words('english'))
        
    return [token for token in tokens if token.lower() not in stop_words]

def preprocess(text: str) -> Dict[str, Any]:
    """
    Full pipeline that returns a dict with metadata.
    """
    cleaned_text = clean_text(text)
    sentences = segment_sentences(cleaned_text)
    words = tokenize_words(cleaned_text)
    
    return {
        "original_text": text,
        "cleaned_text": cleaned_text,
        "sentences": sentences,
        "word_count": len(words),
        "sentence_count": len(sentences),
        "char_count": len(cleaned_text)
    }
