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

        const orderId = 'VLO-2GA8RT';

        await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(orderId)
        await page.getByRole('button', { name: 'Buscar Pedido' }).click()

        // const orderCode =  await page.locator(`//p[text()="Pedido"]/..//p[text()="${orderId}"]`)
        // await expect(orderCode).toBeVisible({timeout: 10000})

        const containerPedido = await page.getByRole('paragraph')
            .filter({ hasText: /^Pedido$/ }) // ^ Significa Começa com e $ Significa Termina com
            .locator('..')

        await expect(containerPedido).toContainText(orderId, { timeout: 10000 })

        await expect(page.getByText('APROVADO')).toBeVisible({ timeout: 10000 })


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
})
