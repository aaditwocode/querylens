import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 5h14M3 10h10M3 15h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Syntax Validation',
    desc: 'Instant local parsing via SQLglot catches syntax errors before sending to AI—zero DB connection needed.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Performance Analysis',
    desc: 'Detects full-table scans, missing indexes, N+1 patterns, and costly sequential operations.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 16l4-4 3 3 5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Query Optimization',
    desc: 'Returns a fully rewritten, optimized SQL query alongside the reasoning behind each change.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 8h14" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 8v9" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    label: 'Schema Awareness',
    desc: 'Paste your schema definition and the AI understands table structure, relationships, and indexing context.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3L3 7v6l7 4 7-4V7l-7-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Injection Detection',
    desc: 'Flags potentially dangerous SQL patterns that could lead to injection vulnerabilities in production.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M17 5H3M13 10H3M9 15H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="13" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    label: 'Structured JSON Output',
    desc: 'Responses are structured with anti-patterns, explanations, optimized SQL, and index recommendations.',
  },
]

const stats = [
  { value: '0ms', label: 'DB Connection Time' },
  { value: '100%', label: 'Stateless Analysis' },
  { value: 'LLM', label: 'Powered Review' },
  { value: 'Open', label: 'Source Models' },
]

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Grid background */}
      <div className={styles.gridBg} aria-hidden />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>
          <span className={styles.badgeDot} />
          GenAI Workshop · PBL Project · JIIT Noida
        </div>

        <h1 className={styles.heroTitle}>
          Static SQL Analysis<br />
          <span className={styles.heroAccent}>Without a Database</span>
        </h1>

        <p className={styles.heroSub}>
          QueryLens uses Generative AI and local syntax parsing to review, optimize,
          and secure your SQL queries—no sandbox, no DB connection, no risk.
        </p>

        <div className={styles.heroActions}>
          <Link to="/analyse" className={styles.primaryBtn}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M13 13L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M5 7h4M7 5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Start Analysing
          </Link>
          <Link to="/about" className={styles.ghostBtn}>
            Learn How It Works →
          </Link>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          {stats.map((s, i) => (
            <div key={i} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Terminal Preview */}
      <section className={styles.previewSection}>
        <div className={styles.terminal}>
          <div className={styles.terminalBar}>
            <span className={styles.dot} style={{background:'#ff5f57'}} />
            <span className={styles.dot} style={{background:'#febc2e'}} />
            <span className={styles.dot} style={{background:'#28c840'}} />
            <span className={styles.terminalTitle}>querylens — analysis output</span>
          </div>
          <div className={styles.terminalBody}>
            <div className={styles.termLine}><span className={styles.c1}>$</span> querylens analyse --schema schema.sql --query query.sql</div>
            <div className={styles.termLine}>&nbsp;</div>
            <div className={styles.termLine}><span className={styles.c2}>✔</span> Syntax validation passed</div>
            <div className={styles.termLine}><span className={styles.c3}>⚠</span> Anti-patterns detected: 2</div>
            <div className={styles.termLine}>&nbsp;</div>
            <div className={styles.termLine}><span className={styles.c4}>[ANTI-PATTERN]</span> Full table scan on `orders`</div>
            <div className={styles.termLine}><span className={styles.c4}>[ANTI-PATTERN]</span> Missing index on foreign key `user_id`</div>
            <div className={styles.termLine}>&nbsp;</div>
            <div className={styles.termLine}><span className={styles.c5}>[OPTIMIZED QUERY]</span></div>
            <div className={styles.termLine}>  SELECT o.id, u.name</div>
            <div className={styles.termLine}>  FROM orders o</div>
            <div className={styles.termLine}>  <span className={styles.c2}>INNER JOIN</span> users u ON o.user_id = u.id</div>
            <div className={styles.termLine}>  WHERE o.status = <span className={styles.c3}>'active'</span></div>
            <div className={styles.termLine}>  <span className={styles.c2}>LIMIT</span> 100;</div>
            <div className={styles.termLine}>&nbsp;</div>
            <div className={styles.termLine}><span className={styles.c5}>[INDEX RECOMMENDATION]</span></div>
            <div className={styles.termLine}>  <span className={styles.c2}>CREATE INDEX</span> idx_orders_user_id <span className={styles.c2}>ON</span> orders(user_id);</div>
            <div className={styles.termLine}>&nbsp;</div>
            <div className={styles.termLine}><span className={styles.c2}>✔</span> Analysis complete in <span className={styles.c3}>1.24s</span></div>
          </div>
          <div className={styles.scanLine} />
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>// capabilities</span>
          <h2 className={styles.sectionTitle}>Everything you need to<br />optimize SQL, safely.</h2>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((f, i) => (
            <div key={i} className={styles.featureCard} style={{ animationDelay: `${i * 0.07}s` }}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3 className={styles.featureLabel}>{f.label}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBannerInner}>
          <h2 className={styles.ctaTitle}>Ready to analyse your SQL?</h2>
          <p className={styles.ctaDesc}>Paste your schema and query. Get instant insights.</p>
          <Link to="/analyse" className={styles.primaryBtn}>
            Open Analyser
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
