import React from 'react'
import { Link } from 'react-router-dom'

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
  { value: '0ms',   label: 'DB Connection Time' },
  { value: '100%',  label: 'Stateless Analysis' },
  { value: 'LLM',   label: 'Powered Review' },
  { value: 'Open',  label: 'Source Models' },
]

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Grid background */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Hero */}
      <section className="relative z-[1] max-w-[900px] mx-auto px-8 pt-[120px] pb-[80px] text-center">
        <h1 className="font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.03em] text-text-primary mb-6 animate-fade-up">
          Static SQL Analysis<br />
          <span className="text-accent" style={{ textShadow: '0 0 40px rgba(0,229,255,0.4)' }}>
            Without a Database
          </span>
        </h1>

        <p className="text-lg text-text-secondary max-w-[560px] mx-auto mb-10 leading-[1.8] animate-fade-up">
          QueryLens uses Generative AI and local syntax parsing to review, optimize,
          and secure your SQL queries—no sandbox, no DB connection, no risk.
        </p>

        <div className="flex items-center justify-center gap-4 mb-16 flex-wrap animate-fade-up">
          <Link
            to="/analyse"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black font-display font-bold text-[0.9rem] rounded-base no-underline transition-all duration-200 hover:bg-white hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:-translate-y-px"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M13 13L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M5 7h4M7 5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Start Analysing
          </Link>
          <Link
            to="/about"
            className="text-text-secondary text-[0.85rem] no-underline px-3 py-3 transition-colors duration-200 hover:text-accent"
          >
            Learn How It Works →
          </Link>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-12 flex-wrap animate-fade-up">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="font-display font-extrabold text-[1.8rem] text-accent tracking-[-0.03em]">
                {s.value}
              </span>
              <span className="text-[0.7rem] text-text-muted tracking-[0.08em] uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Terminal Preview */}
      <section className="relative z-[1] max-w-[900px] mx-auto px-8 pb-[100px]">
        <div
          className="relative bg-[#0a0a12] border border-border-bright rounded-lg overflow-hidden"
          style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,229,255,0.05), inset 0 1px 0 rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-1.5 px-4 py-3 bg-white/[0.03] border-b border-border-dim">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
            <span className="ml-2 text-[0.72rem] text-text-muted">querylens — analysis output</span>
          </div>
          <div className="px-6 py-5 text-[0.82rem] leading-[1.7]">
            <div className="font-mono"><span className="text-text-muted">$</span> querylens analyse --schema schema.sql --query query.sql</div>
            <div className="font-mono">&nbsp;</div>
            <div className="font-mono"><span className="text-success">✔</span> Syntax validation passed</div>
            <div className="font-mono"><span className="text-warn">⚠</span> Anti-patterns detected: 2</div>
            <div className="font-mono">&nbsp;</div>
            <div className="font-mono"><span className="text-warn">[ANTI-PATTERN]</span> Full table scan on `orders`</div>
            <div className="font-mono"><span className="text-warn">[ANTI-PATTERN]</span> Missing index on foreign key `user_id`</div>
            <div className="font-mono">&nbsp;</div>
            <div className="font-mono"><span className="text-success">[OPTIMIZED QUERY]</span></div>
            <div className="font-mono">  SELECT o.id, u.name</div>
            <div className="font-mono">  FROM orders o</div>
            <div className="font-mono">  <span className="text-[#7dd3fc]">INNER JOIN</span> users u ON o.user_id = u.id</div>
            <div className="font-mono">  WHERE o.status = <span className="text-[#fcd34d]">'active'</span></div>
            <div className="font-mono">  <span className="text-[#7dd3fc]">LIMIT</span> 100;</div>
            <div className="font-mono">&nbsp;</div>
            <div className="font-mono"><span className="text-success">[INDEX RECOMMENDATION]</span></div>
            <div className="font-mono">  <span className="text-[#7dd3fc]">CREATE INDEX</span> idx_orders_user_id <span className="text-[#7dd3fc]">ON</span> orders(user_id);</div>
            <div className="font-mono">&nbsp;</div>
            <div className="font-mono"><span className="text-success">✔</span> Analysis complete in <span className="text-[#fcd34d]">1.24s</span></div>
          </div>
          {/* Scan line */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none animate-scan"
            style={{ background: 'linear-gradient(90deg, transparent, #00e5ff, transparent)' }}
          />
        </div>
      </section>

      {/* Features */}
      <section className="relative z-[1] max-w-[1200px] mx-auto px-8 pb-[100px]">
        <div className="text-center mb-16">
          <span className="block text-[0.75rem] text-accent tracking-[0.1em] mb-4">// capabilities</span>
          <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,3rem)] text-text-primary tracking-[-0.03em] leading-[1.1]">
            Everything you need to<br />optimize SQL, safely.
          </h2>
        </div>
        <div
          className="grid gap-px bg-border-dim border border-border-dim rounded-lg overflow-hidden"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-bg-card p-7 transition-colors duration-200 animate-fade-up hover:bg-bg-card-hover"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="text-accent mb-4">{f.icon}</div>
              <h3 className="font-display font-bold text-base text-text-primary mb-2.5">{f.label}</h3>
              <p className="text-[0.82rem] text-text-secondary leading-[1.7]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative z-[1] px-8 pb-[100px]">
        <div
          className="max-w-[700px] mx-auto border border-border-bright rounded-lg px-12 py-16 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #13131f 0%, rgba(0,229,255,0.03) 100%)' }}
        >
          <div
            className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[300px] h-[300px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)' }}
          />
          <h2 className="font-display font-extrabold text-[2rem] tracking-[-0.03em] mb-3">Ready to analyse your SQL?</h2>
          <p className="text-text-secondary mb-8 text-[0.9rem]">Paste your schema and query. Get instant insights.</p>
          <Link
            to="/analyse"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black font-display font-bold text-[0.9rem] rounded-base no-underline transition-all duration-200 hover:bg-white hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:-translate-y-px"
          >
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
