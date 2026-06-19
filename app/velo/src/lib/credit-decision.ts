export type OrderStatus = 'APROVADO' | 'REPROVADO' | 'EM_ANALISE'

export interface CreditDecisionInput {
  score: number
  totalPrice: number
  entryValue: number
}

// Regras de Decisao (ordem de avaliacao):
// 1. Entrada >= 50% do total e score < 700 -> APROVADO (excecao da entrada alta)
// 2. Score > 700 -> APROVADO
// 3. Score entre 501 e 700 -> EM_ANALISE
// 4. Score <= 500 -> REPROVADO
export function evaluateCredit(input: CreditDecisionInput): OrderStatus {
  const { score, totalPrice, entryValue } = input
  const entryPercentage = totalPrice > 0 ? entryValue / totalPrice : 0

  if (entryPercentage >= 0.5 && score < 700) return 'APROVADO'
  if (score > 700) return 'APROVADO'
  if (score >= 501 && score <= 700) return 'EM_ANALISE'
  return 'REPROVADO'
}
