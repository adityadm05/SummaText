import string
from collections import defaultdict
from typing import Dict, Any, List

from ..preprocessor import preprocess, tokenize_words, remove_stopwords

def summarize(text: str, num_sentences: int) -> Dict[str, Any]:
    """
    Frequency-based extractive summarizer.
    Calculates normalized word frequencies and scores sentences based on their words.
    """
    preprocessed = preprocess(text)
    sentences = preprocessed["sentences"]
    
    if not sentences or num_sentences <= 0:
        return {"summary": "", "selected_sentences": [], "method": "frequency"}
        
    if num_sentences > len(sentences):
        num_sentences = len(sentences)
        
    words = tokenize_words(preprocessed["cleaned_text"])
    words = remove_stopwords(words)
    
    freq_table = defaultdict(int)
    for word in words:
        word_lower = word.lower()
        if word_lower not in string.punctuation:
            freq_table[word_lower] += 1
            
    if not freq_table:
        selected = [{"text": s, "score": 0.0, "original_index": i} for i, s in enumerate(sentences[:num_sentences])]
        summary = " ".join(s["text"] for s in selected)
        return {"summary": summary, "selected_sentences": selected, "method": "frequency"}
        
    max_freq = max(freq_table.values())
    for word in freq_table:
        freq_table[word] = freq_table[word] / max_freq
        
    sentence_scores = []
    for i, sentence in enumerate(sentences):
        sentence_words = tokenize_words(sentence)
        score = 0.0
        for word in sentence_words:
            word_lower = word.lower()
            if word_lower in freq_table:
                score += freq_table[word_lower]
        sentence_scores.append({"text": sentence, "score": score, "original_index": i})
        
    sorted_sentences = sorted(sentence_scores, key=lambda x: x["score"], reverse=True)
    selected_sentences = sorted_sentences[:num_sentences]
    selected_sentences = sorted(selected_sentences, key=lambda x: x["original_index"])
    
    summary_text = " ".join([s["text"] for s in selected_sentences])
    
    return {
        "summary": summary_text,
        "selected_sentences": selected_sentences,
        "method": "frequency"
    }
