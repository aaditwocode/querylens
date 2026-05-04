import { useState } from 'react'
import { analyseQuery, saveToHistory } from '../utils/api'

export function useAnalysis() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [phase, setPhase] = useState(null)

  const run = async ({ schema, query, dbSize }) => {
    setLoading(true)
    setResult(null)
    setError(null)
    setPhase('Validating syntax...')

    try {
      await new Promise(r => setTimeout(r, 600))
      setPhase('Generating AI prompt...')
      await new Promise(r => setTimeout(r, 400))
      setPhase('Running GenAI analysis...')

      const data = await analyseQuery({ schema, query, dbSize })
      setResult(data)

      // Save to history
      saveToHistory({ schema, query, dbSize, result: data })
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
