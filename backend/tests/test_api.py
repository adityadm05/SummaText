import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "frequency" in data["methods_available"]
    assert "tfidf" in data["methods_available"]
    assert "textrank" in data["methods_available"]

def test_api_summarize_frequency():
    payload = {
        "text": (
            "Artificial intelligence is transforming industries worldwide. "
            "Machine learning algorithms can identify patterns in vast datasets. "
            "Natural language processing enables machines to comprehend human speech. "
            "Computer vision allows automated systems to recognize objects in images. "
            "These advances are creating unprecedented opportunities for society."
        ),
        "method": "frequency",
        "summary_length": "medium"
    }
    response = client.post("/api/summarize", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "summary" in data
    assert len(data["summary"]) > 0
    assert data["method"] == "frequency"
    assert "statistics" in data
    assert data["statistics"]["original_word_count"] > 0
    assert data["statistics"]["summary_word_count"] > 0
    assert data["processing_time"] >= 0

def test_api_summarize_tfidf():
    payload = {
        "text": (
            "Cloud computing offers scalable resources over the global internet. "
            "Organizations migrate workloads to reduce on-premise infrastructure costs. "
            "Data centers provide redundancy, fault tolerance, and security protections. "
            "Serverless paradigms allow engineers to focus entirely on application logic. "
            "Modern cloud architectures rely heavily on containerization and orchestration."
        ),
        "method": "tfidf",
        "summary_length": "short"
    }
    response = client.post("/api/summarize", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["method"] == "tfidf"
    assert len(data["sentences"]) >= 1

def test_api_summarize_textrank():
    payload = {
        "text": (
            "Cybersecurity is essential for safeguarding modern digital communications. "
            "Threat actors deploy malware, ransomware, and phishing campaigns daily. "
            "Strong encryption algorithms protect data in transit and data at rest. "
            "Multi-factor authentication adds an imperative layer of access control. "
            "Regular security audits identify vulnerabilities before attackers exploit them."
        ),
        "method": "textrank",
        "summary_length": "detailed"
    }
    response = client.post("/api/summarize", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["method"] == "textrank"
    assert len(data["sentences"]) >= 1

def test_api_rouge():
    payload = {
        "reference": "Artificial intelligence and machine learning are revolutionizing technological applications.",
        "hypothesis": "Artificial intelligence and deep learning are transforming modern technological applications."
    }
    response = client.post("/api/rouge", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "rouge1" in data
    assert "rouge2" in data
    assert "rougeL" in data
    assert 0.0 <= data["rouge1"]["f"] <= 1.0
