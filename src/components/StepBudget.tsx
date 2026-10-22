import { BUDGETS } from '../data/quizData'
import type { BudgetOption } from '../types'
import OptionCard from './OptionCard'

interface Props {
  onSelect: (budget: BudgetOption) => void
  onBack: () => void
}

export default function StepBudget({ onSelect, onBack }: Props) {
  return (
    <section className="step step-budget">
      <button type="button" className="back-link" onClick={onBack}>
        ← Back
      </button>
      <p className="step-kicker">Step 4 of 4</p>
      <h1 className="step-title">What's your budget?</h1>
      <p className="step-copy">No typing needed — just pick the tier you're comfortable spending in.</p>

      <div className="budget-grid">
        {BUDGETS.map((b) => (
          <OptionCard
            key={b.id}
            label={b.label}
            sublabel={b.range}
            badge={b.id === 'mid' ? 'Most Popular' : undefined}
            selected={false}
            onSelect={() => onSelect(b)}
          />
        ))}
      </div>
    </section>
  )
}
