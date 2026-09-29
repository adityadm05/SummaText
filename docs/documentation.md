# SummaText: NLP-Based Intelligent Text Summarizer

## Chapter 1 — Introduction

### Background
In the digital age, we are experiencing an unprecedented explosion of digital text. From news articles and academic papers to social media posts and corporate reports, the volume of textual data generated daily is staggering. This abundance of information has led to a phenomenon known as information overload, where individuals and organizations struggle to process and extract meaningful insights from the vast amounts of text available to them. 

### Problem Statement
Manually reading, analyzing, and summarizing long documents is an incredibly time-consuming and cognitively demanding task. Professionals, students, and researchers often find themselves spending hours sifting through lengthy texts to identify key information. Traditional methods of manual summarization are not scalable and often suffer from human bias, fatigue, and inconsistency. There is a critical need for automated solutions that can rapidly and accurately distill large volumes of text into concise summaries without losing the core message.

### Motivation
The primary motivation behind this project is to address the growing need for efficient and reliable automated summarization tools. By leveraging Natural Language Processing (NLP) techniques, we can create systems that understand the structure and semantics of text, enabling them to extract the most salient information automatically. Such tools can significantly enhance productivity, improve information retention, and facilitate faster decision-making across various domains, including academia, journalism, and business.

### Objectives
The main objective of this project is to build a robust, web-based intelligent text summarizer named **SummaText**. The specific objectives include:
1. Developing a web application with an intuitive user interface for text input and summary generation.
2. Implementing multiple extractive summarization algorithms, specifically Frequency-based, TF-IDF, and TextRank.
3. Providing users with the ability to control the length of the generated summary.
4. Integrating evaluation metrics, particularly ROUGE scores, to assess the quality of the summaries.
5. Displaying relevant statistics such as compression ratio, word counts, and processing time to offer transparency and insights into the summarization process.

### Scope
The scope of SummaText focuses exclusively on extractive text summarization, which involves selecting and compiling the most important existing sentences from the source text. The project encompasses the development of a complete web application, featuring a React-based frontend and a FastAPI-based backend. It includes the implementation of three distinct summarization algorithms and the integration of evaluation metrics. The application is designed to operate entirely locally, relying on established NLP libraries like NLTK, scikit-learn, and NetworkX, without dependencies on external AI APIs or cloud-based large language models.

---

## Chapter 2 — Literature Survey

### Natural Language Processing (NLP) and its Applications
Natural Language Processing (NLP) is an interdisciplinary field of computer science, artificial intelligence, and linguistics concerned with the interactions between computers and human (natural) languages. The ultimate goal of NLP is to read, decipher, understand, and make sense of human language in a valuable way. Applications of NLP are ubiquitous and include machine translation, sentiment analysis, speech recognition, chatbots, and text summarization.

### Text Summarization
Text summarization is the process of automatically generating a concise and meaningful summary of text from multiple text resources such as books, news articles, blog posts, research papers, emails, and tweets. The importance of text summarization lies in its ability to mitigate information overload by providing quick overviews of lengthy documents. Summarization techniques are broadly classified into two categories: extractive and abstractive.

### Extractive Summarization
Extractive summarization works by selecting the most important sentences or phrases from the original text and concatenating them to form a summary. This approach relies heavily on sentence selection and scoring methods to determine the salience of each sentence. It does not generate new text but rather extracts existing content, ensuring that the grammatical structure and original wording are preserved.

### Abstractive Summarization
Abstractive summarization involves understanding the main concepts in a document and generating a new, shorter text that conveys the most important information. This method can generate novel sentences and phrases not present in the original text, much like a human would. Techniques often involve complex deep learning architectures, such as Sequence-to-Sequence (seq2seq) models, attention mechanisms, and transformers. While SummaText focuses on extractive methods, understanding abstractive techniques provides a comprehensive view of the field.

### TF-IDF (Term Frequency - Inverse Document Frequency)
TF-IDF is a statistical measure used to evaluate the importance of a word to a document in a collection or corpus. 
- **Term Frequency (TF)** measures how frequently a term occurs in a document.
- **Inverse Document Frequency (IDF)** measures the importance of the term across a set of documents.
The intuition behind TF-IDF is that words occurring frequently in a specific document but rarely in the overall corpus are highly descriptive of that particular document.

