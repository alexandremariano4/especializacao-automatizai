import { test, expect } from '@playwright/test'
import { gerarOrderId } from '../support/helpers';

/// AAA - Arrange, Act, Assert
test.describe('Consulta de Pedidos', () => {

    test.beforeEach(async ({ page }) => {

        await page.goto('http://localhost:5173/')
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
        await page.getByRole('link', { name: 'Consultar Pedido' }).click()
        await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

    })

    test('deve consultar um pedido aprovado', async ({ page }) => {

        // const orderId = 'VLO-2GA8RB';
        
        const order = {
            number: 'VLO-2GA8RB',
            color: 'Glacier Blue',        
            wheels: 'aero Wheels',
            customer: {
                name: 'Alexandre Mariano',
                email: 'alexandre_mariano@hotmail.com.br'
            },
            payment: 'À Vista',
            status: 'APROVADO'
        }

        await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)
        await page.getByRole('button', { name: 'Buscar Pedido' }).click()

        // const orderCode =  await page.locator(`//p[text()="Pedido"]/..//p[text()="${orderId}"]`)
        // await expect(orderCode).toBeVisible({timeout: 10000})

        // const containerPedido = await page.getByRole('paragraph')
        //     .filter({ hasText: /^Pedido$/ }) // ^ Significa Começa com e $ Significa Termina com
        //     .locator('..')

        // await expect(containerPedido).toContainText(orderId, { timeout: 10000 })

        // await expect(page.getByText('APROVADO')).toBeVisible({ timeout: 10000 })

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
    - img
    - paragraph: Pedido
    - paragraph: ${order.number }
    - status:
      - img
      - text: ${order.status}
    - img "Velô Sprint"
    - paragraph: Modelo
    - paragraph: Velô Sprint
    - paragraph: Cor
    - paragraph: ${order.color}
    - paragraph: Interior
    - paragraph: cream
    - paragraph: Rodas
    - paragraph: ${order.wheels}    
    - heading "Dados do Cliente" [level=4]
    - paragraph: Nome
    - paragraph: ${order.customer.name}
    - paragraph: Email
    - paragraph: ${order.customer.email}
    - paragraph: Loja de Retirada
    - paragraph
    - paragraph: Data do Pedido
    - paragraph: /\\d+\\/\\d+\\/\\d+/
    - heading "Pagamento" [level=4]
    - paragraph: ${order.payment}
    - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);

    const statusBadge = page.getByRole('status').filter({ hasText: order.status })

    await expect(statusBadge).toHaveClass(/bg-green-100/)
    await expect(statusBadge).toHaveClass(/text-green-700/)

    const statusIcon = statusBadge.locator('svg')
    await expect(statusIcon).toHaveClass(/lucide-circle-check-big/)

    })

    test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

        const orderId = gerarOrderId();

        await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(orderId)
        await page.getByRole('button', { name: 'Buscar Pedido' }).click()

        const title = page.getByRole('heading', { name: 'Pedido não encontrado', level: 3 })
        const message = page.locator('p', { hasText: 'Verifique o número do pedido e tente novamente' })

        await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - img
    - heading "Pedido não encontrado" [level=3]
    - paragraph: Verifique o número do pedido e tente novamente
    `)
        await expect(title).toBeVisible()
        await expect(message).toBeVisible()


    })

    test('deve consultar um pedido reprovado', async ({ page }) => {

        // const orderId = 'VLO-JA3NLO';

        const order = {
            number: 'VLO-JA3NLO',
            color: 'Midnight Black',
            wheels: 'sport Wheels',
            customer: {
                name: 'Steve Jomba',
                email: 'jomba@apple.com'
            },
            payment: 'À Vista',
            status: 'REPROVADO'
        }


        await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)
        await page.getByRole('button', { name: 'Buscar Pedido' }).click()

        // const orderCode =  await page.locator(`//p[text()="Pedido"]/..//p[text()="${orderId}"]`)
        // await expect(orderCode).toBeVisible({timeout: 10000})

        // const containerPedido = await page.getByRole('paragraph')
        //     .filter({ hasText: /^Pedido$/ }) // ^ Significa Começa com e $ Significa Termina com
        //     .locator('..')

        // await expect(containerPedido).toContainText(orderId, { timeout: 10000 })

        // await expect(page.getByText('APROVADO')).toBeVisible({ timeout: 10000 })

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
    - img
    - paragraph: Pedido
    - paragraph: ${order.number }
    - status:
      - img
      - text: ${order.status}
    - img "Velô Sprint"
    - paragraph: Modelo
    - paragraph: Velô Sprint
    - paragraph: Cor
    - paragraph: ${order.color}
    - paragraph: Interior
    - paragraph: cream
    - paragraph: Rodas
    - paragraph: ${order.wheels}
    - heading "Dados do Cliente" [level=4]
    - paragraph: Nome
    - paragraph: ${order.customer.name}
    - paragraph: Email
    - paragraph: ${order.customer.email}
    - paragraph: Loja de Retirada
    - paragraph
    - paragraph: Data do Pedido
    - paragraph: /\\d+\\/\\d+\\/\\d+/
    - heading "Pagamento" [level=4]
    - paragraph: ${order.payment}
    - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);

    const statusBadge = page.getByRole('status').filter({ hasText: order.status })

    await expect(statusBadge).toHaveClass(/bg-red-100/)
    await expect(statusBadge).toHaveClass(/text-red-700/)

    const statusIcon = statusBadge.locator('svg')
    await expect(statusIcon).toHaveClass(/lucide-circle-x/)

    })

    test('deve consultar um pedido em análise', async ({ page }) => {

        // const orderId = 'VLO-JA3NLO';

        const order = {
            number: 'VLO-VD2JS7',
            color: 'Glacier Blue',
            wheels: 'aero Wheels',
            customer: {
                name: 'Joao Da Silva',
                email: 'joao@velo.dev'
            },
            payment: 'À Vista',
            status: 'EM_ANALISE'
        }


        await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number)
        await page.getByRole('button', { name: 'Buscar Pedido' }).click()

        // const orderCode =  await page.locator(`//p[text()="Pedido"]/..//p[text()="${orderId}"]`)
        // await expect(orderCode).toBeVisible({timeout: 10000})

        // const containerPedido = await page.getByRole('paragraph')
        //     .filter({ hasText: /^Pedido$/ }) // ^ Significa Começa com e $ Significa Termina com
        //     .locator('..')

        // await expect(containerPedido).toContainText(orderId, { timeout: 10000 })

        // await expect(page.getByText('APROVADO')).toBeVisible({ timeout: 10000 })

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
    - img
    - paragraph: Pedido
    - paragraph: ${order.number }
    - status:
      - img
      - text: ${order.status}
    - img "Velô Sprint"
    - paragraph: Modelo
    - paragraph: Velô Sprint
    - paragraph: Cor
    - paragraph: ${order.color}
    - paragraph: Interior
    - paragraph: cream
    - paragraph: Rodas
    - paragraph: ${order.wheels}
    - heading "Dados do Cliente" [level=4]
    - paragraph: Nome
    - paragraph: ${order.customer.name}
    - paragraph: Email
    - paragraph: ${order.customer.email}
    - paragraph: Loja de Retirada
    - paragraph
    - paragraph: Data do Pedido
    - paragraph: /\\d+\\/\\d+\\/\\d+/
    - heading "Pagamento" [level=4]
    - paragraph: ${order.payment}
    - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);

    const statusBadge = page.getByRole('status').filter({ hasText: order.status })

    await expect(statusBadge).toHaveClass(/bg-amber-100/)
    await expect(statusBadge).toHaveClass(/text-amber-700/)

    const statusIcon = statusBadge.locator('svg')
    await expect(statusIcon).toHaveClass(/lucide-clock/)

    })
})
