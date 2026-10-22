import { useState } from 'react'
import { FOOT_WIDTHS, FREQUENCIES } from '../data/quizData'
import type { FootWidthOption, FrequencyOption } from '../types'
import OptionCard from './OptionCard'

interface Props {
  onSelect: (frequency: FrequencyOption, footWidth: FootWidthOption) => void
  onBack: () => void
}

export default function StepStyle({ onSelect, onBack }: Props) {
  const [frequency, setFrequency] = useState<FrequencyOption | null>(null)
  const [footWidth, setFootWidth] = useState<FootWidthOption | null>(null)

  return (
    <section className="step step-style">
      <button type="button" className="back-link" onClick={onBack}>
        ← Back
      </button>
      <p className="step-kicker">Step 3 of 4</p>
      <h1 className="step-title">How do you play?</h1>
      <p className="step-copy">How often and how hard you play affects how much cushioning and durability you actually need.</p>

      <h2 className="step-subhead">Play frequency</h2>
      <div className="style-grid">
        {FREQUENCIES.map((f) => (
          <OptionCard
            key={f.id}
            label={f.label}
            sublabel={f.detail}
            badge={f.id === 'regular' ? 'Most Popular' : undefined}
            selected={frequency?.id === f.id}
            onSelect={() => setFrequency(f)}
          />
        ))}
      </div>

      <h2 className="step-subhead">Foot width (optional)</h2>
      <div className="width-grid">
        {FOOT_WIDTHS.map((w) => (
          <OptionCard key={w.id} label={w.label} selected={footWidth?.id === w.id} onSelect={() => setFootWidth(w)} />
        ))}
      </div>

      <button
        type="button"
        className="primary-btn"
        disabled={!frequency}
        onClick={() => frequency && onSelect(frequency, footWidth ?? FOOT_WIDTHS.find((w) => w.id === 'unsure')!)}
      >
        Continue
      </button>
    </section>
  )
}