### TextRank
TextRank is a graph-based ranking model for text processing, inspired by Google's PageRank algorithm. In the context of summarization, TextRank builds a graph where nodes represent sentences, and edges represent the similarity between sentences (often calculated using word overlap or cosine similarity). The algorithm iteratively updates the score of each sentence based on the scores of the sentences connected to it, identifying the most central or "important" sentences in the text.

### Word Frequency Approach
The word frequency approach is one of the simplest baseline methods for extractive summarization. It relies on the assumption that the most important words in a text are those that appear most frequently (excluding stopwords). Sentences containing a high number of these frequent words are deemed more important and are selected for the summary.

### Transformer-Based Models
Recent advancements in NLP are dominated by transformer-based models like BART, T5, and GPT. These models utilize self-attention mechanisms to process entire sequences of text simultaneously, capturing long-range dependencies effectively. They excel in abstractive summarization by pre-training on massive text corpora and fine-tuning on specific summarization tasks.

### ROUGE Evaluation Metric
ROUGE (Recall-Oriented Understudy for Gisting Evaluation) is a set of metrics used to evaluate automatic summarization and machine translation software. It works by comparing an automatically produced summary against a reference or human-produced summary.
- **ROUGE-1** measures the overlap of unigrams (single words).
- **ROUGE-2** measures the overlap of bigrams (two-word phrases).
- **ROUGE-L** measures the Longest Common Subsequence (LCS), taking into account sentence level structure similarity naturally.

### Existing Systems
Several text summarization tools exist in the market, including SummarizeBot, TLDR This, Scholarcy, and QuillBot. While these tools offer robust features, they often rely on proprietary models, lack transparency in their summarization methods, or require paid subscriptions for advanced features, highlighting the need for an open-source, multi-method educational tool like SummaText.

---

## Chapter 3 — System Analysis

### Existing System
The existing paradigm for text summarization often relies on manual summarization, where individuals read entire documents to extract key points. When automated tools are used, they are typically basic online summarizers that offer a single, opaque summarization method. These systems often act as "black boxes," providing a summary without any explanation of the underlying algorithm or the metrics used to evaluate its quality.

### Limitations of Existing Systems
The limitations of current, basic online summarization tools are significant. Firstly, they usually employ a single summarization technique, offering no flexibility or comparison options for the user. Secondly, they rarely provide evaluation metrics like ROUGE, making it impossible to gauge the quality of the generated summary objectively. Furthermore, these tools lack transparency; users do not know how sentences are selected, which diminishes trust in the system's output. Lastly, many advanced systems require paid subscriptions or API keys, limiting accessibility for students and researchers.

### Proposed System: SummaText
The proposed system, SummaText, addresses these limitations by offering a comprehensive, transparent, and multi-method approach to text summarization. SummaText integrates three distinct extractive summarization algorithms: Frequency-based, TF-IDF, and TextRank. This allows users to compare the outputs of different methods side-by-side. Additionally, the system provides a robust statistics dashboard and integrates ROUGE evaluation metrics, empowering users to objectively assess the summaries.

### Advantages
SummaText offers several distinct advantages over basic existing systems. It is free and open-source, requiring no API keys or subscriptions. It serves as an excellent educational tool, providing transparency into different NLP algorithms. The ability to compare multiple methods and view detailed statistics (such as compression ratio and processing time) makes it highly versatile. Furthermore, its modular architecture makes it easily deployable and extendable.

### Functional Requirements
- **Text Input**: The system must allow users to paste or input large blocks of text.
- **Method Selection**: Users must be able to select from three summarization algorithms: Frequency, TF-IDF, and TextRank.
- **Length Control**: Users must be able to specify the desired summary length (e.g., short, medium, detailed).
- **Summary Generation**: The system must process the text and return an extractive summary.
- **Statistics Display**: The system must calculate and display compression ratio, original word count, summary word count, and processing time.
- **ROUGE Evaluation**: The system must provide ROUGE-1, ROUGE-2, and ROUGE-L scores when a reference summary is provided.

### Non-Functional Requirements
- **Performance**: The system must generate summaries quickly, typically in under 5 seconds for standard document lengths.
- **Usability**: The web interface must be intuitive, responsive, and easy to navigate for non-technical users.
- **Reliability**: The backend must handle errors gracefully, such as empty inputs or unsupported characters, without crashing.
- **Scalability**: The modular design should allow for easy addition of new summarization algorithms or support for larger text volumes in the future.

---

## Chapter 4 — System Design

