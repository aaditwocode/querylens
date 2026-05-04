import React, { useState, useRef } from 'react'
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
    <div className="max-w-[1400px] mx-auto px-8 pt-12 pb-20">
      {/* Page Header */}
      <div className="mb-10">
        <span className="block text-[0.72rem] text-accent tracking-[0.1em] mb-2">// sql analyser</span>
        <h1 className="font-display font-extrabold text-[2.2rem] tracking-[-0.03em] mb-2">Analyse Your Query</h1>
        <p className="text-text-secondary text-[0.9rem]">Paste your database schema and SQL query below. No DB connection required.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* ── LEFT: Inputs ── */}
        <div className="flex flex-col gap-4">

          {/* Schema Panel */}
          <div className="bg-bg-card border border-border-dim rounded-lg overflow-hidden transition-all duration-200 focus-within:border-border-bright focus-within:shadow-[0_0_0_3px_rgba(0,229,255,0.06)]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-dim bg-white/[0.02]">
              <span className="flex items-center gap-2 text-[0.78rem] text-text-secondary font-display font-semibold">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M1 5h12" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M5 5v8" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
                Database Schema
              </span>
              <span className="text-[0.65rem] text-text-muted border border-border-dim px-2 py-0.5 rounded-full">optional</span>
            </div>
            <textarea
              className="w-full bg-transparent border-none outline-none resize-y font-mono text-[0.82rem] text-text-primary p-4 leading-[1.7] min-h-[160px] placeholder:text-text-muted"
              placeholder={"-- Paste your CREATE TABLE statements here\nCREATE TABLE users (\n  id INT PRIMARY KEY,\n  name VARCHAR(100)\n);"}
              value={schema}
              onChange={e => setSchema(e.target.value)}
              rows={10}
              spellCheck={false}
            />
          </div>

          {/* Query Panel */}
          <div className="bg-bg-card border border-border-dim rounded-lg overflow-hidden transition-all duration-200 focus-within:border-border-bright focus-within:shadow-[0_0_0_3px_rgba(0,229,255,0.06)]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-dim bg-white/[0.02]">
              <span className="flex items-center gap-2 text-[0.78rem] text-text-secondary font-display font-semibold">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 3h10M2 7h6M2 11h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                SQL Query
              </span>
              <span className="text-[0.65rem] text-accent border border-accent-dim bg-accent-dim px-2 py-0.5 rounded-full">required</span>
            </div>
            <textarea
              className="w-full bg-transparent border-none outline-none resize-y font-mono text-[0.82rem] text-text-primary p-4 leading-[1.7] min-h-[160px] placeholder:text-text-muted"
              placeholder={"-- Write your SQL query here\nSELECT * FROM orders\nWHERE status = 'active';"}
              value={query}
              onChange={e => setQuery(e.target.value)}
              rows={10}
              spellCheck={false}
            />
          </div>

          {/* DB Size Panel */}
          <div className="bg-bg-card border border-border-dim rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-dim bg-white/[0.02]">
              <span className="flex items-center gap-2 text-[0.78rem] text-text-secondary font-display font-semibold">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <ellipse cx="7" cy="4" rx="5" ry="2" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M2 4v6c0 1.1 2.24 2 5 2s5-.9 5-2V4" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M2 7c0 1.1 2.24 2 5 2s5-.9 5-2" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
                Estimated DB Size
              </span>
            </div>
            <div className="flex gap-2 px-4 py-3 flex-wrap">
              {['small', 'medium', 'large', 'enterprise'].map(s => (
                <button
                  key={s}
                  onClick={() => setDbSize(s)}
                  className={`px-3 py-1.5 rounded-full border font-mono text-[0.75rem] cursor-pointer capitalize transition-all duration-200 ${
                    dbSize === s
                      ? 'border-accent text-accent bg-accent-dim'
                      : 'border-border-dim text-text-muted bg-transparent hover:border-border-bright hover:text-text-secondary'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="px-4 pb-3 text-[0.75rem] text-text-muted">
              {({
                small:      '< 10K rows — startup or dev environment',
                medium:     '100K–1M rows — typical production app',
                large:      '1M–100M rows — scaled application',
                enterprise: '100M+ rows — high-scale production system',
              })[dbSize]}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            <button
              className="flex items-center justify-center gap-2 flex-1 px-6 py-3 bg-accent text-black font-display font-bold text-[0.88rem] border-none rounded-base cursor-pointer transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:not(:disabled):bg-white hover:not(:disabled):shadow-[0_0_20px_rgba(0,229,255,0.4)]"
              onClick={handleAnalyse}
              disabled={loading}
            >
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
            <button
              className="px-4 py-3 bg-transparent border border-border-bright text-text-secondary font-mono text-[0.82rem] rounded-base cursor-pointer transition-all duration-200 disabled:opacity-50 hover:border-accent hover:text-accent"
              onClick={handleExample}
              disabled={loading}
            >
              Load Example
            </button>
            <button
              className="px-4 py-3 bg-transparent border border-border-dim text-text-muted font-mono text-[0.82rem] rounded-base cursor-pointer transition-all duration-200 disabled:opacity-50 hover:text-text-secondary hover:border-border-bright"
              onClick={handleClear}
              disabled={loading}
            >
              Clear
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2.5 px-4 py-3 bg-warn-dim border border-[rgba(255,107,53,0.3)] rounded-base text-warn text-[0.82rem]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M7 4v3.5M7 9.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}
        </div>

        {/* ── RIGHT: Results ── */}
        <div className="sticky top-20 max-h-[calc(100vh-100px)] overflow-y-auto" ref={resultRef}>
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center min-h-[400px] border border-dashed border-border-bright rounded-lg text-center px-12 py-12 gap-3">
              <div className="text-text-muted mb-2">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="22" cy="22" r="14" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M36 36L31.5 31.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M16 22h12M22 16v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-[1.1rem] text-text-secondary">Results appear here</h3>
              <p className="text-[0.83rem] text-text-muted max-w-[300px]">
                Paste your schema and query on the left, then click <strong className="text-text-secondary">Analyse Query</strong>.
              </p>
              <button
                className="mt-2 text-[0.82rem] text-accent bg-transparent border-none cursor-pointer underline underline-offset-[3px] font-mono"
                onClick={handleExample}
              >
                Try with an example →
              </button>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
              <div
                className="w-15 h-15 rounded-full border-2 border-border-dim border-t-accent animate-spin-slow"
                style={{ width: 60, height: 60, boxShadow: '0 0 20px rgba(0,229,255,0.4)' }}
              />
              <p className="font-display font-bold text-text-primary text-[0.95rem]">{phase}</p>
              <p className="text-[0.78rem] text-text-muted">Calling GenAI model for deep static analysis...</p>
            </div>
          )}

          {result && <ResultPanel result={result} />}
        </div>
      </div>
    </div>
  )
}
