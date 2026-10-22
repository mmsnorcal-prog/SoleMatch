import { useState } from 'react'
import ProgressHeader from './components/ProgressHeader'
import SavedPanel from './components/SavedPanel'
import StepBudget from './components/StepBudget'
import StepPosition from './components/StepPosition'
import StepResult from './components/StepResult'
import StepSport from './components/StepSport'
import StepStyle from './components/StepStyle'
import { getSavedMatches, removeSavedMatch, saveMatch } from './savedMatches'
import type { BudgetOption, FootWidthOption, FrequencyOption, PositionOption, QuizInput, RecommendationResult, SavedMatch, Sport } from './types'

type ResultPhase = 'loading' | 'result' | 'error'

export default function App() {
  const [step, setStep] = useState(0)
  const [sport, setSport] = useState<Sport | null>(null)
  const [position, setPosition] = useState<PositionOption | null>(null)
  const [frequency, setFrequency] = useState<FrequencyOption | null>(null)
  const [footWidth, setFootWidth] = useState<FootWidthOption | null>(null)
  const [budget, setBudget] = useState<BudgetOption | null>(null)

  const [resultPhase, setResultPhase] = useState<ResultPhase>('loading')
  const [result, setResult] = useState<RecommendationResult | null>(null)
  const [saved, setSaved] = useState(false)

  const [savedMatches, setSavedMatches] = useState<SavedMatch[]>(() => getSavedMatches())
  const [panelOpen, setPanelOpen] = useState(false)

  const quizInput: QuizInput | null =
    sport && position && frequency && footWidth && budget
      ? {
          sport,
          positionId: position.id,
          positionLabel: position.label,
          positionDemand: position.demand,
          frequencyId: frequency.id,
          frequencyLabel: frequency.label,
          footWidthId: footWidth.id,
          footWidthLabel: footWidth.label,
          budgetId: budget.id,
          budgetLabel: budget.label,
        }
      : null

  async function runMatch(input: QuizInput, budgetRange: string) {
    setResultPhase('loading')
    setSaved(false)
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sport: input.sport,
          positionLabel: input.positionLabel,
          positionDemand: input.positionDemand,
          frequencyLabel: input.frequencyLabel,
          footWidthLabel: input.footWidthLabel,
          budgetLabel: input.budgetLabel,
          budgetRange,
        }),
      })
      if (!res.ok) throw new Error('bad response')
      const data: RecommendationResult = await res.json()
      setResult(data)
      setResultPhase('result')
    } catch {
      setResultPhase('error')
    }
  }

  function handleBudgetSelect(b: BudgetOption) {
    if (!sport || !position || !frequency || !footWidth) return
    setBudget(b)
    setStep(4)
    const input: QuizInput = {
      sport,
      positionId: position.id,
      positionLabel: position.label,
      positionDemand: position.demand,
      frequencyId: frequency.id,
      frequencyLabel: frequency.label,
      footWidthId: footWidth.id,
      footWidthLabel: footWidth.label,
      budgetId: b.id,
      budgetLabel: b.label,
    }
    runMatch(input, b.range)
  }

  function handleSave() {
    if (!result || !quizInput) return
    const saved = saveMatch(result, quizInput)
    setSavedMatches((prev) => [saved, ...prev])
    setSaved(true)
  }

  function handleRemove(id: string) {
    setSavedMatches(removeSavedMatch(id))
  }

  function handleRestart() {
    setStep(0)
    setSport(null)
    setPosition(null)
    setFrequency(null)
    setFootWidth(null)
    setBudget(null)
    setResult(null)
    setSaved(false)
  }

  function handleRetry() {
    if (quizInput && budget) runMatch(quizInput, budget.range)
  }

  return (
    <div className="app-shell">
      <div className="grain-overlay" aria-hidden="true" />
      <ProgressHeader step={step} totalSteps={5} savedCount={savedMatches.length} onOpenSaved={() => setPanelOpen(true)} />

      <main className="app-main">
        {step === 0 && (
          <StepSport
            onSelect={(s) => {
              setSport(s)
              setStep(1)
            }}
          />
        )}

        {step === 1 && sport && (
          <StepPosition
            sport={sport}
            onSelect={(p) => {
              setPosition(p)
              setStep(2)
            }}
            onBack={() => setStep(0)}
          />
        )}

        {step === 2 && (
          <StepStyle
            onSelect={(f, w) => {
              setFrequency(f)
              setFootWidth(w)
              setStep(3)
            }}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && <StepBudget onSelect={handleBudgetSelect} onBack={() => setStep(2)} />}

        {step === 4 && quizInput && (
          <StepResult
            phase={resultPhase}
            input={quizInput}
            result={result}
            saved={saved}
            onSave={handleSave}
            onRestart={handleRestart}
            onRetry={handleRetry}
          />
        )}
      </main>

      <SavedPanel open={panelOpen} matches={savedMatches} onClose={() => setPanelOpen(false)} onRemove={handleRemove} />
    </div>
  )
}
