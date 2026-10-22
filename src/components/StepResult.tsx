import type { QuizInput, RecommendationResult } from '../types'

interface Props {
  phase: 'loading' | 'result' | 'error'
  input: QuizInput
  result: RecommendationResult | null
  saved: boolean
  onSave: () => void
  onRestart: () => void
  onRetry: () => void
}

export default function StepResult({ phase, input, result, saved, onSave, onRestart, onRetry }: Props) {
  if (phase === 'loading') {
    return (
      <section className="step step-result">
        <p className="step-kicker">Matching...</p>
        <h1 className="step-title">Reading your play style</h1>
        <p className="step-copy loading-copy">
          Weighing {input.positionLabel.toLowerCase()} demands against your {input.budgetLabel.toLowerCase()} budget.
        </p>
        <div className="skeleton-card">
          <div className="skeleton-line skeleton-line-wide" />
          <div className="skeleton-line skeleton-line-mid" />
          <div className="skeleton-block" />
        </div>
      </section>
    )
  }

  if (phase === 'error' || !result) {
    return (
      <section className="step step-result">
        <p className="step-kicker">Hit a snag</p>
        <h1 className="step-title">Couldn't reach the match engine</h1>
        <p className="step-copy">The recommendation service didn't respond. Give it another try.</p>
        <button type="button" className="primary-btn" onClick={onRetry}>
          Try Again
        </button>
        <button type="button" className="ghost-btn" onClick={onRestart}>
          Start Over
        </button>
      </section>
    )
  }

  return (
    <section className="step step-result">
      <p className="step-kicker">
        {input.positionLabel} · {input.frequencyLabel} · {input.budgetLabel}
      </p>
      <h1 className="step-title">Your match</h1>

      <div className="primary-card">
        <span className="primary-card-tag">Best Fit</span>
        <h2 className="primary-shoe-name">{result.primary.name}</h2>
        <p className="primary-shoe-brand">{result.primary.brand}</p>
        <p className="primary-shoe-price">{result.primary.price}</p>

        <div className="reasoning-box">
          <span className="reasoning-label">Why this fits</span>
          <p>{result.primary.reasoning}</p>
        </div>

        <button type="button" className={`save-btn ${saved ? 'is-saved' : ''}`} onClick={onSave} disabled={saved}>
          {saved ? 'Saved to this device ✓' : 'Save This Match'}
        </button>
      </div>

      <h2 className="alt-heading">Compare alternatives</h2>
      <div className="alt-grid">
        {result.alternatives.map((alt, i) => (
          <div className="alt-card" key={`${alt.name}-${i}`}>
            <h3 className="alt-name">{alt.name}</h3>
            <p className="alt-brand">{alt.brand}</p>
            <p className="alt-price">{alt.price}</p>
            <p className="alt-tradeoff">{alt.tradeoff}</p>
          </div>
        ))}
      </div>

      <button type="button" className="ghost-btn restart-btn" onClick={onRestart}>
        Start Over
      </button>
    </section>
  )
}
