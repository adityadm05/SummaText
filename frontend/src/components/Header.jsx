const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label="sparkles">✨📄</span>
          <div>
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              SummaText
            </h1>
            <p className="text-xs text-slate-500 font-medium tracking-wide">
              NLP-Based Intelligent Text Summarizer
            </p>
          </div>
        </div>
        
        <nav className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
              activeTab === 'summary'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-indigo-600'
            }`}
          >
            Summarizer
          </button>
          <button
            onClick={() => setActiveTab('rouge')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
              activeTab === 'rouge'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-indigo-600'
            }`}
          >
            Evaluator
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