### System Architecture
The system architecture of SummaText follows a modern, decoupled client-server model. The User interacts with a Frontend application built with React, Vite, and Tailwind CSS, which is deployed on Vercel. The frontend sends HTTP requests containing the input text and configuration parameters to a Backend API. The backend, built with FastAPI and Python, is hosted on Hugging Face Spaces. The backend encompasses the NLP Engine, which processes the text using NLTK, scikit-learn, and NetworkX to generate the summary. The backend then formulates a JSON response containing the summary and statistics, which is sent back to the frontend for display.

### Data Flow
The data flow begins when the user submits text through the frontend interface. The text, along with selected parameters (method, length), is sent as a JSON payload to the backend via a POST request. Inside the backend, the text enters the NLP Pipeline. First, it undergoes preprocessing (cleaning, tokenization, stopword removal). Next, the cleaned text is passed to the selected scoring algorithm (Frequency, TF-IDF, or TextRank), which assigns a relevance score to each sentence. The selection module then picks the top-N sentences based on these scores and the desired summary length. Finally, the selected sentences are reassembled, statistics are calculated, and the resulting payload flows back to the frontend.

### Use Case Model
The primary actor in this system is the User. The core use cases include:
- **Input Text**: The user provides the source document.
- **Select Configuration**: The user chooses the summarization algorithm and desired length.
- **Generate Summary**: The user triggers the summarization process.
- **View Statistics**: The user views metrics such as compression ratio and processing time.
- **Evaluate Summary**: The user provides a reference text to view ROUGE scores.

### Component Design
The system is divided into logical components:
- **Frontend Components**: TextEditor (input field), Controls (dropdowns and sliders for configuration), SummaryView (display area), StatsDashboard (charts/metrics display), and ErrorHandler.
- **Backend Modules**: API Router (handles endpoints), RequestValidator (Pydantic models), Preprocessor (NLTK wrappers), SummarizerFactory (instantiates the chosen algorithm), and Evaluator (ROUGE calculation).
- **NLP Pipeline**: Dedicated classes for WordFrequencySummarizer, TFIDFSummarizer, and TextRankSummarizer, all inheriting from a common base class.

### NLP Pipeline Design
The internal NLP Pipeline follows a strict sequential process:
Input Text → Text Cleaning (removing special chars) → Sentence Segmentation (splitting into distinct sentences) → Word Tokenization (splitting sentences into words) → Stopword Removal (filtering out common words like 'the', 'is') → Scoring (applying the selected mathematical model) → Selection (ranking and filtering sentences) → Output Summary.

### Database Justification
SummaText is designed as a completely stateless application, meaning no database is required. The system processes input data on-the-fly and immediately returns the result. Since there are no user accounts, no need for persistent storage of past summaries, and no user-specific configurations to save, omitting a database significantly simplifies the architecture, reduces hosting costs, and improves privacy.

---

## Chapter 5 — Methodology

### Text Preprocessing Pipeline
The foundation of the extractive summarization process is robust text preprocessing.
1. **Text Cleaning**: The raw input text undergoes normalization, where excessive whitespace is reduced, and non-ASCII or problematic Unicode characters are handled to ensure consistency.
2. **Sentence Segmentation**: The text is split into an array of individual sentences using NLTK's `sent_tokenize`, which utilizes the Punkt sentence tokenizer model trained to recognize sentence boundaries effectively.
3. **Word Tokenization**: Each sentence is further broken down into individual words or tokens using NLTK's `word_tokenize`.
4. **Stopword Removal**: Common English words (e.g., "and", "the", "is") that carry little semantic weight are removed using NLTK's standard English stopwords corpus, reducing noise for the scoring algorithms.

### Frequency-Based Scoring
The Frequency-based method operates on the principle that sentences containing frequently occurring words are more significant. The algorithm calculates the frequency of each non-stopword in the entire document. These frequencies are often normalized by dividing by the maximum frequency to prevent bias towards extremely long documents. A sentence score is then computed by summing the normalized frequencies of the significant words it contains.

### TF-IDF Scoring
The TF-IDF (Term Frequency-Inverse Document Frequency) approach evaluates the importance of a word within a specific sentence relative to the entire document.
- **TF Formula**: TF(t,d) = count of term 't' in sentence 'd' / total words in sentence 'd'.
- **IDF Formula**: IDF(t) = log(Total number of sentences / number of sentences containing term 't').
- **TF-IDF**: TF-IDF(t,d) = TF(t,d) × IDF(t).
Using scikit-learn's `TfidfVectorizer`, we create a TF-IDF matrix for all sentences. The document's overall centroid is computed, and the cosine similarity between each sentence vector and the centroid vector determines the sentence's score.
- **Cosine Similarity**: (A·B) / (||A|| × ||B||)

