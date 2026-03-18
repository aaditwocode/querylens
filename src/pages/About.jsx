import React from 'react'
import { Link } from 'react-router-dom'
import styles from './About.module.css'

const phases = [
  {
    num: '01',
    title: 'Frontend Input',
    tech: 'React.js',
    desc: 'A clean developer dashboard with split panes for schema definition and SQL query input. Accepts DB size context for better AI calibration.',
  },
  {
    num: '02',
    title: 'Syntax Validation',
    tech: 'SQLglot',
    desc: 'The Python backend parses the raw SQL string locally using SQLglot to catch syntax errors before forwarding to the AI—fast, cheap, deterministic.',
  },
  {
    num: '03',
    title: 'AI Prompt Design',
    tech: 'Prompt Engineering',
    desc: 'A strict system prompt instructs the LLM to act as a virtual DBA, generating a logical execution plan from the schema and query without running any code.',
  },
  {
    num: '04',
    title: 'Structured Output',
    tech: 'JSON Schema',
    desc: 'The model is constrained to return a structured JSON object separating anti-patterns, explanation, optimized SQL, and index recommendations.',
  },
  {
    num: '05',
    title: 'Results Rendering',
    tech: 'React.js',
    desc: 'The structured output is unpacked and displayed in a tabbed result panel with scores, issue cards, optimized SQL, and copy-paste index commands.',
  },
]


const stack = [
  { label: 'Frontend',          value: 'React.js + Vite + CSS Modules' },
  { label: 'Routing',           value: 'React Router v6' },
  { label: 'AI Integration',    value: 'Gemini API (2.5 Flash)' },
  { label: 'Syntax Validation', value: 'SQLglot (Python)' },
  { label: 'Backend API',       value: 'FastAPI (Python)' }
]

export default function About() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <span className={styles.pageTag}>// project overview</span>
        <h1 className={styles.pageTitle}>About QueryLens</h1>
      </div>

      {/* Problem + Solution */}
      <div className={styles.twoCol}>
        <div className={styles.infoCard}>
          <span className={styles.cardTag}>// problem statement</span>
          <h2 className={styles.cardTitle}>The Problem</h2>
          <p className={styles.cardText}>
            Testing and optimizing SQL typically requires sandbox databases—PostgreSQL instances, schema migrations,
            and developer access credentials. This is expensive, time-consuming, and carries real risk.
            A poorly-written query exposes production data to injection attacks, causes full-table scans,
            and leads to data corruption from heavy unindexed joins.
          </p>
          <p className={styles.cardText} style={{ marginTop: '0.75rem' }}>
            Small development teams and students rarely have access to secure, scalable DB environments.
            There is a clear need for a <em>stateless</em>, <em>connectionless</em> solution.
          </p>
        </div>

        <div className={styles.infoCard}>
          <span className={styles.cardTag}>// proposed solution</span>
          <h2 className={styles.cardTitle}>Our Solution</h2>
          <p className={styles.cardText}>
            QueryLens is a stateless web app for static SQL analysis. Users paste their schema and query.
            The backend validates syntax locally (fast, no API call), then the validated input is combined
            into a structured prompt and sent to a Generative AI model acting as a virtual DBA.
          </p>
          <p className={styles.cardText} style={{ marginTop: '0.75rem' }}>
            The AI returns a structured JSON object containing detected anti-patterns, a rewritten optimized query,
            index recommendations, and performance scores—all without ever touching a real database.
          </p>
        </div>
      </div>

      {/* Architecture Pipeline */}
      <section className={styles.pipeline}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>// methodology</span>
          <h2 className={styles.sectionTitle}>5-Phase Pipeline</h2>
        </div>
        <div className={styles.phases}>
          {phases.map((p, i) => (
            <div key={i} className={styles.phase}>
              <div className={styles.phaseNum}>{p.num}</div>
              <div className={styles.phaseContent}>
                <div className={styles.phaseTop}>
                  <h3 className={styles.phaseTitle}>{p.title}</h3>
                  <span className={styles.phaseTech}>{p.tech}</span>
                </div>
                <p className={styles.phaseDesc}>{p.desc}</p>
              </div>
              {i < phases.length - 1 && (
                <div className={styles.phaseArrow}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v12M4 10l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className={styles.stackSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>// tech stack</span>
          <h2 className={styles.sectionTitle}>Technologies Used</h2>
        </div>
        <div className={styles.stackGrid}>
          {stack.map((s, i) => (
            <div key={i} className={styles.stackRow}>
              <span className={styles.stackLabel}>{s.label}</span>
              <span className={styles.stackValue}>{s.value}</span>
            </div>
          ))}
        </div>
      </section>


      {/* CTA */}
      <div className={styles.cta}>
        <Link to="/analyse" className={styles.ctaBtn}>
          Try the Analyser
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </div>
  )
}
