export type Sport = 'volleyball' | 'basketball'

export interface PositionOption {
  id: string
  label: string
  demand: string
}

export interface FrequencyOption {
  id: string
  label: string
  detail: string
}

export interface FootWidthOption {
  id: string
  label: string
}

export interface BudgetOption {
  id: string
  label: string
  range: string
}

export interface QuizInput {
  sport: Sport
  positionId: string
  positionLabel: string
  positionDemand: string
  frequencyId: string
  frequencyLabel: string
  footWidthId: string
  footWidthLabel: string
  budgetId: string
  budgetLabel: string
}

export interface AlternativeShoe {
  name: string
  brand: string
  price: string
  tradeoff: string
}

export interface RecommendationResult {
  primary: {
    name: string
    brand: string
    price: string
    reasoning: string
  }
  alternatives: AlternativeShoe[]
}

export interface SavedMatch extends RecommendationResult {
  id: string
  savedAt: string
  input: QuizInput
}