### TextRank Scoring
TextRank models the text as a graph where nodes are sentences. Edges between nodes represent the similarity between two sentences, often calculated using word overlap or cosine similarity based on TF-IDF vectors. The algorithm builds an N×N similarity matrix. The PageRank algorithm is then applied to this graph. It iteratively updates the score of each node based on the sum of the scores of its neighboring nodes, weighted by the edge similarity. The process continues until convergence, yielding a final centrality score for each sentence.

### Sentence Selection and Formatting
Once every sentence has a score, the selection phase begins. The sentences are ranked in descending order of their scores. Based on the user-defined summary length parameter (e.g., selecting the top 30% of sentences), the top-N sentences are chosen. Crucially, before presenting the summary, these selected sentences are re-sorted back into their original chronological order as they appeared in the source text to maintain logical flow and coherence.

### Summary Length Control
The system implements a flexible length control mechanism, typically offering short (approx. 30% of original sentences), medium (50%), and detailed (70%) options. This percentage dictates the cutoff threshold 'N' during the sentence selection phase.

### ROUGE Evaluation
To objectively evaluate the quality of the generated summaries against a provided human reference summary, the system calculates ROUGE metrics.
- **ROUGE-N Formula**: (Σ count_match(n-gram)) / (Σ count(n-gram in reference))
- **ROUGE-1**: Measures the overlap of unigrams (individual words).
- **ROUGE-2**: Measures the overlap of bigrams, capturing basic phrasing.
- **ROUGE-L**: Measures the Longest Common Subsequence, evaluating sentence-level structural similarity.
Additionally, the system computes the **Compression Ratio**: (1 - summary_words/original_words) × 100%, indicating how much the original text was reduced.

---

## Chapter 6 — Implementation

### Frontend Implementation
The frontend of SummaText is developed using React, providing a dynamic and reactive user interface. Vite is used as the build tool, offering rapid hot-module replacement during development and optimized builds for production. The styling is managed using Tailwind CSS, a utility-first framework that allows for rapid UI development without writing custom CSS files. The application's state, including input text, selected parameters, and the received summary data, is managed using React hooks (`useState`, `useEffect`). Communication with the backend API is handled using the native `fetch` API or `axios`, asynchronously sending payloads and updating the UI state upon receiving the summarized data.

### Backend Implementation
The backend is powered by FastAPI, a modern, high-performance web framework for building APIs with Python based on standard Python type hints. FastAPI's automatic generation of OpenAPI documentation is leveraged for easy API exploration and testing. Route handlers process incoming POST requests at endpoints like `/summarize`. CORS (Cross-Origin Resource Sharing) middleware is heavily configured to ensure the frontend, hosted on a different domain, can securely communicate with the API. Request validation and serialization are strictly enforced using Pydantic models, ensuring that the backend receives well-formed data (e.g., ensuring text length is within bounds).

### NLP Preprocessing Integration
The Natural Language Toolkit (NLTK) is deeply integrated into the backend. During application startup, specific NLTK data packages (`punkt`, `stopwords`) are downloaded or verified to ensure they are available in the deployment environment. A dedicated `Preprocessor` class encapsulates the text cleaning pipeline, exposing clean, tokenized data structures to the various summarization algorithms.

### Summarization Algorithms Implementation
Each summarization algorithm is implemented as a distinct Python module.
- The **Frequency** method utilizes Python's built-in `collections.Counter` and NLTK's tokenizers to efficiently calculate word frequencies and assign sentence scores.
- The **TF-IDF** method relies on scikit-learn's `TfidfVectorizer` to transform sentences into a sparse matrix and `cosine_similarity` to compute relevance against the document centroid.
- The **TextRank** method utilizes NetworkX to build the sentence similarity graph. After computing pair-wise similarities, a graph is instantiated (`nx.from_numpy_array`), and `nx.pagerank` is executed to derive the final sentence scores.

### Evaluation and Error Handling
The `rouge-score` library is integrated to provide standardized implementation of the ROUGE metrics. When a user provides a reference summary, the backend routes the generated summary and the reference to an evaluator module. Comprehensive error handling is implemented across the API; exceptions during text processing or invalid inputs are caught and translated into meaningful HTTP error responses (e.g., 400 Bad Request, 422 Unprocessable Entity), ensuring the frontend can display appropriate error messages to the user.

