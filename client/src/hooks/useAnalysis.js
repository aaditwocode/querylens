import { useState } from 'react'
import { analyseQuery, saveToHistory } from '../utils/api'

export function useAnalysis() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [phase, setPhase] = useState(null)

  // NEW: Added tableStats and hardwareStats to the destructured parameters
  const run = async ({ schema, query, dbSize, tableStats, hardwareStats }) => {
    setLoading(true)
    setResult(null)
    setError(null)
    setPhase('Validating syntax...')

    try {
      await new Promise(r => setTimeout(r, 600))
      setPhase('Calculating Cost Heuristics & AI Prompts...')
      
      await new Promise(r => setTimeout(r, 400))
      setPhase('Running GenAI analysis...')

      // Pass the new variables to the API call
      const data = await analyseQuery({ schema, query, dbSize, tableStats, hardwareStats })
      setResult(data)

      // Save to history
      saveToHistory({ schema, query, dbSize, tableStats, hardwareStats, result: data })
      return data
    } catch (e) {
      setError(e.message || 'Unexpected error. Please try again.')
      throw e
    } finally {
      setLoading(false)
      setPhase(null)
    }
  }

  return { run, loading, result, error, phase, setResult, setError }
}