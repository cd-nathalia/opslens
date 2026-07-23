import { useMemo, useRef, useState } from 'react';
import FeatureCard from './components/FeatureCard';
import ReportPanel from './components/ReportPanel';
import { analyzeInfrastructure } from './services/analysisApi';

function App() {
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const inputSize = useMemo(() => {
    const bytes = new Blob([content]).size + files.reduce((total, file) => total + file.size, 0);
    return bytes ? `${(bytes / 1024).toFixed(bytes < 1024 ? 1 : 0)} KB` : '0 KB';
  }, [content, files]);

  const addFiles = async (fileList) => {
    const accepted = Array.from(fileList).filter((file) => file.size <= 5 * 1024 * 1024);
    setFiles((current) => [...current, ...accepted]);
    const texts = await Promise.all(accepted.map((file) => file.text()));
    setContent((current) => [current, ...texts].filter(Boolean).join(current ? '\n\n' : ''));
  };

  const onDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files.length) await addFiles(event.dataTransfer.files);
  };

  const generate = async () => {
  if (!content.trim() && !files.length) return;

  setLoading(true);
  setError('');
  setReport(null);

  try {
    const nextReport = await analyzeInfrastructure({ content, files });
    setReport(nextReport);
  } catch (error) {
    console.error('Analysis failed:', error);
    setError(error.message || 'The analysis request failed.');
  } finally {
    setLoading(false);
  }
};

  const reset = () => { setContent(''); setFiles([]); setReport(null); };

  return (
    <main className="shell">
      <nav className="topbar">
        <a className="brand" href="#top" aria-label="OpsLens home"><span className="brand-mark">›_</span><span>OPSLENS</span></a>
        <div className="nav-actions"><span className="status-dot" /> <span>ANALYZER READY</span><button className="help" aria-label="Help">?</button></div>
      </nav>

      <section className="hero" id="top">
        <div className="eyebrow"><span /> INFRASTRUCTURE INTELLIGENCE</div>
        <h1>See what your stack<br />is trying to tell you.</h1>
        <p>Drop your configuration files and logs. Get a clear view of your infrastructure, risks, and what to do next.</p>
      </section>

      <section className="workspace" aria-label="Infrastructure analyzer">
        <div className="workspace-head">
          <div><span className="prompt">~/ops</span><span className="path">/analyze</span></div>
          <span className="input-size">{inputSize} loaded</span>
        </div>
        <div
          className={`drop-zone ${isDragging ? 'dragging' : ''}`}
          onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={(event) => { if (event.currentTarget === event.target) setIsDragging(false); }}
          onDrop={onDrop}
        >
          <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder={'Paste Docker Compose, Nginx, SSH config, system logs...\n\n# Any plain text works. You can combine multiple files or configs here.'} aria-label="Configuration and logs input" />
          {!content && !files.length && <div className="drop-hint"><div className="upload-icon">↥</div><strong>Drop files here</strong><span>or paste your configuration below</span></div>}
          <input ref={inputRef} className="file-input" type="file" multiple accept=".yml,.yaml,.conf,.log,.txt,.json,.env" onChange={(event) => addFiles(event.target.files)} />
        </div>
        {files.length > 0 && <div className="file-list">{files.map((file, index) => <span className="file-chip" key={`${file.name}-${index}`}>▧ {file.name}<button onClick={() => setFiles((current) => current.filter((_, i) => i !== index))} aria-label={`Remove ${file.name}`}>×</button></span>)}</div>}
        <div className="workspace-foot">
          <button className="browse" onClick={() => inputRef.current?.click()}>+ ADD FILES</button>
          <div className="action-group"><button className="clear" onClick={reset} disabled={!content && !files.length}>CLEAR</button><button className="analyze" onClick={generate} disabled={loading || (!content.trim() && !files.length)}>{loading ? 'ANALYZING...' : 'ANALYZE STACK'} <span>→</span></button></div>
        </div>
      </section>

      <section className="supported"><span>ACCEPTS</span><i /> Docker Compose <i /> Nginx <i /> SSH Config <i /> System Logs <i /> Environment Files</section>

      {report && <ReportPanel report={report} />}

      {!report && <section className="features">
        <FeatureCard number="01" icon="◎" title="Infrastructure overview" text="Understand services, dependencies, exposed ports, and how your stack fits together." />
        <FeatureCard number="02" icon="!" title="Security findings" text="Surface misconfigurations, exposed secrets, risky defaults, and missing hardening." />
        <FeatureCard number="03" icon="↗" title="Actionable next steps" text="Prioritized recommendations that help you address the highest-impact issues first." />
      </section>}

      {error && (
  <p className="error-message" role="alert">
    {error}
  </p>
)}

      <footer><span>OPSLENS <b>·</b> LOCAL ANALYSIS</span><span>Your data stays in your browser <em>●</em></span></footer>
    </main>
  );
}

export default App;
