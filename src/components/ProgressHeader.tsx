interface Props {
  step: number
  totalSteps: number
  savedCount: number
  onOpenSaved: () => void
}

const STEP_LABELS = ['Sport', 'Position', 'Style', 'Budget', 'Match']

export default function ProgressHeader({ step, totalSteps, savedCount, onOpenSaved }: Props) {
  return (
    <header className="app-header">
      <div className="brand">
        <svg viewBox="0 0 64 64" className="brand-mark" aria-hidden="true">
          <path
            d="M14 40c0-4 3-6 7-8l9-4.5c3-1.5 4.5-3.5 4.5-6.5 0-2-1-3.5-1-3.5s5 .5 8 4c2.4 2.8 2.5 6 2.5 8.5 0 6-4 9-4 9h10.5c1.4 0 2.5 1.1 2.5 2.5v2c0 1.4-1.1 2.5-2.5 2.5H16.5C15.1 46.5 14 45.4 14 44v-4z"
            fill="var(--blue)"
          />
          <path d="M31 24.5c1.6 1.6 2 3.6 1.6 5.6" stroke="var(--mint)" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
        <span className="brand-name">SoleMatch</span>
      </div>

      {step < totalSteps - 1 ? (
        <div className="progress-track" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={totalSteps}>
          {STEP_LABELS.slice(0, totalSteps).map((label, i) => (
            <div key={label} className={`progress-seg ${i <= step ? 'is-filled' : ''}`}>
              <span className="progress-seg-label">{label}</span>
            </div>
          ))}
        </div>
      ) : (
        <span className="progress-done-label">Your Match</span>
      )}

      <button type="button" className="saved-pill" onClick={onOpenSaved}>
        Saved {savedCount > 0 && <span className="saved-count">{savedCount}</span>}
      </button>
    </header>
  )
}
