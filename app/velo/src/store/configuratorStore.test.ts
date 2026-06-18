import { describe, it, expect, beforeEach } from 'vitest'

import {
  calculateTotalPrice,
  calculateInstallment,
  formatPrice,
  useConfiguratorStore,
  type CarConfiguration,
  type Order,
} from './configuratorStore'

const baseConfig: CarConfiguration = {
  exteriorColor: 'glacier-blue',
  interiorColor: 'carbon-black',
  wheelType: 'aero',
  optionals: [],
}

describe('calculateTotalPrice', () => {
  it('retorna o preco base (R$ 40.000) sem opcionais e com rodas aero', () => {
    expect(calculateTotalPrice(baseConfig)).toBe(40000)
  })

  it('soma R$ 2.000 quando o tipo de roda e sport', () => {
    expect(calculateTotalPrice({ ...baseConfig, wheelType: 'sport' })).toBe(42000)
  })

  it('soma R$ 5.500 quando inclui o opcional Precision Park', () => {
    expect(calculateTotalPrice({ ...baseConfig, optionals: ['precision-park'] })).toBe(45500)
  })

  it('soma R$ 5.000 quando inclui o opcional Flux Capacitor', () => {
    expect(calculateTotalPrice({ ...baseConfig, optionals: ['flux-capacitor'] })).toBe(45000)
  })

  it('soma todos os opcionais e sport wheels combinados', () => {
    expect(
      calculateTotalPrice({
        ...baseConfig,
        wheelType: 'sport',
        optionals: ['precision-park', 'flux-capacitor'],
      })
    ).toBe(52500)
  })

  it('retorna o preco base quando optionals e undefined (defensivo)', () => {
    const config = { ...baseConfig, optionals: undefined as unknown as CarConfiguration['optionals'] }
    expect(calculateTotalPrice(config)).toBe(40000)
  })
})

describe('calculateInstallment', () => {
  it('calcula a parcela com juros compostos 2% am em 12x para R$ 40.000', () => {
    expect(calculateInstallment(40000)).toBeCloseTo(3782.38, 2)
  })

  it('retorna 0 quando o total e 0', () => {
    expect(calculateInstallment(0)).toBe(0)
  })
})

describe('formatPrice', () => {
  it('formata 40000 como moeda brasileira', () => {
    expect(formatPrice(40000)).toMatch(/R\$\s*40\.000,00/)
  })

  it('formata 0 como R$ 0,00', () => {
    expect(formatPrice(0)).toMatch(/R\$\s*0,00/)
  })
})

describe('useConfiguratorStore', () => {
  const initialState = useConfiguratorStore.getState()

  beforeEach(() => {
    useConfiguratorStore.setState(
      {
        ...initialState,
        configuration: { ...baseConfig },
        orders: [],
        currentUserEmail: null,
        viewMode: 'exterior',
      },
      false
    )
  })

  it('atualiza a cor exterior e ajusta o viewMode para exterior', () => {
    useConfiguratorStore.getState().setExteriorColor('midnight-black')
    const state = useConfiguratorStore.getState()
    expect(state.configuration.exteriorColor).toBe('midnight-black')
    expect(state.viewMode).toBe('exterior')
  })

  it('atualiza o tipo de roda', () => {
    useConfiguratorStore.getState().setWheelType('sport')
    expect(useConfiguratorStore.getState().configuration.wheelType).toBe('sport')
  })

  it('toggleOptional adiciona um opcional quando ele nao esta presente', () => {
    useConfiguratorStore.getState().toggleOptional('precision-park')
    expect(useConfiguratorStore.getState().configuration.optionals).toContain('precision-park')
  })

  it('toggleOptional remove um opcional quando ele ja esta presente', () => {
    useConfiguratorStore.getState().toggleOptional('precision-park')
    useConfiguratorStore.getState().toggleOptional('precision-park')
    expect(useConfiguratorStore.getState().configuration.optionals).not.toContain('precision-park')
  })

  it('addOrder adiciona um pedido na lista de orders', () => {
    const order: Order = {
      id: 'VLO-TEST01',
      configuration: baseConfig,
      totalPrice: 40000,
      customer: {
        name: 'Marty',
        surname: 'McFly',
        email: 'marty@velo.dev',
        phone: '(11) 99999-9999',
        cpf: '00000014199',
        store: 'Velô Paulista',
      },
      paymentMethod: 'avista',
      status: 'APROVADO',
      createdAt: '2026-01-01T00:00:00.000Z',
    }
    useConfiguratorStore.getState().addOrder(order)
    expect(useConfiguratorStore.getState().orders).toHaveLength(1)
    expect(useConfiguratorStore.getState().orders[0].id).toBe('VLO-TEST01')
  })

  it('login retorna true e seta currentUserEmail quando existe pedido com o email', () => {
    const order: Order = {
      id: 'VLO-TEST02',
      configuration: baseConfig,
      totalPrice: 40000,
      customer: {
        name: 'Doc',
        surname: 'Brown',
        email: 'doc@velo.dev',
        phone: '',
        cpf: '',
        store: '',
      },
      paymentMethod: 'avista',
      status: 'APROVADO',
      createdAt: '2026-01-01T00:00:00.000Z',
    }
    useConfiguratorStore.getState().addOrder(order)

    const result = useConfiguratorStore.getState().login('doc@velo.dev')

    expect(result).toBe(true)
    expect(useConfiguratorStore.getState().currentUserEmail).toBe('doc@velo.dev')
  })

  it('login retorna false e nao seta currentUserEmail quando nao existe pedido com o email', () => {
    const result = useConfiguratorStore.getState().login('inexistente@velo.dev')

    expect(result).toBe(false)
    expect(useConfiguratorStore.getState().currentUserEmail).toBeNull()
  })

  it('logout limpa o currentUserEmail', () => {
    useConfiguratorStore.setState({ currentUserEmail: 'doc@velo.dev' })
    useConfiguratorStore.getState().logout()
    expect(useConfiguratorStore.getState().currentUserEmail).toBeNull()
  })

  it('resetConfiguration restaura a configuracao padrao', () => {
    useConfiguratorStore.getState().setExteriorColor('lunar-white')
    useConfiguratorStore.getState().setWheelType('sport')
    useConfiguratorStore.getState().toggleOptional('flux-capacitor')

    useConfiguratorStore.getState().resetConfiguration()

    const config = useConfiguratorStore.getState().configuration
    expect(config.exteriorColor).toBe('glacier-blue')
    expect(config.wheelType).toBe('aero')
    expect(config.optionals).toEqual([])
  })
})
