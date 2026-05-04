import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getHistory, clearHistory } from '../utils/api'

export default function History() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    setHistory(getHistory())
  }, [])

  const handleClear = () => {
    clearHistory()
    setHistory([])
  }

  return (
    <div className="max-w-[900px] mx-auto px-8 pt-12 pb-20">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-10 gap-4 flex-wrap">
        <div>
          <span className="block text-[0.72rem] text-accent tracking-[0.1em] mb-2">// analysis history</span>
          <h1 className="font-display font-extrabold text-[2.2rem] tracking-[-0.03em] mb-1.5">Past Analyses</h1>
          <p className="text-text-secondary text-[0.88rem]">Your last {history.length} analyses, stored locally in your browser.</p>
        </div>
        {history.length > 0 && (
          <button
            onClick={handleClear}
            className="px-5 py-2.5 bg-transparent border border-[rgba(255,77,77,0.3)] text-[#ff6b6b] font-mono text-[0.8rem] rounded-base cursor-pointer transition-all duration-200 shrink-0 self-start hover:bg-[rgba(255,77,77,0.08)] hover:border-[#ff6b6b]"
          >
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 min-h-[400px] border border-dashed border-border-bright rounded-lg text-center px-12 py-12 text-text-muted">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 18h32" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M18 8v10M30 8v10" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M16 30h16M16 36h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <h3 className="font-display font-bold text-[1.1rem] text-text-secondary mt-2">No analyses yet</h3>
          <p className="text-[0.83rem]">Analyse your first SQL query to see history here.</p>
          <Link to="/analyse" className="mt-2 text-accent text-[0.83rem] no-underline hover:underline">
            Go to Analyser →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {history.map((item, i) => (
            <div
              key={item.id || i}
              className="bg-bg-card border border-border-dim rounded-lg px-6 py-5 transition-colors duration-200 flex flex-col gap-3 hover:border-border-bright"
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={
                      item.result?.syntax_valid
                        ? { background: '#00ff9d', boxShadow: '0 0 6px #00ff9d' }
                        : { background: '#ff4d4d', boxShadow: '0 0 6px #ff4d4d' }
                    }
                  />
                  <span className="text-[0.75rem] text-text-muted">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                  <span className="text-[0.7rem] text-text-secondary bg-bg-secondary border border-border-dim px-2 py-0.5 rounded-full">
                    {item.result?.query_type || 'SQL'}
                  </span>
                  <span className="text-[0.7rem] text-text-secondary bg-bg-secondary border border-border-dim px-2 py-0.5 rounded-full">
                    {item.result?.complexity || '—'}
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {['performance', 'security', 'readability'].map(k => (
                    <span
                      key={k}
                      className="text-[0.7rem] text-text-muted bg-bg-secondary border border-border-dim px-2 py-1 rounded-full capitalize"
                    >
                      {k.slice(0, 4)}: <strong className="text-accent">{item.result?.scores?.[k] ?? '?'}</strong>
                    </span>
                  ))}
                </div>
              </div>

              {item.result?.summary && (
                <p className="text-[0.83rem] text-text-secondary leading-relaxed">{item.result.summary}</p>
              )}

              <div className="bg-bg-secondary border border-border-dim rounded-base px-4 py-3 overflow-x-auto">
                <pre className="font-mono text-[0.78rem] text-text-muted whitespace-pre-wrap break-words">
                  {item.query?.slice(0, 200)}{item.query?.length > 200 ? '...' : ''}
                </pre>
              </div>

              {item.result?.anti_patterns?.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {item.result.anti_patterns.slice(0, 3).map((ap, j) => (
                    <span
                      key={j}
                      className="text-[0.7rem] text-warn bg-warn-dim border border-[rgba(255,107,53,0.2)] px-2.5 py-1 rounded-full"
                    >
                      ⚠ {ap.pattern}
                    </span>
                  ))}
                  {item.result.anti_patterns.length > 3 && (
                    <span className="text-[0.7rem] text-text-muted border border-border-dim px-2.5 py-1 rounded-full">
                      +{item.result.anti_patterns.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
