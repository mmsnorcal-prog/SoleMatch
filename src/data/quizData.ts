import type { BudgetOption, FootWidthOption, FrequencyOption, PositionOption, Sport } from '../types'

export const POSITIONS: Record<Sport, PositionOption[]> = {
  volleyball: [
    {
      id: 'outside-hitter',
      label: 'Outside Hitter',
      demand: 'high jump frequency plus back-row lateral defense — needs all-around versatility',
    },
    {
      id: 'opposite',
      label: 'Opposite',
      demand: 'powerful attacking jumps with quick transition footwork after serving',
    },
    {
      id: 'middle-blocker',
      label: 'Middle Blocker',
      demand: 'explosive repeated vertical jumps with fast lateral shuffles to close blocks',
    },
    {
      id: 'libero',
      label: 'Libero',
      demand: 'rapid multidirectional floor coverage and low digs, with minimal jumping',
    },
    {
      id: 'setter',
      label: 'Setter',
      demand: 'quick short bursts and precise footwork under the net, moderate jumping',
    },
    {
      id: 'defensive-specialist',
      label: 'Defensive Specialist',
      demand: 'quick-reaction lateral movement and floor coverage, minimal jumping',
    },
  ],
  basketball: [
    {
      id: 'point-guard',
      label: 'Point Guard',
      demand: 'fast multidirectional cuts and constant crossovers — needs ankle support and quickness',
    },
    {
      id: 'shooting-guard',
      label: 'Shooting Guard',
      demand: 'perimeter quickness with stable catch-and-shoot footwork',
    },
    {
      id: 'small-forward',
      label: 'Small Forward',
      demand: 'versatile transition speed with moderate jumping for rebounds and drives',
    },
    {
      id: 'power-forward',
      label: 'Power Forward',
      demand: 'frequent interior jumping and physical contact — needs stability and cushioning',
    },
    {
      id: 'center',
      label: 'Center',
      demand: 'heavy interior contact with repeated hard landings — needs maximum cushioning',
    },
  ],
}

export const FREQUENCIES: FrequencyOption[] = [
  { id: 'casual', label: 'Casual', detail: 'A few times a month, for fun' },
  { id: 'regular', label: 'Regular', detail: 'Weekly practice or pickup games' },
  { id: 'competitive', label: 'Competitive', detail: 'League or team, multiple times a week' },
]

export const FOOT_WIDTHS: FootWidthOption[] = [
  { id: 'narrow', label: 'Narrow' },
  { id: 'regular', label: 'Regular' },
  { id: 'wide', label: 'Wide' },
  { id: 'unsure', label: "Not sure" },
]

export const BUDGETS: BudgetOption[] = [
  { id: 'value', label: 'Value', range: 'Under $80' },
  { id: 'mid', label: 'Mid-Range', range: '$80 – $130' },
  { id: 'premium', label: 'Premium', range: '$130+' },
]
