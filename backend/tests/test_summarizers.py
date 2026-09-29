import pytest
from nlp.preprocessor import clean_text, segment_sentences, tokenize_words, preprocess
from nlp.evaluator import compute_statistics, compute_rouge_scores
from nlp.summarizers import frequency, tfidf, textrank

SAMPLE_TEXT = """
Natural language processing (NLP) is an interdisciplinary subfield of computer science and linguistics. 
It is primarily concerned with the interactions between computers and human language, in particular how to program computers to process and analyze large amounts of natural language data. 
The goal is a computer capable of understanding the contents of documents, including the contextual nuances of the language within them. 
The technology can then accurately extract information and insights contained in the documents as well as categorize and organize the documents themselves.
Challenges in natural language processing frequently involve speech recognition, natural-language understanding, and natural-language generation.
"""

def test_preprocessor():
    cleaned = clean_text("  Hello  World! <br>  ")
    assert cleaned == "Hello World!"
    
    sentences = segment_sentences(SAMPLE_TEXT)
    assert len(sentences) == 5
    
    words = tokenize_words("Hello world!")
    assert len(words) == 3 # Hello, world, !
    
    prep = preprocess(SAMPLE_TEXT)
    assert prep["sentence_count"] == 5
    assert prep["word_count"] > 0
    assert prep["char_count"] > 0

def test_evaluator():
    stats = compute_statistics(SAMPLE_TEXT, "This is a short summary.")
    assert stats["original_sentence_count"] == 5
    assert stats["summary_sentence_count"] == 1
    assert stats["compression_ratio"] > 0
    assert stats["word_reduction_ratio"] > 0
    
    rouge = compute_rouge_scores("This is a test.", "This is a test.")
    assert rouge["rouge1"]["f"] == 1.0
    
    empty_rouge = compute_rouge_scores("", "")
    assert empty_rouge["rouge1"]["f"] == 0.0

def test_frequency_summarizer():
    result = frequency.summarize(SAMPLE_TEXT, 2)
    assert result["method"] == "frequency"
    assert len(result["selected_sentences"]) == 2
    assert len(result["summary"]) > 0
    
    indices = [s["original_index"] for s in result["selected_sentences"]]
    assert indices == sorted(indices)
    
def test_tfidf_summarizer():
    result = tfidf.summarize(SAMPLE_TEXT, 2)
    assert result["method"] == "tfidf"
    assert len(result["selected_sentences"]) == 2
    assert len(result["summary"]) > 0
    
    indices = [s["original_index"] for s in result["selected_sentences"]]
    assert indices == sorted(indices)

def test_textrank_summarizer():
    result = textrank.summarize(SAMPLE_TEXT, 2)
    assert result["method"] == "textrank"
    assert len(result["selected_sentences"]) == 2
    assert len(result["summary"]) > 0
    
    indices = [s["original_index"] for s in result["selected_sentences"]]
    assert indices == sorted(indices)
    
def test_edge_cases():
    res = frequency.summarize("", 2)
    assert res["summary"] == ""
    
    res = tfidf.summarize("This is just one sentence.", 2)
    assert len(res["selected_sentences"]) == 1