### Deployment Strategy
The deployment strategy leverages modern PaaS (Platform as a Service) providers. The React frontend is deployed to Vercel, which offers seamless GitHub integration, continuous deployment, and global edge network delivery. The FastAPI backend is packaged and deployed to Hugging Face Spaces using a Docker container, providing a robust, free hosting environment suitable for Python-based NLP applications.

---

## Chapter 7 — Results

### Performance and Output Analysis
The implementation of SummaText yields robust and reliable results across a variety of textual inputs. As an example, when provided with a standard 500-word news article, the system successfully processes the text and returns summaries in under one second.

### Comparison of Methods
The distinct nature of the three algorithms produces noticeably different summaries.
- **Frequency-Based**: This method tends to perform best on highly focused texts where key terms are repeated frequently. It is consistently the fastest algorithm, making it suitable for rapid processing of very large documents.
- **TF-IDF**: This method offers a strong balance between processing speed and summary quality. It is particularly effective at identifying sentences that contain unique, highly descriptive terms that characterize the document, often yielding very informative summaries.
- **TextRank**: TextRank generally produces the most coherent and readable summaries. By analyzing the structural flow of the document through graph theory, it excels at selecting sentences that bridge different concepts, though it is marginally slower than the frequency method due to the graph computation overhead.

### Statistics and Metrics
The system's statistics dashboard accurately reflects the compression achieved. A "short" setting typically achieves a compression ratio of around 70% (reducing the text to 30% of its original length). Processing times remain consistently low, generally < 1.0 seconds for texts under 2000 words. When evaluating against human-written reference summaries, the ROUGE scores provide quantitative validation. Typical expected results for a well-structured document might show ROUGE-1 scores in the range of 0.40 - 0.55, indicating a strong overlap in vocabulary between the automated and human summaries.

---

## Chapter 8 — Testing

### Unit and Functional Testing
Comprehensive testing is crucial to ensure the reliability of the NLP pipeline. Unit testing is performed using the `pytest` framework in Python. Individual test suites are created for the text preprocessor to ensure stopwords are correctly removed and sentences are accurately segmented. Each summarizer class (Frequency, TF-IDF, TextRank) is unit-tested with predefined inputs to verify that the scoring algorithms function mathematically correctly. Functional testing of the API endpoints is conducted using the `httpx` library, simulating client requests and asserting that the API returns the correct JSON structures and HTTP status codes.

### Edge Case Handling
The system was rigorously tested against various edge cases to ensure stability.
- **Empty Input**: The API validates that input is not empty, returning a 400 Bad Request error.
- **Single Sentence**: If the input consists of only one sentence, the system bypasses complex scoring and returns the original text, as summarization is not applicable.
- **Very Long Text**: The system was stress-tested with texts exceeding 10,000 words. While processing time increases linearly, the backend remains stable without memory exhaustion.
- **Special Characters**: The text cleaning pipeline successfully handles emojis, non-ASCII characters, and unusual punctuation, preventing tokenizer crashes.
- **Non-English Text**: While optimized for English (due to the English stopword list), the system can process other languages structurally, though the semantic quality of the summary will degrade.

### Input Validation and Performance
Strict input validation is enforced using Pydantic. A minimum threshold of 50 characters ensures that there is enough context to summarize, while a maximum threshold (e.g., 50,000 characters) prevents malicious abuse of server resources. Performance testing indicates that response times scale efficiently; texts up to 5,000 words are processed in under 2 seconds, meeting the non-functional requirements for speed. Cross-browser testing confirmed that the React frontend renders correctly and maintains full functionality across Google Chrome, Mozilla Firefox, and Microsoft Edge.

---

## Chapter 9 — Advantages, Limitations & Future Scope

### Advantages
SummaText presents numerous advantages. It is entirely free and open-source, requiring no subscriptions or API keys, distinguishing it from many commercial products. By incorporating three distinct summarization methods, it allows users to compare results and select the most appropriate summary for their specific context. The inclusion of ROUGE evaluation and detailed statistics makes it highly transparent and serves as an excellent educational tool for understanding NLP concepts. Finally, its decoupled architecture makes it easy to deploy, maintain, and scale.

