# SummaText: Viva Questions and Answers

## Section A: Basic NLP Questions

**1. What is NLP?**
Natural Language Processing (NLP) is a branch of artificial intelligence that focuses on the interaction between computers and human language. Its goal is to enable computers to understand, interpret, and generate human language in a meaningful way. Applications include translation, sentiment analysis, and text summarization.

**2. What is text summarization?**
Text summarization is the process of distilling the most important information from a source text to produce an abridged version for a particular user or task. It aims to reduce the length of a document while retaining its core meaning and key concepts.

**3. Why is automatic text summarization important?**
With the massive explosion of digital data on the internet, it is impossible for humans to manually read and digest all relevant information. Automatic summarization helps combat information overload, saving time and improving productivity for researchers, professionals, and everyday readers.

**4. What is extractive summarization?**
Extractive summarization works by identifying the most important existing sentences or phrases in the source text and directly copying them to form a summary. It does not generate any new text; it merely extracts and reassembles exactly what was already written.

**5. What is abstractive summarization?**
Abstractive summarization involves understanding the semantics of a text and generating a novel summary that may contain new phrases and sentences not found in the original document. It is much closer to how humans summarize text but is computationally far more complex than extractive methods.

---

## Section B: Technical Concept Questions

**6. How does TF-IDF work? Explain the formula.**
TF-IDF calculates the importance of a word to a document within a corpus. Term Frequency (TF) is the count of a word in a document divided by total words. Inverse Document Frequency (IDF) is the logarithm of total documents divided by documents containing the word. Multiplying them (TF × IDF) gives a high score to words that are frequent in a specific document but rare globally, indicating they are key descriptive terms.

**7. How does TextRank work?**
TextRank models text as a graph where sentences are nodes and the similarity between sentences are edges. It applies a PageRank-like algorithm to this graph, iteratively voting on node importance. Sentences that are highly similar to many other important sentences receive higher centrality scores and are selected for the summary.

**8. What is the difference between TF-IDF and TextRank for summarization?**
TF-IDF is a statistical, frequency-based approach that evaluates sentence importance based on the presence of highly unique terms. TextRank is a graph-based approach that evaluates importance based on structural similarity and relationships between sentences. TF-IDF looks at word uniqueness, while TextRank looks at sentence centrality.

**9. What is tokenization? What types exist?**
Tokenization is the process of breaking text down into smaller, discrete units called tokens. The two main types are word tokenization (splitting a sentence into individual words) and sentence segmentation or tokenization (splitting a paragraph into distinct sentences). It is a foundational step in text preprocessing.

**10. What are stopwords and why do we remove them?**
Stopwords are highly common words in a language, such as "the", "is", "at", and "which". We remove them during preprocessing because they carry very little semantic meaning or analytical value. Removing them reduces the data size and prevents them from skewing the statistical scores in algorithms like TF-IDF or frequency counts.

**11. What is cosine similarity and how is it used in your project?**
Cosine similarity is a metric used to measure how similar two mathematical vectors are, regardless of their size, by calculating the cosine of the angle between them. In this project, it is used to calculate the similarity between sentence vectors (like TF-IDF vectors) and the overall document vector to determine relevance for scoring.

**12. What is ROUGE? Explain ROUGE-1, ROUGE-2, and ROUGE-L.**
ROUGE stands for Recall-Oriented Understudy for Gisting Evaluation. It evaluates automated summaries against human reference summaries. ROUGE-1 measures unigram (single word) overlap. ROUGE-2 measures bigram (two consecutive words) overlap. ROUGE-L measures the longest common subsequence, evaluating the structural similarity of sentences.

**13. What is compression ratio in summarization?**
Compression ratio is a metric that describes how much the original text was reduced in size. It is usually calculated as (1 - (summary length / original length)) * 100. For example, if a 1000-word text is summarized to 300 words, the compression ratio is 70%.

**14. What is the PageRank algorithm and how does TextRank use it?**
PageRank is Google's algorithm for ranking web pages based on hyperlink connections. TextRank adapts this by treating sentences as web pages and their similarity as hyperlinks. It iteratively calculates a score for each sentence based on the scores of the sentences it is "linked" to, finding the most central sentences in the text.

**15. What is sentence segmentation and why is it important?**
Sentence segmentation is the process of dividing a block of text into individual sentences. It is crucial for extractive summarization because the algorithm needs distinct, complete sentence units to score, rank, and extract to form the final summary.

---

## Section C: Architecture & Implementation Questions

**16. Why did you choose FastAPI over Flask/Django?**
FastAPI was chosen for its high performance, modern architecture, and native support for asynchronous programming. Crucially, it uses Python type hints via Pydantic for automatic data validation, and it automatically generates interactive OpenAPI documentation, which significantly speeds up development and testing.

**17. Why React with Vite instead of plain HTML/JS?**
React provides a component-based architecture that makes managing complex user interfaces and state (like switching between algorithms and updating statistics) much easier and more maintainable. Vite was used as the build tool because it is significantly faster than traditional bundlers like Webpack, offering instant server start and rapid hot module replacement.

