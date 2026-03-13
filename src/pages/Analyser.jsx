import React, { useState, useRef } from 'react'
import styles from './Analyser.module.css'
import { useAnalysis } from '../hooks/useAnalysis'
import ResultPanel from '../components/ResultPanel'
import Spinner from '../components/Spinner'

const EXAMPLE_SCHEMA = `CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_name VARCHAR(255),
  total DECIMAL(10,2),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

const EXAMPLE_QUERY = `SELECT * FROM orders, users
WHERE orders.user_id = users.id
AND orders.status = 'active'
ORDER BY orders.created_at DESC;`

export default function Analyser() {
  const [schema, setSchema] = useState('')
  const [query, setQuery]   = useState('')
  const [dbSize, setDbSize] = useState('medium')
  const { run, loading, result, error, phase, setResult, setError } = useAnalysis()
  const resultRef = useRef(null)

  const handleAnalyse = async () => {
    if (!query.trim()) {
      setError('Please enter a SQL query to analyse.')
      return
    }
    try {
      await run({ schema, query, dbSize })
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } catch (_) { /* error is set by hook */ }
  }

  const handleExample = () => {
    setSchema(EXAMPLE_SCHEMA)
    setQuery(EXAMPLE_QUERY)
    setResult(null)
    setError(null)
  }

  const handleClear = () => {
    setSchema('')
    setQuery('')
    setResult(null)
    setError(null)
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <span className={styles.pageTag}>// sql analyser</span>
        <h1 className={styles.pageTitle}>Analyse Your Query</h1>
        <p className={styles.pageSub}>Paste your database schema and SQL query below. No DB connection required.</p>
      </div>

      <div className={styles.workspace}>
        {/* ── LEFT: Inputs ── */}
        <div className={styles.inputCol}>

          {/* Schema */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelLabel}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M1 5h12" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M5 5v8" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
                Database Schema
              </span>
              <span className={styles.optional}>optional</span>
            </div>
            <textarea
              className={styles.codeInput}
              placeholder={"-- Paste your CREATE TABLE statements here\nCREATE TABLE users (\n  id INT PRIMARY KEY,\n  name VARCHAR(100)\n);"}
              value={schema}
              onChange={e => setSchema(e.target.value)}
              rows={10}
              spellCheck={false}
            />
          </div>

          {/* Query */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelLabel}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 3h10M2 7h6M2 11h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                SQL Query
              </span>
              <span className={styles.required}>required</span>
            </div>
            <textarea
              className={styles.codeInput}
              placeholder={"-- Write your SQL query here\nSELECT * FROM orders\nWHERE status = 'active';"}
              value={query}
              onChange={e => setQuery(e.target.value)}
              rows={10}
              spellCheck={false}
            />
          </div>

          {/* DB Size */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelLabel}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <ellipse cx="7" cy="4" rx="5" ry="2" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M2 4v6c0 1.1 2.24 2 5 2s5-.9 5-2V4" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M2 7c0 1.1 2.24 2 5 2s5-.9 5-2" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
                Estimated DB Size
              </span>
            </div>
            <div className={styles.sizeSelector}>
              {['small', 'medium', 'large', 'enterprise'].map(s => (
                <button
                  key={s}
                  className={`${styles.sizeBtn} ${dbSize === s ? styles.sizeBtnActive : ''}`}
                  onClick={() => setDbSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className={styles.sizeDesc}>
              {({
                small:      '< 10K rows — startup or dev environment',
                medium:     '100K–1M rows — typical production app',
                large:      '1M–100M rows — scaled application',
                enterprise: '100M+ rows — high-scale production system',
              })[dbSize]}
            </p>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.analyseBtn} onClick={handleAnalyse} disabled={loading}>
              {loading ? (
                <><Spinner size={16} />{phase || 'Analysing...'}</>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 12L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M5 7h4M7 5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Analyse Query
                </>
              )}
            </button>
            <button className={styles.secondaryBtn} onClick={handleExample} disabled={loading}>Load Example</button>
            <button className={styles.ghostActionBtn} onClick={handleClear} disabled={loading}>Clear</button>
          </div>

          {error && (
            <div className={styles.errorBox}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M7 4v3.5M7 9.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}
        </div>

        {/* ── RIGHT: Results ── */}
        <div className={styles.resultCol} ref={resultRef}>
          {!result && !loading && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="22" cy="22" r="14" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M36 36L31.5 31.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M16 22h12M22 16v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className={styles.emptyTitle}>Results appear here</h3>
              <p className={styles.emptyDesc}>
                Paste your schema and query on the left, then click <strong>Analyse Query</strong>.
              </p>
              <button className={styles.exampleLink} onClick={handleExample}>
                Try with an example →
              </button>
            </div>
          )}

          {loading && (
            <div className={styles.loadingState}>
              <div className={styles.loadingOrb} />
              <p className={styles.loadingPhase}>{phase}</p>
              <p className={styles.loadingSubtext}>Calling GenAI model for deep static analysis...</p>
            </div>
          )}

          {result && <ResultPanel result={result} />}
        </div>
      </div>
    </div>
  )
}
