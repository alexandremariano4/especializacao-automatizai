import { Page, expect } from '@playwright/test'

export function createCheckoutActions(page: Page) {

    const terms = page.getByTestId('checkout-terms')

    const getFieldError = (testId: string) =>
        page
            .getByTestId(testId)
            .locator('xpath=ancestor::div[contains(@class,"space-y-2")][1]//p[contains(@class,"text-destructive")]')

    const alerts = {
        name: getFieldError('checkout-name'),
        lastname: getFieldError('checkout-surname'),
        email: getFieldError('checkout-email'),
        phone: getFieldError('checkout-phone'),
        document: getFieldError('checkout-cpf'),
        store: getFieldError('checkout-store'),
        terms: terms.locator('xpath=ancestor::section[1]//p[contains(@class,"text-destructive")]')
    }


    return {

        elements: {
            terms,
            alerts
        },

        async expectLoaded() {
            await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible()
        },

        async expectSummaryTotal(price: string) {
            await expect(page.getByTestId('summary-total-price')).toHaveText(price)
        },

        async fillCustomerlData(data: {
            name: string
            lastname: string
            email: string
            phone: string
            document: string
        }) {
            await page.getByTestId('checkout-name').fill(data.name)
            await page.getByTestId('checkout-surname').fill(data.lastname)
            await page.getByTestId('checkout-email').fill(data.email)
            await page.getByTestId('checkout-phone').fill(data.phone)
            await page.getByTestId('checkout-cpf').fill(data.document)
        },

        async selectStore(storeName: string) {
            await page.getByTestId('checkout-store').click()
            await page.getByRole('option', { name: storeName }).click()
        },

        async selectPaymentMethod(method: string) {
            await page.getByRole('button', { name: new RegExp(method, 'i') }).click()
        },

        async acceptTerms() {
            await terms.check()
        },

        async submit() {
            await page.getByRole('button', { name: 'Confirmar Pedido' }).click()
        },
    }
}