**18. How does the frontend communicate with the backend?**
The frontend communicates with the backend via HTTP REST APIs. It sends a POST request containing a JSON payload (the input text and user settings) to the FastAPI endpoints. The backend processes the text and sends a JSON response back containing the summary and statistics, which the React app then renders.

**19. Explain the CORS configuration in your project.**
CORS (Cross-Origin Resource Sharing) is a security feature. Since the frontend (hosted on Vercel) and backend (hosted on Hugging Face Spaces) run on different domains, the browser will block requests by default. We configured CORS middleware in FastAPI to explicitly allow requests originating from the specific Vercel URL, permitting secure data transfer.

**20. Why didn't you train your own model?**
Training a novel abstractive summarization model requires massive datasets, significant computational resources (GPUs), and extensive time for fine-tuning. For this project, the goal was to demonstrate core NLP principles. Using established, un-parameterized extractive algorithms like TextRank and TF-IDF allowed us to build a robust system entirely locally without deep learning dependencies.

**21. What happens if the input text has only one sentence?**
If the input text consists of only a single sentence, the system bypasses the complex scoring algorithms. Since it is impossible to summarize one sentence via extraction, the API is programmed to catch this edge case and simply return the original sentence to avoid mathematical errors.

**22. How do you handle very long input text?**
The backend uses Pydantic validation to enforce a maximum character limit (e.g., 50,000 characters) to prevent server overload. For texts within the limit, the algorithms (like Frequency and TF-IDF) scale efficiently. The system processes them in a few seconds, though TextRank may take slightly longer due to the NxN matrix computation.

**23. Why do you preserve the original sentence order in the summary?**
Extractive summarizers rank sentences by importance, which randomizes their sequence. If we presented them in rank order, the summary would be disjointed and unreadable. By sorting the extracted sentences back into their original chronological order, we preserve the logical flow and narrative structure of the original document.

**24. Explain the role of Pydantic in your backend.**
Pydantic is a data validation library used extensively in FastAPI. We define Pydantic "Models" (Python classes) that specify the exact shape, types, and constraints of the data expected in API requests (e.g., text must be a string, length must be an integer). Pydantic automatically validates incoming JSON against these models and rejects bad requests.

**25. How does summary length control work in your system?**
The length control acts as a threshold multiplier. If the user selects a 30% summary length, the backend calculates the total number of sentences (e.g., 10). It then takes the top 30% (3 sentences) based on the computed NLP scores. This ensures the output scales proportionally to the input size.

---

## Section D: Project-Specific Questions

**26. Which summarization method gives the best results in your testing?**
While subjective, TextRank generally produces the most coherent and human-readable summaries because it evaluates how sentences connect to the broader context of the entire document. However, TF-IDF often performs best at extracting highly specific factual data points.

**27. What is the typical compression ratio your system achieves?**
The system is configurable, but by default, it targets a compression ratio of around 60% to 70%. This means the generated summary retains about 30% to 40% of the word count of the original text, providing a concise overview without stripping away necessary context.

**28. How fast does your system generate summaries?**
Because the system utilizes optimized libraries like scikit-learn and relies on math-based extractive algorithms rather than large neural networks, performance is very high. For a typical 500-1000 word article, all three algorithms generate a summary in under 1.5 seconds.

**29. How is your system deployed? Explain the architecture.**
The system utilizes a decoupled microservices architecture. The React frontend is deployed as a static site on Vercel's edge network for fast delivery. The FastAPI backend is containerized using Docker and deployed on Hugging Face Spaces, which provides a free Python runtime environment suitable for NLP tools.

**30. What is Hugging Face Spaces and why did you choose it?**
Hugging Face Spaces is a platform designed for hosting machine learning and NLP applications. It was chosen because it provides free, robust hosting specifically tailored for Python backends and AI tools. It seamlessly supports the Docker containers required to install dependencies like NLTK data.

**31. Why is your frontend on Vercel and backend on HF Spaces?**
Vercel is optimized for modern JavaScript frameworks like React, providing global CDN distribution and instant deployments for frontend code. Hugging Face Spaces is optimized for heavy Python workloads and ML libraries. Decoupling them allows each component to run on the infrastructure best suited for its specific language and processing requirements.

**32. What edge cases did you test for?**
We rigorously tested for empty inputs, extremely short inputs (single sentences), exceedingly long texts (stress testing), inputs containing non-standard Unicode characters or emojis, and inputs in languages other than English to ensure the backend throws graceful errors rather than crashing.

**33. What are the limitations of extractive summarization?**
The main limitation is that it cannot paraphrase or generate new sentences. It must use the exact phrasing from the original text, which can sometimes result in disjointed transitions or unresolved pronoun references (e.g., starting a sentence with "He did it" without context on who "He" is).

**34. How would you add abstractive summarization to your system?**
To add abstractive summarization, we would need to integrate a pre-trained Large Language Model (LLM) or transformer model, such as Hugging Face's BART or T5. We would load this model into the FastAPI backend and pass the input text to it for processing, requiring significantly more server RAM and compute power.

**35. If you had more time, what would you improve?**
If given more time, I would integrate abstractive summarization using transformer models. I would also add functionality to directly upload PDF or Word documents rather than relying on copy-pasting text. Finally, implementing user accounts to save summarization history and support for multiple languages would greatly enhance the application.
