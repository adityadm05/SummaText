const Statistics = ({ stats, processingTime }) => {
  if (!stats) return null;

  const cards = [
    {
      title: 'Original Words',
      value: stats.original_word_count || 0,
      icon: '📄',
      colorClass: 'bg-blue-50 text-blue-700 border-blue-100',
    },
    {
      title: 'Summary Words',
      value: stats.summary_word_count || 0,
      icon: '📉',
      colorClass: 'bg-green-50 text-green-700 border-green-100',
    },
    {
      title: 'Compression Ratio',
      value: stats.compression_ratio != null ? `${stats.compression_ratio.toFixed(1)}% reduced` : 'N/A',
      icon: '📊',
      colorClass: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    },
    {
      title: 'Original Sentences',
      value: stats.original_sentence_count || 0,
      icon: '📑',
      colorClass: 'bg-purple-50 text-purple-700 border-purple-100',
    },
    {
      title: 'Summary Sentences',
      value: stats.summary_sentence_count || 0,
      icon: '✅',
      colorClass: 'bg-teal-50 text-teal-700 border-teal-100',
    },
    {
      title: 'Processing Time',
      value: processingTime ? `${processingTime.toFixed(2)}s` : 'N/A',
      icon: '⏱️',
      colorClass: 'bg-amber-50 text-amber-700 border-amber-100',
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100 animate-fade-in mt-2">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <span>📈</span> Summary Statistics
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card, idx) => (
          <div key={idx} className={`p-4 rounded-lg border flex flex-col gap-1 ${card.colorClass}`}>
            <div className="flex items-center gap-2 text-sm font-semibold opacity-80">
              <span>{card.icon}</span> {card.title}
            </div>
            <div className="text-2xl font-black mt-1">
              {card.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
