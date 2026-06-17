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

        async fillEntryValue(value: number) {
            await page.getByTestId('input-entry-value').fill(String(value))
        },

        async acceptTerms() {
            await terms.check()
        },

        async submit() {
            await page.getByRole('button', { name: 'Confirmar Pedido' }).click()
        },

        async mockCreditScore(score: number) {
            await page.route('**/functions/v1/credit-analysis', async route => {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({ status: 'Done', score }),
                })
            })
        },

        async submitCheckout(opts: {
            customer: { name: string; lastname: string; email: string; phone: string; document: string }
            store: string
            paymentMethod: string
            downPayment?: number
        }) {
            await page.getByTestId('checkout-name').fill(opts.customer.name)
            await page.getByTestId('checkout-surname').fill(opts.customer.lastname)
            await page.getByTestId('checkout-email').fill(opts.customer.email)
            await page.getByTestId('checkout-phone').fill(opts.customer.phone)
            await page.getByTestId('checkout-cpf').fill(opts.customer.document)
            await page.getByTestId('checkout-store').click()
            await page.getByRole('option', { name: opts.store }).click()
            await page.getByRole('button', { name: new RegExp(opts.paymentMethod, 'i') }).click()
            if (opts.downPayment !== undefined) {
                await page.getByTestId('input-entry-value').fill(String(opts.downPayment))
            }
            await terms.check()
            await page.getByRole('button', { name: 'Confirmar Pedido' }).click()
        },
    }
}