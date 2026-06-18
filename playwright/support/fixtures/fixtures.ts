import { test as base } from '@playwright/test'

import { createCheckoutActions } from '../actions/checkoutActions'
import { createConfiguratorActions } from '../actions/configuratorActions'
import { createOrderLookupActions, OrderDetails } from '../actions/orderLookupActions'
import { createSuccessActions } from '../actions/successActions'
import { insertOrder, deleteOrderByNumber } from '../database/orderRepository'
import { createMockApi } from '../mock.api'
import {createHeroActions} from '../actions/heroActions'

type App = {
  checkout: ReturnType<typeof createCheckoutActions>
  configurator: ReturnType<typeof createConfiguratorActions>
  orderLookup: ReturnType<typeof createOrderLookupActions>
  hero: ReturnType<typeof createHeroActions>
  success: ReturnType<typeof createSuccessActions>
  mock: {
        creditAnalysis: (score: number) => Promise<void>
      }
}

type SeedOrder = (order: OrderDetails) => Promise<OrderDetails>

export const test = base.extend<{ app: App; seedOrder: SeedOrder }>({
  app: async ({ page }, use) => {
    const app: App = {
      checkout: createCheckoutActions(page),
      configurator: createConfiguratorActions(page),
      orderLookup: createOrderLookupActions(page),
      success: createSuccessActions(page),
      mock: {
        creditAnalysis: async (score: number) => await createMockApi(page, score),
      },
      hero: createHeroActions(page)
    }
    await use(app)
  },

  // Limpa estado anterior e insere o pedido no inicio do teste.
  // NAO remove no teardown: em caso de falha, o registro persiste no banco
  // para inspecao. A proxima execucao limpa via pre-delete deste mesmo fixture.
  seedOrder: async ({}, use) => {
    const seed: SeedOrder = async (order) => {
      await deleteOrderByNumber(order.number)
      await insertOrder(order)
      return order
    }

    await use(seed)
  },
})

export { expect } from '@playwright/test'