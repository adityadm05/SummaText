from rouge_score import rouge_scorer
from typing import Dict, Any

from .preprocessor import preprocess

def compute_statistics(original_text: str, summary_text: str) -> Dict[str, Any]:
    """
    Computes text statistics and compression ratios.
    """
    orig_prep = preprocess(original_text)
    summ_prep = preprocess(summary_text)
    
    orig_words = orig_prep["word_count"]
    summ_words = summ_prep["word_count"]
    
    orig_sents = orig_prep["sentence_count"]
    summ_sents = summ_prep["sentence_count"]
    
    orig_chars = orig_prep["char_count"]
    summ_chars = summ_prep["char_count"]
    
    compression_ratio = 0.0
    if orig_chars > 0:
        compression_ratio = ((orig_chars - summ_chars) / orig_chars) * 100
        
    word_reduction_ratio = 0.0
    if orig_words > 0:
        word_reduction_ratio = ((orig_words - summ_words) / orig_words) * 100
        
    return {
        "original_word_count": orig_words,
        "summary_word_count": summ_words,
        "original_sentence_count": orig_sents,
        "summary_sentence_count": summ_sents,
        "original_char_count": orig_chars,
        "summary_char_count": summ_chars,
        "compression_ratio": round(compression_ratio, 2),
        "word_reduction_ratio": round(word_reduction_ratio, 2)
    }

def compute_rouge_scores(reference: str, hypothesis: str) -> Dict[str, Dict[str, float]]:
    """
    Compute ROUGE-1, ROUGE-2, ROUGE-L using the rouge-score library.
    """
    if not reference.strip() or not hypothesis.strip():
        empty_score = {"p": 0.0, "r": 0.0, "f": 0.0}
        return {
            "rouge1": empty_score.copy(),
            "rouge2": empty_score.copy(),
            "rougeL": empty_score.copy()
        }
        
    scorer = rouge_scorer.RougeScorer(['rouge1', 'rouge2', 'rougeL'], use_stemmer=True)
    scores = scorer.score(reference, hypothesis)
    
    return {
        "rouge1": {
            "p": round(scores['rouge1'].precision, 4),
            "r": round(scores['rouge1'].recall, 4),
            "f": round(scores['rouge1'].fmeasure, 4)
        },
        "rouge2": {
            "p": round(scores['rouge2'].precision, 4),
            "r": round(scores['rouge2'].recall, 4),
            "f": round(scores['rouge2'].fmeasure, 4)
        },
        "rougeL": {
            "p": round(scores['rougeL'].precision, 4),
            "r": round(scores['rougeL'].recall, 4),
            "f": round(scores['rougeL'].fmeasure, 4)
        }
    }
