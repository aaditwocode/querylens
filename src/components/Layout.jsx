import React, { useState, useEffect } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import styles from './Layout.module.css'

export default function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className={styles.shell}>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M20 20L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M8 11h6M11 8v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
          <span className={styles.logoText}>Query<span>Lens</span></span>
        </NavLink>

        <nav className={styles.nav}>
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
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <a href="/analyse" className={styles.ctaBtn}>
          <span>Analyse Query</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerLogo}>QueryLens</span>
          <span className={styles.footerText}>
            AI-Powered Static SQL Analysis — No DB Connection Required
          </span>
          <span className={styles.footerRight}>
            JIIT Noida · GenAI Workshop PBL
          </span>
        </div>
      </footer>
    </div>
  )
}