### Limitations
Despite its strengths, the system has several limitations inherent to its design. Firstly, it is purely an extractive summarizer; it cannot generate novel sentences or abstract concepts like a human or a large language model. Secondly, its reliance on an English stopword list and NLTK models limits its effectiveness to the English language. Currently, the system only supports raw text input via a text box, lacking the ability to directly parse file formats like PDF or DOCX. Furthermore, because it is a stateless application, there is no persistent storage or user history; once the page is refreshed, the summary is lost. Finally, deployment on free tiers (like Hugging Face Spaces) can result in a "cold start" delay if the application has been inactive for an extended period.

### Future Scope
The project provides a strong foundation for future enhancements. A primary goal for future iterations is the integration of abstractive summarization techniques, potentially utilizing lightweight Hugging Face transformer models (like T5-small or BART) to generate human-like summaries. Support for multiple languages can be added by integrating multilingual tokenizers and stopword lists. Expanding input capabilities to include document upload parsing (PDF, DOCX) and web page scraping via URLs would greatly enhance usability. Adding a database and authentication system would allow for user accounts, saving summary history, and personalized settings. Additionally, incorporating keyword extraction and topic modeling could provide users with an even richer analysis of their texts.

---

## Chapter 10 — Conclusion

In conclusion, the **SummaText** project successfully achieved its objective of developing a robust, web-based, intelligent text summarizer. By implementing and comparing three distinct extractive summarization algorithms—Frequency-based, TF-IDF, and TextRank—the project demonstrates a comprehensive application of foundational Natural Language Processing techniques. The resulting system effectively addresses the problem of information overload, providing users with a rapid, transparent, and evaluable method for condensing large volumes of text.

The project highlights the enduring relevance of extractive summarization methods, which offer significant advantages in terms of computational efficiency and factual consistency compared to complex generative models. The integration of ROUGE metrics and statistical analysis elevates the tool from a simple utility to a valuable educational resource, allowing users to objectively measure and understand the summarization process. Furthermore, the successful deployment of a decoupled architecture utilizing React, FastAPI, Vercel, and Hugging Face Spaces proves the viability of building high-performance, accessible NLP applications using modern open-source technologies. Ultimately, SummaText serves as a practical, scalable foundation for future exploration into advanced text analysis and abstractive summarization methodologies.

---

## References

1. Mihalcea, R., & Tarau, P. (2004). TextRank: Bringing Order into Texts. *Proceedings of EMNLP 2004*.
2. Luhn, H. P. (1958). The Automatic Creation of Literature Abstracts. *IBM Journal of Research and Development*, 2(2), 159-165.
3. Lin, C. Y. (2004). ROUGE: A Package for Automatic Evaluation of Summaries. *Text Summarization Branches Out*.
4. Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., ... & Polosukhin, I. (2017). Attention Is All You Need. *Advances in Neural Information Processing Systems*, 30.
5. Lewis, M., Liu, Y., Goyal, N., Ghazvininejad, M., Mohamed, A., Levy, O., ... & Zettlemoyer, L. (2020). BART: Denoising Sequence-to-Sequence Pre-training for Natural Language Generation, Translation, and Comprehension. *Proceedings of ACL*.
6. Devlin, J., Chang, M. W., Lee, K., & Toutanova, K. (2019). BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding. *Proceedings of NAACL-HLT*.
7. Page, L., Brin, S., Motwani, R., & Winograd, T. (1999). The PageRank Citation Ranking: Bringing Order to the Web. *Stanford InfoLab*.
8. Salton, G., & Buckley, C. (1988). Term-Weighting Approaches in Automatic Text Retrieval. *Information Processing & Management*, 24(5), 513-523.
9. NLTK Project. (n.d.). *Natural Language Toolkit Documentation*. Retrieved from https://www.nltk.org/
10. scikit-learn developers. (n.d.). *scikit-learn: Machine Learning in Python*. Retrieved from https://scikit-learn.org/
11. tiangolo. (n.d.). *FastAPI Documentation*. Retrieved from https://fastapi.tiangolo.com/
12. Meta Platforms, Inc. (n.d.). *React Documentation*. Retrieved from https://react.dev/
13. Nenkova, A., & McKeown, K. (2012). A Survey of Text Summarization Techniques. *Mining Text Data*, 43-76.
14. Erkan, G., & Radev, D. R. (2004). LexRank: Graph-based Lexical Centrality as Salience in Text Summarization. *Journal of Artificial Intelligence Research*, 22, 457-479.
