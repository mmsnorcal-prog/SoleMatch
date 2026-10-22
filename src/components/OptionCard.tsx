interface Props {
  label: string
  sublabel?: string
  badge?: string
  selected: boolean
  onSelect: () => void
}

export default function OptionCard({ label, sublabel, badge, selected, onSelect }: Props) {
  return (
    <button type="button" className={`option-card ${selected ? 'is-selected' : ''}`} onClick={onSelect} aria-pressed={selected}>
      {badge && <span className="option-badge">{badge}</span>}
      <span className="option-label">{label}</span>
      {sublabel && <span className="option-sublabel">{sublabel}</span>}
    </button>
  )
}
