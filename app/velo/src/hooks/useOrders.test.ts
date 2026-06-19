import { describe, it, expect, vi } from 'vitest'

// O modulo useOrders instancia o client Supabase no carregamento.
// Para testes unitarios isolamos o client com um stub vazio.
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {},
}))

import { dbOrderToOrder, type DbOrder } from './useOrders'

const baseDbOrder: DbOrder = {
  id: 'uuid-1',
  order_number: 'VLO-ABC123',
  color: 'glacier-blue',
  wheel_type: 'aero',
  optionals: ['precision-park'],
  customer_name: 'Alexandre Mariano',
  customer_email: 'alexandre@velo.dev',
  customer_phone: '(11) 99999-9999',
  customer_cpf: '00000014199',
  payment_method: 'avista',
  total_price: 45500,
  status: 'APROVADO',
  created_at: '2026-01-15T10:00:00.000Z',
  updated_at: '2026-01-15T10:00:00.000Z',
}

describe('dbOrderToOrder', () => {
  it('mapeia campos basicos do DB para o modelo de dominio', () => {
    const order = dbOrderToOrder(baseDbOrder)
    expect(order.id).toBe('VLO-ABC123')
    expect(order.totalPrice).toBe(45500)
    expect(order.status).toBe('APROVADO')
    expect(order.paymentMethod).toBe('avista')
    expect(order.createdAt).toBe('2026-01-15T10:00:00.000Z')
  })

  it('divide o customer_name em name (primeiro) e surname (restante)', () => {
    const order = dbOrderToOrder({ ...baseDbOrder, customer_name: 'Alexandre Mariano da Silva' })
    expect(order.customer.name).toBe('Alexandre')
    expect(order.customer.surname).toBe('Mariano da Silva')
  })

  it('retorna surname vazio quando o nome tem uma unica palavra', () => {
    const order = dbOrderToOrder({ ...baseDbOrder, customer_name: 'Madonna' })
    expect(order.customer.name).toBe('Madonna')
    expect(order.customer.surname).toBe('')
  })

  it('preserva email, phone e cpf do cliente', () => {
    const order = dbOrderToOrder(baseDbOrder)
    expect(order.customer.email).toBe('alexandre@velo.dev')
    expect(order.customer.phone).toBe('(11) 99999-9999')
    expect(order.customer.cpf).toBe('00000014199')
  })

  it('mapeia a configuracao do carro (cor, rodas, opcionais)', () => {
    const order = dbOrderToOrder(baseDbOrder)
    expect(order.configuration.exteriorColor).toBe('glacier-blue')
    expect(order.configuration.wheelType).toBe('aero')
    expect(order.configuration.optionals).toEqual(['precision-park'])
  })

  it('trata optionals nulo como lista vazia', () => {
    const order = dbOrderToOrder({ ...baseDbOrder, optionals: null })
    expect(order.configuration.optionals).toEqual([])
  })

  it('converte total_price string em number (defensivo)', () => {
    const order = dbOrderToOrder({ ...baseDbOrder, total_price: '40000' as unknown as number })
    expect(order.totalPrice).toBe(40000)
    expect(typeof order.totalPrice).toBe('number')
  })

  it('preserva status EM_ANALISE e REPROVADO', () => {
    expect(dbOrderToOrder({ ...baseDbOrder, status: 'EM_ANALISE' }).status).toBe('EM_ANALISE')
    expect(dbOrderToOrder({ ...baseDbOrder, status: 'REPROVADO' }).status).toBe('REPROVADO')
  })
})
