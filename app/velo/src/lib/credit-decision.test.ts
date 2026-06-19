import { describe, it, expect } from 'vitest'

import { evaluateCredit } from './credit-decision'

const total = 40000

describe('evaluateCredit', () => {
  describe('score alto (> 700)', () => {
    it('aprova quando o score e 701, sem entrada', () => {
      expect(evaluateCredit({ score: 701, totalPrice: total, entryValue: 0 })).toBe('APROVADO')
    })

    it('aprova quando o score e 999, sem entrada', () => {
      expect(evaluateCredit({ score: 999, totalPrice: total, entryValue: 0 })).toBe('APROVADO')
    })
  })

  describe('score medio (501 a 700)', () => {
    it('coloca em analise no limite inferior (501) sem entrada', () => {
      expect(evaluateCredit({ score: 501, totalPrice: total, entryValue: 0 })).toBe('EM_ANALISE')
    })

    it('coloca em analise no limite superior (700) sem entrada', () => {
      expect(evaluateCredit({ score: 700, totalPrice: total, entryValue: 0 })).toBe('EM_ANALISE')
    })

    it('coloca em analise no meio da faixa (600) sem entrada', () => {
      expect(evaluateCredit({ score: 600, totalPrice: total, entryValue: 0 })).toBe('EM_ANALISE')
    })
  })

  describe('score baixo (<= 500)', () => {
    it('reprova no limite (500) sem entrada', () => {
      expect(evaluateCredit({ score: 500, totalPrice: total, entryValue: 0 })).toBe('REPROVADO')
    })

    it('reprova com score zero', () => {
      expect(evaluateCredit({ score: 0, totalPrice: total, entryValue: 0 })).toBe('REPROVADO')
    })

    it('reprova com score baixo e entrada inferior a 50% (49%)', () => {
      expect(evaluateCredit({ score: 400, totalPrice: total, entryValue: 19600 })).toBe('REPROVADO')
    })
  })

  describe('excecao da entrada alta (>= 50% do total)', () => {
    it('aprova score baixo (400) quando entrada e exatamente 50%', () => {
      expect(evaluateCredit({ score: 400, totalPrice: total, entryValue: 20000 })).toBe('APROVADO')
    })

    it('aprova score medio (600) quando entrada e superior a 50%', () => {
      expect(evaluateCredit({ score: 600, totalPrice: total, entryValue: 25000 })).toBe('APROVADO')
    })

    it('a entrada alta nao afeta score > 700 (continua APROVADO)', () => {
      expect(evaluateCredit({ score: 750, totalPrice: total, entryValue: 25000 })).toBe('APROVADO')
    })
  })

  describe('casos defensivos', () => {
    it('trata totalPrice zero sem dividir por zero (reprova score baixo)', () => {
      expect(evaluateCredit({ score: 300, totalPrice: 0, entryValue: 0 })).toBe('REPROVADO')
    })
  })
})
