const TextInput = ({ inputText, setInputText }) => {
  const charCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  const sampleText = `Climate change is one of the most pressing issues of our time, affecting every corner of the globe. It refers to long-term shifts in temperatures and weather patterns, largely driven by human activities, particularly the emission of greenhouse gases like carbon dioxide and methane. These emissions trap heat in the Earth's atmosphere, leading to a gradual increase in global temperatures, commonly known as global warming. 

The consequences of climate change are far-reaching and severe. Melting ice caps and glaciers contribute to rising sea levels, posing a significant threat to coastal communities and island nations. Extreme weather events, such as hurricanes, droughts, and heatwaves, are becoming more frequent and intense, disrupting agriculture, water supplies, and ecosystems. Biodiversity is also at risk, as many species struggle to adapt to rapidly changing habitats. 

Addressing climate change requires a global, coordinated effort. Transitioning to renewable energy sources, such as solar and wind power, is crucial in reducing our reliance on fossil fuels. Improving energy efficiency in industries, buildings, and transportation can further curb emissions. Additionally, protecting and restoring forests, which act as vital carbon sinks, plays a critical role in mitigating climate change. 

While the challenges are immense, there is growing awareness and action worldwide. International agreements, like the Paris Agreement, aim to limit global warming and foster climate resilience. However, achieving these goals demands urgent and sustained commitment from governments, businesses, and individuals alike.`;

  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col h-full border border-slate-100">
      <div className="flex justify-between items-center mb-3">
        <label htmlFor="source-text" className="font-bold text-lg text-slate-800 flex items-center gap-2">
          <span>📄</span> Original Text
        </label>
        <div className="flex gap-2">
          <button 
            onClick={() => setInputText(sampleText)}
            className="text-xs bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-3 py-1.5 rounded-md font-medium transition-colors"
          >
            Paste Sample
          </button>
          {inputText && (
            <button 
              onClick={() => setInputText('')}
              className="text-xs text-slate-500 hover:text-red-500 px-2 py-1.5 rounded-md font-medium transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      
      <textarea
        id="source-text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste the article or text you want to summarize here..."
        className="flex-grow w-full min-h-[300px] p-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none text-slate-700"
        rows="12"
      />
      
      <div className="flex justify-end gap-4 mt-3 text-xs text-slate-500 font-medium">
        <span>{charCount} characters</span>
        <span>{wordCount} words</span>
      </div>
    </div>
  );
};

export default TextInput;
