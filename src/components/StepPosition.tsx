import { POSITIONS } from '../data/quizData'
import type { PositionOption, Sport } from '../types'
import OptionCard from './OptionCard'

interface Props {
  sport: Sport
  onSelect: (position: PositionOption) => void
  onBack: () => void
}

export default function StepPosition({ sport, onSelect, onBack }: Props) {
  const positions = POSITIONS[sport]

  return (
    <section className="step step-position">
      <button type="button" className="back-link" onClick={onBack}>
        ← Back
      </button>
      <p className="step-kicker">Step 2 of 4</p>
      <h1 className="step-title">Where do you line up?</h1>
      <p className="step-copy">Position drives the movement pattern your shoe needs to handle most.</p>

      <div className="position-grid">
        {positions.map((pos) => (
          <OptionCard key={pos.id} label={pos.label} sublabel={pos.demand} selected={false} onSelect={() => onSelect(pos)} />
        ))}
      </div>
    </section>
  )
}
