import { useState } from 'react';

const SummaryOutput = ({ summaryResult, loading, selectedMethod }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (summaryResult?.summary) {
      navigator.clipboard.writeText(summaryResult.summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getWordCount = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).length;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col h-full border border-slate-100">
      <div className="flex justify-between items-center mb-3">
        <label className="font-bold text-lg text-slate-800 flex items-center gap-2">
          <span>✨</span> Generated Summary
        </label>
        
        {summaryResult && (
          <div className="flex gap-2">
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-medium flex items-center">
              ⏱️ {summaryResult.processing_time?.toFixed(2) || 0}s
            </span>
            <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-medium">
              {summaryResult.method || selectedMethod}
            </span>
          </div>
        )}
      </div>
      
      <div className="flex-grow w-full min-h-[300px] relative">
        {loading ? (
          <div className="absolute inset-0 bg-slate-50 border border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-500">
            <svg className="animate-spin h-8 w-8 text-indigo-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="font-medium animate-pulse">Analyzing and summarizing text...</p>
          </div>
        ) : summaryResult?.summary ? (
          <div className="absolute inset-0 bg-slate-50 border border-slate-200 rounded-lg p-4 overflow-auto text-slate-800 leading-relaxed animate-fade-in">
            {summaryResult.summary}
          </div>
        ) : (
          <div className="absolute inset-0 bg-slate-50 border border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400">
            <span className="text-4xl mb-3 opacity-50">📝</span>
            <p className="font-medium">Your summary will appear here</p>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-3 h-8">
        {summaryResult?.summary ? (
          <>
            <div className="text-xs text-slate-500 font-medium">
              <span>{getWordCount(summaryResult.summary)} words</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md font-medium transition-colors"
            >
              {copied ? (
                <><span>✅</span> Copied!</>
              ) : (
                <><span>📋</span> Copy to Clipboard</>
              )}
            </button>
          </>
        ) : (
          <div className="w-full"></div>
        )}
      </div>
    </div>
  );
};

export default SummaryOutput;
