import type { SavedMatch, RecommendationResult, QuizInput } from './types'

const STORAGE_KEY = 'solematch:saved-matches'

export function getSavedMatches(): SavedMatch[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveMatch(result: RecommendationResult, input: QuizInput): SavedMatch {
  const match: SavedMatch = {
    ...result,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    savedAt: new Date().toISOString(),
    input,
  }
  const existing = getSavedMatches()
  localStorage.setItem(STORAGE_KEY, JSON.stringify([match, ...existing]))
  return match
}

export function removeSavedMatch(id: string): SavedMatch[] {
  const remaining = getSavedMatches().filter((m) => m.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(remaining))
  return remaining
}
