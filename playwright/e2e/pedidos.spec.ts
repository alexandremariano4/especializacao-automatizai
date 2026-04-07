import { test } from '@playwright/test'

import { generateOrderCode } from '../support/helpers'

import { OrderLockupPage, OrderDetails } from '../support/pages/OrderLockupPage'
import { LandingPage } from '../support/pages/LandingPage'
import { HeaderComponent } from '../support/pages/components/HeaderComponent'

test.describe('Consulta de Pedido', () => {

    let orderLockupPage: OrderLockupPage

    test.beforeEach(async ({ page }) => {
        await new LandingPage(page).goto()

        await new HeaderComponent(page).goToOrderLookup()
    
        orderLockupPage = new OrderLockupPage(page)
        await orderLockupPage.isCurrentPage()
    })

    test('deve consultar um pedido aprovado', async ({ page }) => {

        const order: OrderDetails = {
                    number: 'VLO-2GA8RB',
                    status: 'APROVADO' as const,
                    color: 'Glacier Blue',
                    wheels: 'aero Wheels',
                    customer: {
                        name: 'Alexandre Mariano',
                        email: 'alexandre_mariano@hotmail.com.br'
                    },
                    payment: 'À Vista'
                }

        await orderLockupPage.searchOrder(order.number)

        await orderLockupPage.validateOrderDetails(order)
        await orderLockupPage.validateStatusBadge(order.status)

    })

    test('deve consultar um pedido reprovado', async ({ page }) => {

        const order: OrderDetails = {
                    number: 'VLO-JA3NLO',
                    status: 'REPROVADO' as const,
                    color: 'Midnight Black',
                    wheels: 'sport Wheels',
                    customer: {
                        name: 'Steve Jomba',
                        email: 'jomba@apple.com'
                    },
                    payment: 'À Vista'
                }

        await orderLockupPage.searchOrder(order.number)

        await orderLockupPage.validateOrderDetails(order)
        await orderLockupPage.validateStatusBadge(order.status)
    })

    test('deve consultar um pedido em analise', async ({ page }) => {

        const order: OrderDetails = {
                    number: 'VLO-VD2JS7',
                    status: 'EM_ANALISE' as const,
                    color: 'Glacier Blue',
                    wheels: 'aero Wheels',
                    customer: {
                        name: 'Joao Da Silva',
                        email: 'joao@velo.dev'
                    },
                    payment: 'À Vista'
                }

        await orderLockupPage.searchOrder(order.number)

        await orderLockupPage.validateOrderDetails(order)
        await orderLockupPage.validateStatusBadge(order.status)
    })

    test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

        const order = generateOrderCode()

        await orderLockupPage.searchOrder(order)
        await orderLockupPage.validateOrderNotFound()
    })

    test('deve exibir mensagem quando o código do pedido é fora do padrão', async ({ page }) => {

        await orderLockupPage.searchOrder('INVALIDO-123')
        await orderLockupPage.validateOrderNotFound()
    })
})