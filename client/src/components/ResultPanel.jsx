import React, { useState } from 'react'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-[0.72rem] text-text-muted bg-transparent border border-border-dim px-2 py-1 rounded cursor-pointer font-mono transition-all duration-200 hover:text-accent hover:border-accent"
    >
      {copied ? (
        <>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M8 4V2a1 1 0 00-1-1H2a1 1 0 00-1 1v5a1 1 0 001 1h2" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          Copy
        </>
      )}
    </button>
  )
}

function SeverityBadge({ level }) {
  const map = {
    high:   { color: '#ff4d4d', bg: 'rgba(255,77,77,0.1)',   label: 'HIGH' },
    medium: { color: '#ff9900', bg: 'rgba(255,153,0,0.1)',   label: 'MEDIUM' },
    low:    { color: '#fcd34d', bg: 'rgba(252,211,77,0.1)',  label: 'LOW' },
    info:   { color: '#7dd3fc', bg: 'rgba(125,211,252,0.1)', label: 'INFO' },
  }
  const s = map[level?.toLowerCase()] || map.info
  return (
    <span
      className="text-[0.65rem] px-2 py-0.5 rounded-full font-bold tracking-wider shrink-0"
      style={{ color: s.color, background: s.bg }}
    >
      {s.label}
    </span>
  )
}

