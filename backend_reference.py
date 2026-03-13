"""
QueryLens — Python Backend Reference (FastAPI)
============================================
This is the backend service that handles:
  1. Local SQL syntax validation via sqlglot
  2. Proxying requests to the Anthropic API

Install dependencies:
    pip install fastapi uvicorn sqlglot anthropic python-dotenv

Run:
    uvicorn backend_reference:app --reload --port 8000
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import sqlglot
import anthropic
import json
import os

app = FastAPI(title="QueryLens API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

SYSTEM_PROMPT = """You are QueryLens, an expert virtual database administrator and SQL analyser.
Your task is to analyse SQL queries and schema definitions statically (without executing them).

Respond ONLY with a valid JSON object — no markdown, no preamble.

JSON structure:
{
  "syntax_valid": true | false,
  "syntax_error": "description if invalid, else null",
  "summary": "1-2 sentence summary",
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
  "explanation": "Detailed explanation paragraph",
  "optimized_query": "Rewritten optimized SQL string",
  "optimization_notes": "What changed and why",
  "index_recommendations": [
    {
      "sql": "CREATE INDEX idx_name ON table(column);",
      "reason": "Why this index would help"
    }
  ]
}"""


class AnalyseRequest(BaseModel):
    query: str
    schema: Optional[str] = None
    db_size: str = "medium"


class ValidationResult(BaseModel):
    valid: bool
    error: Optional[str] = None


@app.get("/")
def root():
    return {"service": "QueryLens API", "status": "ok"}


@app.post("/validate")
def validate_sql(req: AnalyseRequest) -> ValidationResult:
    """Phase 2: Local syntax validation using sqlglot."""
    try:
        sqlglot.parse(req.query, error_level=sqlglot.ErrorLevel.RAISE)
        return ValidationResult(valid=True)
    except sqlglot.errors.SqlglotError as e:
        return ValidationResult(valid=False, error=str(e))


@app.post("/analyse")
def analyse(req: AnalyseRequest):
    """
    Full analysis pipeline:
      1. Validate syntax locally
      2. Build prompt
      3. Call Anthropic API
      4. Return structured JSON
    """
    # Phase 2: Syntax check
    syntax_error = None
    try:
        sqlglot.parse(req.query, error_level=sqlglot.ErrorLevel.RAISE)
    except sqlglot.errors.SqlglotError as e:
        syntax_error = str(e)

    # Phase 3: Build prompt
    db_size_context = {
        "small": "under 10K rows",
        "medium": "100K to 1M rows",
        "large": "1M to 100M rows",
        "enterprise": "100M+ rows — high-scale production system",
    }.get(req.db_size, "medium scale")

    user_message = f"""Analyse the following SQL query{' and schema' if req.schema else ''}.
Database size context: {req.db_size} ({db_size_context}).
{f'DATABASE SCHEMA:\n```sql\n{req.schema}\n```\n\n' if req.schema else ''}SQL QUERY:
```sql
{req.query}
```

{'NOTE: The query has a syntax error: ' + syntax_error if syntax_error else ''}

Return ONLY the JSON analysis object."""

    # Phase 3: Call AI
    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1000,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_message}],
    )

    raw = message.content[0].text.strip()
    # Strip markdown fences if present
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    raw = raw.strip()

    try:
        result = json.loads(raw)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse AI response")

    # Override syntax_valid based on local validator
    if syntax_error:
        result["syntax_valid"] = False
        result["syntax_error"] = syntax_error

    return result


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
