import type { SavedMatch } from '../types'

interface Props {
  open: boolean
  matches: SavedMatch[]
  onClose: () => void
  onRemove: (id: string) => void
}

export default function SavedPanel({ open, matches, onClose, onRemove }: Props) {
  if (!open) return null

  return (
    <div className="saved-overlay" onClick={onClose}>
      <div className="saved-panel" onClick={(e) => e.stopPropagation()}>
        <div className="saved-panel-header">
          <h2>Saved Matches</h2>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {matches.length === 0 ? (
          <p className="saved-empty">No matches saved yet. Finish a match and tap "Save This Match" to keep it here on this device.</p>
        ) : (
          <ul className="saved-list">
            {matches.map((m) => (
              <li key={m.id} className="saved-item">
                <div>
                  <p className="saved-item-name">{m.primary.name}</p>
                  <p className="saved-item-meta">
                    {m.primary.brand} · {m.primary.price} · {m.input.positionLabel}
                  </p>
                </div>
                <button type="button" className="saved-remove" onClick={() => onRemove(m.id)} aria-label="Remove">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
