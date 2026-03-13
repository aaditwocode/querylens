import React, { useState } from 'react'
import styles from './ResultPanel.module.css'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button className={styles.copyBtn} onClick={handleCopy}>
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
    high: { color: '#ff4d4d', bg: 'rgba(255,77,77,0.1)', label: 'HIGH' },
    medium: { color: '#ff9900', bg: 'rgba(255,153,0,0.1)', label: 'MEDIUM' },
    low: { color: '#fcd34d', bg: 'rgba(252,211,77,0.1)', label: 'LOW' },
    info: { color: '#7dd3fc', bg: 'rgba(125,211,252,0.1)', label: 'INFO' },
  }
  const s = map[level?.toLowerCase()] || map.info
  return (
    <span className={styles.severity} style={{ color: s.color, background: s.bg }}>
      {s.label}
    </span>
  )
}

export default function ResultPanel({ result }) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'issues', label: `Issues (${result.anti_patterns?.length || 0})` },
    { id: 'optimized', label: 'Optimized SQL' },
    { id: 'indexes', label: 'Indexes' },
  ]

  return (
    <div className={styles.panel}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <span className={result.syntax_valid ? styles.validBadge : styles.invalidBadge}>
            {result.syntax_valid ? (
              <><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Syntax Valid</>
            ) : (
              <><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> Syntax Error</>
            )}
          </span>
          <span className={styles.timestamp}>{new Date().toLocaleTimeString()}</span>
        </div>
        <h2 className={styles.headerTitle}>Analysis Complete</h2>
        {result.summary && (
          <p className={styles.headerSummary}>{result.summary}</p>
        )}
        {/* Score */}
        <div className={styles.scoreRow}>
          {[
            { label: 'Performance', value: result.scores?.performance ?? 0 },
            { label: 'Security', value: result.scores?.security ?? 0 },
            { label: 'Readability', value: result.scores?.readability ?? 0 },
          ].map(s => (
            <div key={s.label} className={styles.scoreItem}>
              <div className={styles.scoreLabel}>{s.label}</div>
              <div className={styles.scoreBar}>
                <div
                  className={styles.scoreBarFill}
                  style={{
                    width: `${s.value}%`,
                    background: s.value >= 70 ? 'var(--success)' : s.value >= 40 ? 'var(--warn)' : '#ff4d4d',
                  }}
                />
              </div>
              <div className={styles.scoreValue}>{s.value}/100</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {tabs.map(t => (
          <button
            key={t.id}
            className={`${styles.tab} ${activeTab === t.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Overview */}
        {activeTab === 'overview' && (
          <div className={styles.section}>
            {result.syntax_error && (
              <div className={styles.syntaxErr}>
                <strong>Syntax Error:</strong> {result.syntax_error}
              </div>
            )}
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Issues Found</span>
                <span className={styles.infoValue} style={{ color: result.anti_patterns?.length > 0 ? 'var(--warn)' : 'var(--success)' }}>
                  {result.anti_patterns?.length || 0}
                </span>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Index Recommendations</span>
                <span className={styles.infoValue}>{result.index_recommendations?.length || 0}</span>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Complexity</span>
                <span className={styles.infoValue}>{result.complexity || 'N/A'}</span>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Query Type</span>
                <span className={styles.infoValue}>{result.query_type || 'SELECT'}</span>
              </div>
            </div>
            {result.explanation && (
              <div className={styles.explainBlock}>
                <h4 className={styles.blockTitle}>AI Explanation</h4>
                <p className={styles.explainText}>{result.explanation}</p>
              </div>
            )}
          </div>
        )}

        {/* Issues */}
        {activeTab === 'issues' && (
          <div className={styles.section}>
            {(!result.anti_patterns || result.anti_patterns.length === 0) ? (
              <div className={styles.noIssues}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 16l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>No anti-patterns detected!</span>
              </div>
            ) : (
              <div className={styles.issuesList}>
                {result.anti_patterns.map((ap, i) => (
                  <div key={i} className={styles.issueCard}>
                    <div className={styles.issueTop}>
                      <span className={styles.issueTitle}>{ap.pattern}</span>
                      <SeverityBadge level={ap.severity} />
                    </div>
                    <p className={styles.issueDesc}>{ap.description}</p>
                    {ap.suggestion && (
                      <div className={styles.issueSuggestion}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
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
          <div className={styles.section}>
            {result.optimized_query ? (
              <div className={styles.codeBlock}>
                <div className={styles.codeHeader}>
                  <span className={styles.codeLang}>SQL</span>
                  <CopyButton text={result.optimized_query} />
                </div>
                <pre className={styles.codeContent}><code>{result.optimized_query}</code></pre>
              </div>
            ) : (
              <div className={styles.noIssues}>
                <span>No optimized query generated.</span>
              </div>
            )}
            {result.optimization_notes && (
              <div className={styles.explainBlock} style={{ marginTop: '1rem' }}>
                <h4 className={styles.blockTitle}>Optimization Notes</h4>
                <p className={styles.explainText}>{result.optimization_notes}</p>
              </div>
            )}
          </div>
        )}

        {/* Indexes */}
        {activeTab === 'indexes' && (
          <div className={styles.section}>
            {(!result.index_recommendations || result.index_recommendations.length === 0) ? (
              <div className={styles.noIssues}>
                <span>No index recommendations.</span>
              </div>
            ) : (
              <div className={styles.indexList}>
                {result.index_recommendations.map((idx, i) => (
                  <div key={i} className={styles.indexCard}>
                    <div className={styles.codeBlock}>
                      <div className={styles.codeHeader}>
                        <span className={styles.codeLang}>SQL</span>
                        <CopyButton text={idx.sql} />
                      </div>
                      <pre className={styles.codeContent}><code>{idx.sql}</code></pre>
                    </div>
                    {idx.reason && (
                      <p className={styles.indexReason}>{idx.reason}</p>
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
