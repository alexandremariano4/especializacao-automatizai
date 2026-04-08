import { expect, test } from '../support/fixtures'
import { generateOrderCode } from '../support/helpers'
import { OrderDetails } from '../support/actions/orderLookupActions'

test.describe('Consulta de Pedido', () => {

    test.beforeEach(async ({ app }) => {
        await app.orderLookup.open()
    })

    test('deve consultar um pedido aprovado', async ({ app }) => {

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

        await app.orderLookup.searchOrder(order.number)

        await app.orderLookup.validateOrderDetails(order)
        await app.orderLookup.validateStatusBadge(order.status)

    })

    test('deve consultar um pedido reprovado', async ({ app }) => {

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

        await app.orderLookup.searchOrder(order.number)

        await app.orderLookup.validateOrderDetails(order)
        await app.orderLookup.validateStatusBadge(order.status)
    })

    test('deve consultar um pedido em analise', async ({ app }) => {

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
        expect(button).toBeDisabled()
        
        await app.orderLookup.elements.orderInput.fill('   ')
        expect(button).toBeDisabled()
    })
})
