/**
 * QueryLens API utilities
 * Calls the Anthropic API via the GenAI integration layer
 */

const SYSTEM_PROMPT = `You are QueryLens, an expert virtual database administrator and SQL analyser.
Your task is to analyse SQL queries and schema definitions statically (without executing them) and return a structured JSON analysis.

You MUST respond ONLY with a valid JSON object. No preamble, no markdown backticks, no explanation outside the JSON.

JSON structure:
{
  "syntax_valid": true | false,
  "syntax_error": "description if invalid, else null",
  "summary": "1-2 sentence summary of the query and its main issues",
  "query_type": "SELECT | INSERT | UPDATE | DELETE | DDL | Other",
  "complexity": "Low | Medium | High | Very High",
  "scores": {
    "performance": <0-100>,
    "security": <0-100>,
    "readability": <0-100>
  },
  "anti_patterns": [
    {
      "pattern": "Name of the anti-pattern",
      "severity": "high | medium | low | info",
      "description": "What the problem is",
      "suggestion": "How to fix it"
    }
  ],
  "explanation": "Detailed paragraph explaining the query's behaviour, what the AI model identified, and what improvements were made",
  "optimized_query": "The rewritten, optimized SQL query as a string",
  "optimization_notes": "Explanation of the changes made in the optimized query",
  "index_recommendations": [
    {
      "sql": "CREATE INDEX idx_name ON table(column);",
      "reason": "Why this index would help"
    }
  ]
}`

export async function analyseQuery({ schema, query, dbSize }) {
  const userMessage = `
Analyse the following SQL query${schema ? ' and schema' : ''}.
Database size context: ${dbSize} (${
    {
      small: 'under 10K rows',
      medium: '100K to 1M rows',
      large: '1M to 100M rows',
      enterprise: '100M+ rows — high-scale system',
    }[dbSize]
  }).

${schema ? `DATABASE SCHEMA:\n\`\`\`sql\n${schema}\n\`\`\`\n\n` : ''}SQL QUERY TO ANALYSE:
\`\`\`sql
${query}
\`\`\`

Return ONLY the JSON analysis object. No extra text.`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API error: ${response.status}`)
  }

  const data = await response.json()
  const rawText = data.content
    .filter(b => b.type === 'text')
    .map(b => b.text)
    .join('')

  // Strip markdown fences if present
  const clean = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

  try {
    return JSON.parse(clean)
  } catch {
    throw new Error('Failed to parse AI response. Please try again.')
  }
}

/**
 * Save analysis result to localStorage history
 */
export function saveToHistory(entry) {
  const history = getHistory()
  history.unshift({ ...entry, id: Date.now(), timestamp: new Date().toISOString() })
  const trimmed = history.slice(0, 20) // keep last 20
  localStorage.setItem('querylens_history', JSON.stringify(trimmed))
}

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem('querylens_history') || '[]')
  } catch {
    return []
  }
}

export function clearHistory() {
  localStorage.removeItem('querylens_history')
}
