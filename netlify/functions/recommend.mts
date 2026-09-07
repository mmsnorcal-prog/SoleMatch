import type { Config, Context } from '@netlify/functions'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

interface RequestBody {
  sport: 'volleyball' | 'basketball'
  positionLabel: string
  positionDemand: string
  frequencyLabel: string
  footWidthLabel: string
  budgetLabel: string
  budgetRange: string
}

const SYSTEM_PROMPT = `You are a veteran athletic footwear fitter who specializes in volleyball and basketball performance shoes. You recommend real, currently-available shoe models (actual brand and model names, e.g. "ASICS Sky Elite FF 3", "Nike Zoom Hyperspeed Court", "Mizuno Wave Momentum 3") that genuinely fit the player's sport, position, movement demands, and budget.

You always respond with strict JSON only — no markdown fences, no commentary before or after. The JSON must match this exact shape:
{
  "primary": {
    "name": string,       // model name only, no brand prefix
    "brand": string,
    "price": string,      // e.g. "$129.95", a realistic non-rounded street price within the requested budget tier
    "reasoning": string   // 2-3 sentences, written directly to the player, explaining WHY this shoe fits their specific position and play style — reference the movement demands given
  },
  "alternatives": [
    {
      "name": string,
      "brand": string,
      "price": string,
      "tradeoff": string  // 1 sentence on how this differs from the primary pick (a genuine trade-off, not filler)
    }
  ]
}

Provide exactly 2 alternatives, from different brands than the primary pick when reasonable. Keep the tone confident and specific — never generic ("great all-around shoe"), always tied to the player's actual inputs.`

function buildUserPrompt(body: RequestBody): string {
  return `Player profile:
- Sport: ${body.sport}
- Position: ${body.positionLabel} — movement demands: ${body.positionDemand}
- Play frequency: ${body.frequencyLabel}
- Foot width: ${body.footWidthLabel}
- Budget tier: ${body.budgetLabel} (${body.budgetRange})

Recommend the single best shoe for this player, plus two alternatives with real trade-offs.`
}

export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  let body: RequestBody
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!body.sport || !body.positionLabel || !body.budgetLabel) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: buildUserPrompt(body) }],
    })

    const textBlock = message.content.find((block) => block.type === 'text')
    if (!textBlock || textBlock.type !== 'text') {
      return Response.json({ error: 'No response from model' }, { status: 502 })
    }

    const raw = textBlock.text.trim().replace(/^```(json)?/i, '').replace(/```$/, '').trim()
    const parsed = JSON.parse(raw)

    if (!parsed.primary || !Array.isArray(parsed.alternatives)) {
      throw new Error('Malformed recommendation shape')
    }

    return Response.json(parsed)
  } catch (error) {
    console.error('recommend function error:', error)
    return Response.json({ error: 'Could not generate a recommendation right now' }, { status: 502 })
  }
}

export const config: Config = {
  path: '/api/recommend',
  method: 'POST',
}
