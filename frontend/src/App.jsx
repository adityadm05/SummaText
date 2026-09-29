import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TextInput from './components/TextInput';
import Controls from './components/Controls';
import SummaryOutput from './components/SummaryOutput';
import Statistics from './components/Statistics';
import RougeEvaluator from './components/RougeEvaluator';
import { summarizeText } from './services/api';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [summaryResult, setSummaryResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('Frequency');
  const [selectedLength, setSelectedLength] = useState('Medium');
  const [activeTab, setActiveTab] = useState('summary');

  const handleGenerateSummary = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to summarize.');
      return;
    }

    setLoading(true);
    setError(null);
    setSummaryResult(null);

    // Map lengths to numerical values
    const lengthMap = { Short: 'short', Medium: 'medium', Detailed: 'detailed' };
    const methodMap = { Frequency: 'frequency', 'TF-IDF': 'tfidf', TextRank: 'textrank' };

    try {
      const result = await summarizeText(
        inputText,
        methodMap[selectedMethod],
        lengthMap[selectedLength]
      );
      setSummaryResult(result);
    } catch (err) {
      setError(err.message || 'An error occurred while generating the summary.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = () => {
    setInputText('');
    setSummaryResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-blue-100 font-sans text-slate-800">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm animate-fade-in">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {activeTab === 'summary' ? (
          <>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-4">
                <TextInput inputText={inputText} setInputText={setInputText} />
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <SummaryOutput 
                  summaryResult={summaryResult} 
                  loading={loading}
                  selectedMethod={selectedMethod}
                />
              </div>
            </div>
            
            <Controls 
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
              selectedLength={selectedLength}
              setSelectedLength={setSelectedLength}
              onGenerate={handleGenerateSummary}
              onClear={handleClearAll}
              loading={loading}
              hasInput={inputText.trim().length > 0}
            />
            
            {summaryResult && summaryResult.statistics && (
              <Statistics stats={summaryResult.statistics} processingTime={summaryResult.processing_time} />
            )}
          </>
        ) : (
          <RougeEvaluator />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
