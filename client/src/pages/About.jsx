import React from 'react'
import { Link } from 'react-router-dom'

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
  { label: 'Frontend',          value: 'React.js + Vite + Tailwind CSS' },
  { label: 'Routing',           value: 'React Router v6' },
  { label: 'AI Integration',    value: 'Gemini API (2.5 Flash)' },
  { label: 'Syntax Validation', value: 'SQLglot (Python)' },
  { label: 'Backend API',       value: 'FastAPI (Python)' },
]

export default function About() {
  return (
    <div className="max-w-[1000px] mx-auto px-8 pt-12 pb-24 flex flex-col gap-20">
      {/* Page Header */}
      <div className="max-w-[680px]">
        <span className="block text-[0.72rem] text-accent tracking-[0.1em] mb-2.5">// project overview</span>
        <h1 className="font-display font-extrabold text-[2.8rem] tracking-[-0.03em] mb-4">About QueryLens</h1>
      </div>

      {/* Problem + Solution */}
      <div
        className="grid gap-px bg-border-dim border border-border-dim rounded-lg overflow-hidden"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
      >
        <div className="bg-bg-card p-8 transition-colors duration-200 hover:bg-bg-card-hover">
          <span className="block text-[0.7rem] text-accent tracking-[0.1em] mb-3">// problem statement</span>
          <h2 className="font-display font-extrabold text-[1.3rem] tracking-[-0.02em] mb-4">The Problem</h2>
          <p className="text-[0.85rem] text-text-secondary leading-[1.8]">
            Testing and optimizing SQL typically requires sandbox databases—PostgreSQL instances, schema migrations,
            and developer access credentials. This is expensive, time-consuming, and carries real risk.
            A poorly-written query exposes production data to injection attacks, causes full-table scans,
            and leads to data corruption from heavy unindexed joins.
          </p>
          <p className="text-[0.85rem] text-text-secondary leading-[1.8] mt-3">
            Small development teams and students rarely have access to secure, scalable DB environments.
            There is a clear need for a <em className="text-accent not-italic">stateless</em>, <em className="text-accent not-italic">connectionless</em> solution.
          </p>
        </div>

        <div className="bg-bg-card p-8 transition-colors duration-200 hover:bg-bg-card-hover">
          <span className="block text-[0.7rem] text-accent tracking-[0.1em] mb-3">// proposed solution</span>
          <h2 className="font-display font-extrabold text-[1.3rem] tracking-[-0.02em] mb-4">Our Solution</h2>
          <p className="text-[0.85rem] text-text-secondary leading-[1.8]">
            QueryLens is a stateless web app for static SQL analysis. Users paste their schema and query.
            The backend validates syntax locally (fast, no API call), then the validated input is combined
            into a structured prompt and sent to a Generative AI model acting as a virtual DBA.
          </p>
          <p className="text-[0.85rem] text-text-secondary leading-[1.8] mt-3">
            The AI returns a structured JSON object containing detected anti-patterns, a rewritten optimized query,
            index recommendations, and performance scores—all without ever touching a real database.
          </p>
        </div>
      </div>

      {/* Architecture Pipeline */}
      <section>
        <div className="mb-10">
          <span className="block text-[0.72rem] text-accent tracking-[0.1em] mb-2">// methodology</span>
          <h2 className="font-display font-extrabold text-[2rem] tracking-[-0.03em]">5-Phase Pipeline</h2>
        </div>
        <div className="flex flex-col">
          {phases.map((p, i) => (
            <div key={i} className="relative flex gap-6 items-start group">
              <div
                className="font-display font-extrabold text-[2.5rem] tracking-[-0.05em] leading-none shrink-0 w-[60px] pt-0.5 transition-colors duration-200 text-border-bright group-hover:text-accent"
              >
                {p.num}
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="font-display font-bold text-[1.1rem] text-text-primary">{p.title}</h3>
                  <span className="text-[0.7rem] text-accent bg-accent-dim border border-[rgba(0,229,255,0.2)] px-2.5 py-1 rounded-full font-mono">
                    {p.tech}
                  </span>
                </div>
                <p className="text-[0.84rem] text-text-secondary leading-[1.75]">{p.desc}</p>
              </div>
              {i < phases.length - 1 && (
                <div className="absolute left-[22px] bottom-[-22px] text-border-bright z-[1]">
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
      <section>
        <div className="mb-10">
          <span className="block text-[0.72rem] text-accent tracking-[0.1em] mb-2">// tech stack</span>
          <h2 className="font-display font-extrabold text-[2rem] tracking-[-0.03em]">Technologies Used</h2>
        </div>
        <div className="bg-bg-card border border-border-dim rounded-lg overflow-hidden">
          {stack.map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 px-6 py-3.5 transition-colors duration-150 hover:bg-bg-card-hover ${
                i < stack.length - 1 ? 'border-b border-border-dim' : ''
              }`}
            >
              <span className="text-[0.78rem] text-text-muted w-[160px] shrink-0 font-display font-semibold">{s.label}</span>
              <span className="text-[0.83rem] text-text-secondary">{s.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="flex justify-center">
        <Link
          to="/analyse"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-black font-display font-bold text-[0.95rem] rounded-base no-underline transition-all duration-200 hover:bg-white hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]"
        >
          Try the Analyser
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </div>
  )
}
