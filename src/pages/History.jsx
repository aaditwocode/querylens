import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getHistory, clearHistory } from '../utils/api'
import styles from './History.module.css'

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
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <span className={styles.pageTag}>// analysis history</span>
          <h1 className={styles.pageTitle}>Past Analyses</h1>
          <p className={styles.pageSub}>Your last {history.length} analyses, stored locally in your browser.</p>
        </div>
        {history.length > 0 && (
          <button className={styles.clearBtn} onClick={handleClear}>
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className={styles.empty}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 18h32" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M18 8v10M30 8v10" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M16 30h16M16 36h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <h3>No analyses yet</h3>
          <p>Analyse your first SQL query to see history here.</p>
          <Link to="/analyse" className={styles.analyseLink}>Go to Analyser →</Link>
        </div>
      ) : (
        <div className={styles.list}>
          {history.map((item, i) => (
            <div key={item.id || i} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardMeta}>
                  <span className={item.result?.syntax_valid ? styles.validDot : styles.invalidDot} />
                  <span className={styles.cardTime}>
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                  <span className={styles.cardType}>{item.result?.query_type || 'SQL'}</span>
                  <span className={styles.cardComplexity}>{item.result?.complexity || '—'}</span>
                </div>
                <div className={styles.cardScores}>
                  {['performance', 'security', 'readability'].map(k => (
                    <span key={k} className={styles.scoreChip}>
                      {k.slice(0, 4)}: <strong>{item.result?.scores?.[k] ?? '?'}</strong>
                    </span>
                  ))}
                </div>
              </div>

              {item.result?.summary && (
                <p className={styles.cardSummary}>{item.result.summary}</p>
              )}

              <div className={styles.cardQuery}>
                <pre>{item.query?.slice(0, 200)}{item.query?.length > 200 ? '...' : ''}</pre>
              </div>

              {item.result?.anti_patterns?.length > 0 && (
                <div className={styles.cardIssues}>
                  {item.result.anti_patterns.slice(0, 3).map((ap, j) => (
                    <span key={j} className={styles.issueTag}>⚠ {ap.pattern}</span>
                  ))}
                  {item.result.anti_patterns.length > 3 && (
                    <span className={styles.moreTag}>+{item.result.anti_patterns.length - 3} more</span>
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
