const Controls = ({ 
  selectedMethod, 
  setSelectedMethod, 
  selectedLength, 
  setSelectedLength, 
  onGenerate, 
  onClear,
  loading,
  hasInput
}) => {
  const methods = ['Frequency', 'TF-IDF', 'TextRank'];
  const lengths = [
    { label: 'Short', tooltip: '~30% length' },
    { label: 'Medium', tooltip: '~50% length' },
    { label: 'Detailed', tooltip: '~70% length' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
        
        {/* Method Selector */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold text-slate-700">Summarization Method</span>
          <div className="flex bg-slate-100 p-1 rounded-lg w-fit">
            {methods.map((method) => (
              <button
                key={method}
                onClick={() => setSelectedMethod(method)}
                className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${
                  selectedMethod === method
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-200'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* Length Selector */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold text-slate-700">Summary Length</span>
          <div className="flex bg-slate-100 p-1 rounded-lg w-fit">
            {lengths.map((len) => (
              <button
                key={len.label}
                onClick={() => setSelectedLength(len.label)}
                title={len.tooltip}
                className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${
                  selectedLength === len.label
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-200'
                }`}
              >
                {len.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
        <button
          onClick={onClear}
          disabled={loading}
          className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          Clear All
        </button>
        <button
          onClick={onGenerate}
          disabled={loading || !hasInput}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-indigo-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <span>✨</span> Generate Summary
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Controls;
