import type { Sport } from '../types'

interface Props {
  onSelect: (sport: Sport) => void
}

export default function StepSport({ onSelect }: Props) {
  return (
    <section className="step step-sport">
      <p className="step-kicker">Step 1 of 4</p>
      <h1 className="step-title">
        What do you
        <br />
        play?
      </h1>
      <p className="step-copy">Every recommendation starts with your sport — jump mechanics and lateral demands differ a lot between the two.</p>

      <div className="sport-grid">
        <button type="button" className="sport-card sport-card-volleyball" onClick={() => onSelect('volleyball')}>
          <span className="sport-card-label">Volleyball</span>
          <span className="sport-card-hint">Jump &amp; land, back-row defense</span>
        </button>
        <button type="button" className="sport-card sport-card-basketball" onClick={() => onSelect('basketball')}>
          <span className="sport-card-label">Basketball</span>
          <span className="sport-card-hint">Cuts, crossovers, box-outs</span>
        </button>
      </div>
    </section>
  )
}