export default function ResultPanel({ result }) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview',  label: 'Overview' },
    { id: 'issues',    label: `Issues (${result.anti_patterns?.length || 0})` },
    { id: 'optimized', label: 'Optimized SQL' },
    { id: 'indexes',   label: 'Indexes' },
  ]

  return (
    <div className="bg-bg-card border border-border-dim rounded-lg overflow-hidden animate-fade-up">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border-dim bg-[rgba(0,229,255,0.02)]">
        <div className="flex items-center justify-between mb-2.5">
          <span
            className={`inline-flex items-center gap-1.5 text-[0.72rem] px-2.5 py-1 rounded-full font-mono ${
              result.syntax_valid
                ? 'text-success bg-success-dim'
                : 'text-[#ff4d4d] bg-[rgba(255,77,77,0.1)]'
            }`}
          >
            {result.syntax_valid ? (
              <><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Syntax Valid</>
            ) : (
              <><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> Syntax Error</>
            )}
          </span>
          <span className="text-[0.7rem] text-text-muted">{new Date().toLocaleTimeString()}</span>
        </div>

        <h2 className="font-display font-extrabold text-xl tracking-tight mb-1.5">Analysis Complete</h2>
        {result.summary && (
          <p className="text-[0.82rem] text-text-secondary leading-relaxed mb-4">{result.summary}</p>
        )}

        {/* Scores */}
        <div className="flex flex-col gap-2">
          {[
            { label: 'Performance', value: result.scores?.performance ?? 0 },
            { label: 'Security',    value: result.scores?.security    ?? 0 },
            { label: 'Readability', value: result.scores?.readability ?? 0 },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="text-[0.72rem] text-text-muted w-[90px] shrink-0">{s.label}</div>
              <div className="flex-1 h-1 bg-border-bright rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-[width] duration-700"
                  style={{
                    width: `${s.value}%`,
                    background: s.value >= 70 ? '#00ff9d' : s.value >= 40 ? '#ff6b35' : '#ff4d4d',
                  }}
                />
              </div>
              <div className="text-[0.7rem] text-text-secondary w-12 text-right shrink-0">{s.value}/100</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border-dim overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-3 bg-transparent border-none border-b-2 font-mono text-[0.78rem] cursor-pointer transition-all duration-200 whitespace-nowrap shrink-0 ${
              activeTab === t.id
                ? 'text-accent border-b-accent bg-accent-dim !border-b-2'
                : 'text-text-muted border-b-transparent hover:text-text-secondary'
            }`}
            style={activeTab === t.id ? { borderBottomColor: '#00e5ff' } : { borderBottomColor: 'transparent' }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-6 py-5">
        {/* Overview */}
        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-4">
            {result.syntax_error && (
              <div className="px-4 py-3 bg-[rgba(255,77,77,0.08)] border border-[rgba(255,77,77,0.2)] rounded-base text-[0.82rem] text-[#ff6b6b]">
                <strong>Syntax Error:</strong> {result.syntax_error}
              </div>
            )}

            {/* NEW: Mathematical Cost Comparison Block */}
            {result.cost_metrics && (
              <div className="bg-bg-secondary border border-border-dim rounded-base p-4">
                <h4 className="font-display font-bold text-[0.8rem] text-text-secondary mb-3 uppercase tracking-wider">Calculated I/O Cost Analysis</h4>
                
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="flex flex-col bg-bg-card p-3 rounded border border-border-dim">
                    <span className="text-[0.65rem] text-warn uppercase tracking-wider">Original Cost</span>
                    <span className="font-display font-bold text-lg text-text-primary">{result.cost_metrics.original_cost_ms} ms</span>
                  </div>
                  <div className="flex flex-col bg-bg-card p-3 rounded border border-border-dim">
                    <span className="text-[0.65rem] text-success uppercase tracking-wider">Optimized Cost</span>
                    <span className="font-display font-bold text-lg text-text-primary">{result.cost_metrics.optimized_cost_ms} ms</span>
                  </div>
                  <div className="flex flex-col bg-[rgba(0,255,157,0.05)] p-3 rounded border border-[rgba(0,255,157,0.2)]">
                    <span className="text-[0.65rem] text-success uppercase tracking-wider">Improvement</span>
                    <span className="font-display font-bold text-lg text-success">-{result.cost_metrics.improvement_percentage}%</span>
                  </div>
                </div>
                
                <p className="text-[0.8rem] text-text-secondary leading-relaxed border-t border-border-dim pt-3">
                  <span className="font-bold text-accent">Heuristic Analysis: </span> 
                  {result.cost_metrics.cost_explanation}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {/* Keep the existing Complexity, Issues Found cards here */}
              <div className="bg-bg-secondary border border-border-dim rounded-base p-3.5 flex flex-col gap-1">
                <span className="text-[0.7rem] text-text-muted uppercase tracking-wider">Issues Found</span>
                <span
                  className="font-display font-bold text-xl tracking-tight"
                  style={{ color: result.anti_patterns?.length > 0 ? '#ff6b35' : '#00ff9d' }}
                >
                  {result.anti_patterns?.length || 0}
                </span>
              </div>
              <div className="bg-bg-secondary border border-border-dim rounded-base p-3.5 flex flex-col gap-1">
                <span className="text-[0.7rem] text-text-muted uppercase tracking-wider">Index Recommendations</span>
                <span className="font-display font-bold text-xl tracking-tight text-text-primary">{result.index_recommendations?.length || 0}</span>
              </div>
            </div>

            {result.explanation && (
              <div className="bg-bg-secondary border border-border-dim rounded-base p-4">
                <h4 className="font-display font-bold text-[0.8rem] text-text-secondary mb-2 uppercase tracking-wider">AI Explanation</h4>
                <p className="text-[0.83rem] text-text-secondary leading-relaxed whitespace-pre-wrap">{result.explanation}</p>
              </div>
            )}
          </div>
        )}

        {/* Issues */}
        {activeTab === 'issues' && (
          <div className="flex flex-col gap-4">
            {(!result.anti_patterns || result.anti_patterns.length === 0) ? (
              <div className="flex flex-col items-center gap-3 py-12 text-success text-sm">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 16l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>No anti-patterns detected!</span>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {result.anti_patterns.map((ap, i) => (
                  <div key={i} className="bg-bg-secondary border border-border-dim rounded-base p-4">
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <span className="font-display font-bold text-[0.88rem] text-text-primary">{ap.pattern}</span>
                      <SeverityBadge level={ap.severity} />
                    </div>
                    <p className="text-[0.8rem] text-text-secondary leading-relaxed mb-2">{ap.description}</p>
                    {ap.suggestion && (
                      <div className="flex items-start gap-1.5 text-[0.78rem] text-accent leading-relaxed">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5 shrink-0">
                          <path d="M6 1v7M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 11h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                        {ap.suggestion}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Optimized SQL */}
        {activeTab === 'optimized' && (
          <div className="flex flex-col gap-4">
            {result.optimized_query ? (
              <div className="bg-[#0a0a12] border border-border-bright rounded-base overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 border-b border-border-dim bg-white/[0.02]">
                  <span className="text-[0.7rem] text-text-muted tracking-wider">SQL</span>
                  <CopyButton text={result.optimized_query} />
                </div>
                <pre className="p-4 font-mono text-[0.82rem] leading-relaxed text-text-primary overflow-x-auto whitespace-pre">
                  <code>{result.optimized_query}</code>
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 py-12 text-text-muted text-sm">
                <span>No optimized query generated.</span>
              </div>
            )}
            {result.optimization_notes && (
              <div className="bg-bg-secondary border border-border-dim rounded-base p-4">
                <h4 className="font-display font-bold text-[0.8rem] text-text-secondary mb-2 uppercase tracking-wider">Optimization Notes</h4>
                <p className="text-[0.83rem] text-text-secondary leading-relaxed">{result.optimization_notes}</p>
              </div>
            )}
          </div>
        )}

        {/* Indexes */}
        {activeTab === 'indexes' && (
          <div className="flex flex-col gap-4">
            {(!result.index_recommendations || result.index_recommendations.length === 0) ? (
              <div className="flex flex-col items-center gap-3 py-12 text-text-muted text-sm">
                <span>No index recommendations.</span>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {result.index_recommendations.map((idx, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="bg-[#0a0a12] border border-border-bright rounded-base overflow-hidden">
                      <div className="flex items-center justify-between px-3 py-2 border-b border-border-dim bg-white/[0.02]">
                        <span className="text-[0.7rem] text-text-muted tracking-wider">SQL</span>
                        <CopyButton text={idx.sql} />
                      </div>
                      <pre className="p-4 font-mono text-[0.82rem] leading-relaxed text-text-primary overflow-x-auto whitespace-pre">
                        <code>{idx.sql}</code>
                      </pre>
                    </div>
                    {idx.reason && (
                      <p className="text-[0.78rem] text-text-secondary px-1">{idx.reason}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
