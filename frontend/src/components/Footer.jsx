const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 py-6 text-center mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <p className="font-semibold text-lg mb-1">SummaText — NLP-Based Intelligent Text Summarizer</p>
        <p className="text-sm text-slate-400">Built for 4th Year Engineering Project • {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
