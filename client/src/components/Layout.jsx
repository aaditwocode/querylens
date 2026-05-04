import React, { useState, useEffect } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'

export default function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center gap-8 px-8 h-16 border-b transition-all duration-300 ${
          scrolled
            ? 'border-border-dim bg-[rgba(9,9,14,0.92)] backdrop-blur-xl'
            : 'border-transparent bg-[rgba(9,9,14,0.5)] backdrop-blur-none'
        }`}
      >
        <NavLink
          to="/"
          className="flex items-center gap-2 no-underline text-text-primary font-display font-extrabold text-lg tracking-tight shrink-0"
        >
          <span className="text-accent flex">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M20 20L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M8 11h6M11 8v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="font-display">
            Query<span className="text-accent">Lens</span>
          </span>
        </NavLink>

        <nav className="flex items-center gap-1 flex-1">
          {[
            { to: '/', label: '01. Home', exact: true },
            { to: '/analyse', label: '02. Analyser' },
            { to: '/history', label: '03. History' },
            { to: '/about', label: '04. About' },
          ].map(({ to, label, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) =>
                `no-underline text-xs tracking-widest px-3 py-1.5 rounded-base transition-all duration-200 ${
                  isActive
                    ? 'text-accent bg-accent-dim'
                    : 'text-text-muted hover:text-text-secondary hover:bg-white/[0.04]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <a
          href="/analyse"
          className="flex items-center gap-2 px-4 py-2 rounded-base bg-accent text-black font-display font-bold text-sm no-underline transition-all duration-200 shrink-0 hover:bg-white hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
        >
          <span>Analyse Query</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </header>

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      <footer className="border-t border-border-dim px-8 py-6 mt-auto">
        <div className="flex items-center gap-6 max-w-[1400px] mx-auto">
          <span className="font-display font-extrabold text-accent text-sm shrink-0">QueryLens</span>
          <span className="text-text-muted text-xs flex-1 hidden md:block">
            AI-Powered Static SQL Analysis — No DB Connection Required
          </span>
        </div>
      </footer>
    </div>
  )
}
