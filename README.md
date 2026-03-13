# QueryLens — AI-Powered Static SQL Analyser

A GenAI Workshop Project-Based Learning submission at  
**Jaypee Institute of Information Technology, Noida**  
Supervised by **Dr. Astha Singh**

## Team

| S.No | Enrolment No. | Name |
|------|--------------|------|
| 1 | 23103298 | Aaditya Pratap Singh |
| 2 | 23103299 | Arpit Varshney |
| 3 | 23103303 | Prakhar Singhal |
| 4 | 23103374 | Vasu Tayal |

---

## Project Overview

QueryLens is a **stateless web application** for static SQL analysis using Generative AI.  
It analyses SQL queries and schema definitions **without requiring a database connection**.

### Problem
- Sandbox DBs are expensive and time-consuming to provision
- Poor queries expose risk: SQL injection, full-table scans, data corruption
- Students and small teams lack access to scalable DB environments

### Solution
- Local syntax validation (SQLglot/SQLparse) — fast, deterministic, free
- Structured AI prompt to a GenAI model acting as a virtual DBA
- JSON output with anti-patterns, optimized SQL, and index recommendations

---

## Project Structure

```
querylens/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # App shell, header, footer, nav
│   │   ├── Layout.module.css
│   │   ├── ResultPanel.jsx     # Tabbed result display component
│   │   ├── ResultPanel.module.css
│   │   └── Spinner.jsx         # Loading spinner
│   ├── hooks/
│   │   └── useAnalysis.js      # Custom hook for analysis state + API
│   ├── pages/
│   │   ├── Home.jsx            # Landing page with hero, features, terminal demo
│   │   ├── Home.module.css
│   │   ├── Analyser.jsx        # Main SQL analysis workspace
│   │   ├── Analyser.module.css
│   │   ├── History.jsx         # Past analyses (localStorage)
│   │   ├── History.module.css
│   │   ├── About.jsx           # Project info, pipeline, team
│   │   └── About.module.css
│   ├── styles/
│   │   └── global.css          # CSS variables, reset, animations
│   ├── utils/
│   │   └── api.js              # Anthropic API calls + history utils
│   ├── App.jsx                 # Router setup
│   └── main.jsx                # React entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Vite |
| Routing | React Router v6 |
| Styling | CSS Modules |
| AI Integration | Anthropic API (Claude Sonnet) |
| Syntax Validation | SQLglot / SQLparse (Python backend) |
| Backend API | FastAPI or Flask (Python) |
| Fonts | Syne (display) + Space Mono (monospace) |

---

## Getting Started

### Frontend

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Backend (Python — separate repo/service)

```bash
pip install fastapi uvicorn sqlglot anthropic python-dotenv

# Set your API key
export ANTHROPIC_API_KEY=your_key_here

uvicorn main:app --reload
```

---

## 5-Phase Methodology

1. **Frontend Input** — React.js form with schema, query, and DB size inputs  
2. **Syntax Validation** — SQLglot locally parses SQL and catches syntax errors  
3. **AI Prompt Design** — Strict system prompt → LLM acts as virtual DBA  
4. **Structured JSON Output** — Anti-patterns, optimized SQL, index recommendations  
5. **Results Rendering** — Tabbed UI with scores, issue cards, copy-paste SQL  

---

## Features

- ✅ Syntax validation (local, no API needed)
- ✅ Full-table scan detection
- ✅ N+1 / sequential query detection
- ✅ SQL injection pattern flagging
- ✅ Missing index recommendations
- ✅ Optimized SQL rewrite
- ✅ Performance / Security / Readability scores
- ✅ Analysis history (localStorage)
- ✅ Zero DB connection required
