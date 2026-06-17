import { test, expect } from '../support/fixtures/fixtures'

import { deleteOrderByEmail, getOrderByEmail } from '../support/database/orderRepository'

test.describe('Checkout', () => {



    test.describe('Validações de campos obrigatórios', () => {

        let alerts: any

        test.beforeEach(async ({ page, app }) => {
            await page.goto('/order')
            await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible()

            alerts = app.checkout.elements.alerts
        })


        test('deve validar obrigatoriedade de todos os campos em branco', async ({ app }) => {
            // Act
            await app.checkout.submit()

            // Assert
            await expect(alerts.name).toHaveText('Nome deve ter pelo menos 2 caracteres')
            await expect(alerts.lastname).toHaveText('Sobrenome deve ter pelo menos 2 caracteres')
            await expect(alerts.email).toHaveText('Email inválido')
            await expect(alerts.phone).toHaveText('Telefone inválido')
            await expect(alerts.document).toHaveText('CPF inválido')
            await expect(alerts.store).toHaveText('Selecione uma loja')
            await expect(alerts.terms).toHaveText('Aceite os termos')
        })

        test('deve validar limite mínimo de caracteres para Nome e Sobrenome', async ({ app }) => {

            const customer = {
                name: 'A',
                lastname: 'B',
                email: 'papito@teste.com',
                document: '00000014141',
                phone: '(11) 99999-9999'
            }

            // Arrange
            await app.checkout.fillCustomerlData(customer)
            await app.checkout.selectStore('Velô Paulista')
            await app.checkout.acceptTerms()

            // Act
            await app.checkout.submit()

            // Assert
            await expect(alerts.name).toHaveText('Nome deve ter pelo menos 2 caracteres')
            await expect(alerts.lastname).toHaveText('Sobrenome deve ter pelo menos 2 caracteres')
        })

        test('deve exibir erro para e-mail com formato inválido', async ({ page, app }) => {
            const customer = {
                name: 'Fernando',
                lastname: 'Papito',
                email: 'papito@.com',
                document: '00000014141',
                phone: '(11) 99999-9999'
            }

            // Arrange
            await app.checkout.fillCustomerlData(customer)
            await app.checkout.selectStore('Velô Paulista')
            await app.checkout.acceptTerms()

            // Act
            await app.checkout.submit()

            // Assert
            await expect(page).toHaveURL(/\/order/)
        })

        test('deve exibir erro para CPF inválido', async ({ app }) => {

            const customer = {
                name: 'Fernando',
                lastname: 'Papito',
                email: 'papito@test.com',
                document: '',
                phone: '(11) 99999-9999'
            }

            // Arrange
            await app.checkout.fillCustomerlData(customer)
            await app.checkout.selectStore('Velô Paulista')
            await app.checkout.acceptTerms()

            // Act
            await app.checkout.submit()

            // Assert
            await expect(alerts.document).toHaveText('CPF inválido')
        })

        test('deve exigir o aceite dos termos ao finalizar com dados válidos', async ({ app }) => {

            const customer = {
                name: 'Fernando',
                lastname: 'Papito',
                email: 'papito@test.com',
                document: '00000014199',
                phone: '(11) 99999-9999'
            }

            // Arrange
            await app.checkout.fillCustomerlData(customer)
            await app.checkout.selectStore('Velô Paulista')

            await expect(app.checkout.elements.terms).not.toBeChecked()

            // Act
            await app.checkout.submit()

            // Assert
            await expect(alerts.terms).toHaveText('Aceite os termos')
        })
    })

    test.describe('Pagamento e Confirmação', () => {

        const basePrice = 'R$ 40.000,00'
        const store = 'Velô Paulista'

        test('deve criar um pedido com sucesso para pagamento à vista', async ({ app }) => {

            const customer = {
                name: 'Fernando',
                lastname: 'Papito',
                email: 'papito@teste.com',
                document: '05366127068',
                phone: '(11) 99999-9999',
            }

            await deleteOrderByEmail(customer.email)

            await app.configurator.openFromLanding()
            await app.configurator.expectPrice(basePrice)
            await app.configurator.finishConfigurator()
            await app.checkout.expectLoaded()

            await app.checkout.submitCheckout({ customer, store, paymentMethod: 'À Vista' })

            await app.success.expectApproved()
        })

        test('deve aprovar automaticamente o crédito quando o score do CPF for maior que 700 no financiamento', async ({ app }) => {

            const customer = {
                name: 'Steve',
                lastname: 'Woz',
                email: 'woz@velo.dev',
                document: '65493881047',
                phone: '(11) 99999-9999',
            }

            await deleteOrderByEmail(customer.email)
            await app.checkout.mockCreditScore(710)

            await app.configurator.openFromLanding()
            await app.configurator.expectPrice(basePrice)
            await app.configurator.finishConfigurator()
            await app.checkout.expectLoaded()

            await app.checkout.submitCheckout({ customer, store, paymentMethod: 'Financiamento' })

            await app.success.expectApproved()
        })

        test('deve registrar pedido com status EM_ANALISE quando o score do CPF for entre 501 e 700 no financiamento', async ({ app }) => {

            const customer = {
                name: 'Marty',
                lastname: 'McFly',
                email: 'marty@velo.dev',
                document: '76406710002',
                phone: '(11) 99999-9999',
            }

            await deleteOrderByEmail(customer.email)
            await app.checkout.mockCreditScore(600)

            await app.configurator.openFromLanding()
            await app.configurator.expectPrice(basePrice)
            await app.configurator.finishConfigurator()
            await app.checkout.expectLoaded()

            await app.checkout.submitCheckout({ customer, store, paymentMethod: 'Financiamento' })

            await app.success.expectRedirect()

            const persisted = await getOrderByEmail(customer.email)
            expect(persisted?.status).toBe('EM_ANALISE')
        })

        test('deve reprovar o pedido quando o score do CPF for menor ou igual a 500 no financiamento sem entrada', async ({ app }) => {

            const customer = {
                name: 'Biff',
                lastname: 'Tannen',
                email: 'biff@velo.dev',
                document: '96448185046',
                phone: '(11) 99999-9999',
            }

            await deleteOrderByEmail(customer.email)
            await app.checkout.mockCreditScore(400)

            await app.configurator.openFromLanding()
            await app.configurator.expectPrice(basePrice)
            await app.configurator.finishConfigurator()
            await app.checkout.expectLoaded()

            await app.checkout.submitCheckout({ customer, store, paymentMethod: 'Financiamento' })

            await app.success.expectRejected()

            const persisted = await getOrderByEmail(customer.email)
            expect(persisted?.status).toBe('REPROVADO')
        })

        test('deve reprovar o pedido quando o score do CPF for menor ou igual a 500 no financiamento com entrada menor que 50%', async ({ app }) => {

            const customer = {
                name: 'Doc',
                lastname: 'Brown',
                email: 'doc@velo.dev',
                document: '96768096087',
                phone: '(11) 99999-9999',
            }

            await deleteOrderByEmail(customer.email)
            await app.checkout.mockCreditScore(400)

            await app.configurator.openFromLanding()
            await app.configurator.expectPrice(basePrice)
            await app.configurator.finishConfigurator()
            await app.checkout.expectLoaded()

            await app.checkout.submitCheckout({ customer, store, paymentMethod: 'Financiamento', downPayment: 10000 })

            await app.success.expectRejected()

            const persisted = await getOrderByEmail(customer.email)
            expect(persisted?.status).toBe('REPROVADO')
        })

        test('deve aprovar o pedido quando o score do CPF for menor ou igual a 500 no financiamento com entrada igual a 50%', async ({ app }) => {

            const customer = {
                name: 'Diana',
                lastname: 'Prince',
                email: 'diana@velo.dev',
                document: '77352266089',
                phone: '(11) 99999-9999',
            }

            await deleteOrderByEmail(customer.email)
            await app.checkout.mockCreditScore(400)

            await app.configurator.openFromLanding()
            await app.configurator.expectPrice(basePrice)
            await app.configurator.finishConfigurator()
            await app.checkout.expectLoaded()

            await app.checkout.submitCheckout({ customer, store, paymentMethod: 'Financiamento', downPayment: 20000 })

            await app.success.expectApproved()

            const persisted = await getOrderByEmail(customer.email)
            expect(persisted?.status).toBe('APROVADO')
        })

        test('deve aprovar o pedido quando o score do CPF for menor ou igual a 500 no financiamento com entrada maior que 50%', async ({ app }) => {

            const customer = {
                name: 'Axel',
                lastname: 'Abrobos',
                email: 'axel@velo.dev',
                document: '00768617081',
                phone: '(11) 99999-9999',
            }

            await deleteOrderByEmail(customer.email)
            await app.checkout.mockCreditScore(400)

            await app.configurator.openFromLanding()
            await app.configurator.expectPrice(basePrice)
            await app.configurator.finishConfigurator()
            await app.checkout.expectLoaded()

            await app.checkout.submitCheckout({ customer, store, paymentMethod: 'Financiamento', downPayment: 21000 })

            await app.success.expectApproved()

            const persisted = await getOrderByEmail(customer.email)
            expect(persisted?.status).toBe('APROVADO')
        })
    })
})