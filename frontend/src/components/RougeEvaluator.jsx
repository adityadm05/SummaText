import { useState } from 'react';
import { computeRouge } from '../services/api';

const RougeEvaluator = () => {
  const [reference, setReference] = useState('');
  const [hypothesis, setHypothesis] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCompute = async () => {
    if (!reference.trim() || !hypothesis.trim()) {
      setError('Please provide both reference and candidate summaries.');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await computeRouge(reference, hypothesis);
      setResults(data);
    } catch (err) {
      setError(err.message || 'An error occurred while computing ROUGE scores.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setReference('');
    setHypothesis('');
    setResults(null);
    setError(null);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
          <span>⚖️</span> ROUGE Evaluator
        </h2>
        <p className="text-slate-600 mb-6 text-sm">
          ROUGE (Recall-Oriented Understudy for Gisting Evaluation) measures the overlap between a generated summary and a reference summary.
        </p>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-bold text-slate-700 text-sm">Reference Summary (Human-written)</label>
            <textarea
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Paste the reference summary here..."
              className="w-full min-h-[200px] p-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none text-slate-700 text-sm"
            />
          </div>
          
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-bold text-slate-700 text-sm">Candidate Summary (Generated)</label>
            <textarea
              value={hypothesis}
              onChange={(e) => setHypothesis(e.target.value)}
              placeholder="Paste the generated summary here..."
              className="w-full min-h-[200px] p-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none text-slate-700 text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleClear}
            disabled={loading}
            className="px-5 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50 text-sm"
          >
            Clear
          </button>
          <button
            onClick={handleCompute}
            disabled={loading || !reference.trim() || !hypothesis.trim()}
            className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm"
          >
            {loading ? 'Computing...' : 'Compute ROUGE Scores'}
          </button>
        </div>
      </div>

      {results && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100 animate-fade-in">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span>📊</span> Evaluation Results
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-3 px-4 font-bold text-slate-700">Metric</th>
                  <th className="py-3 px-4 font-bold text-slate-700">Precision (P)</th>
                  <th className="py-3 px-4 font-bold text-slate-700">Recall (R)</th>
                  <th className="py-3 px-4 font-bold text-slate-700">F1-Score (F)</th>
                </tr>
              </thead>
              <tbody>
                {['rouge1', 'rouge2', 'rougeL'].map((metric) => (
                  <tr key={metric} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {metric === 'rouge1' ? 'ROUGE-1' : metric === 'rouge2' ? 'ROUGE-2' : 'ROUGE-L'}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {(results[metric]?.p * 100).toFixed(2)}%
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {(results[metric]?.r * 100).toFixed(2)}%
                    </td>
                    <td className="py-3 px-4 text-indigo-700 font-bold">
                      {(results[metric]?.f * 100).toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RougeEvaluator;
