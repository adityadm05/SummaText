import networkx as nx
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import Dict, Any

from ..preprocessor import preprocess

def summarize(text: str, num_sentences: int) -> Dict[str, Any]:
    """
    TextRank graph-based extractive summarizer.
    """
    preprocessed = preprocess(text)
    sentences = preprocessed["sentences"]
    
    if not sentences or num_sentences <= 0:
        return {"summary": "", "selected_sentences": [], "method": "textrank"}
        
    if num_sentences > len(sentences):
        num_sentences = len(sentences)
        
    try:
        vectorizer = TfidfVectorizer(stop_words='english')
        tfidf_matrix = vectorizer.fit_transform(sentences)
    except ValueError:
        selected = [{"text": s, "score": 0.0, "original_index": i} for i, s in enumerate(sentences[:num_sentences])]
        summary = " ".join(s["text"] for s in selected)
        return {"summary": summary, "selected_sentences": selected, "method": "textrank"}
        
    similarity_matrix = cosine_similarity(tfidf_matrix, tfidf_matrix)
    nx_graph = nx.from_numpy_array(similarity_matrix)
    
    try:
        scores = nx.pagerank(nx_graph)
    except Exception:
        scores = {i: 0.0 for i in range(len(sentences))}
        
    sentence_scores = []
    for i, sentence in enumerate(sentences):
        sentence_scores.append({"text": sentence, "score": float(scores.get(i, 0.0)), "original_index": i})
        
    sorted_sentences = sorted(sentence_scores, key=lambda x: x["score"], reverse=True)
    selected_sentences = sorted_sentences[:num_sentences]
    
    selected_sentences = sorted(selected_sentences, key=lambda x: x["original_index"])
    summary_text = " ".join([s["text"] for s in selected_sentences])
    
    return {
        "summary": summary_text,
        "selected_sentences": selected_sentences,
        "method": "textrank"
    }
