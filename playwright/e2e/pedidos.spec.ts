import { expect, test } from '../support/fixtures/fixtures'
import { generateOrderCode } from '../support/fixtures/helpers'
import { orders } from '../support/fixtures/orders'

test.describe('Consulta de Pedido', () => {

    test.beforeEach(async ({ app }) => {
        await app.orderLookup.open()
    })

    test('deve consultar um pedido aprovado', async ({ app, seedOrder }) => {

        const order = orders.aprovado

        await seedOrder(order)

        await app.orderLookup.searchOrder(order.number)

        await app.orderLookup.validateOrderDetails(order)
        await app.orderLookup.validateStatusBadge(order.status)

    })

    test('deve consultar um pedido reprovado', async ({ app, seedOrder }) => {

        const order = orders.reprovado

        await seedOrder(order)

        await app.orderLookup.searchOrder(order.number)

        await app.orderLookup.validateOrderDetails(order)
        await app.orderLookup.validateStatusBadge(order.status)
    })

    test('deve consultar um pedido em analise', async ({ app, seedOrder }) => {

        const order = orders.emAnalise

        await seedOrder(order)

        await app.orderLookup.searchOrder(order.number)

        await app.orderLookup.validateOrderDetails(order)
        await app.orderLookup.validateStatusBadge(order.status)
    })

    test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {

        const order = generateOrderCode()

        await app.orderLookup.searchOrder(order)
        await app.orderLookup.validateOrderNotFound()
    })

    test('deve exibir mensagem quando o código do pedido é fora do padrão', async ({ app }) => {

        await app.orderLookup.searchOrder('INVALIDO-123')
        await app.orderLookup.validateOrderNotFound()
    })

    test('deve manter o botão de busca desabilitado quando o campo vazio ou apenas espaços', async ({ app }) => {

        const button = app.orderLookup.elements.searchButton
        await expect(button).toBeDisabled()

        await app.orderLookup.elements.orderInput.fill('   ')
        await expect(button).toBeDisabled()
    })
})
