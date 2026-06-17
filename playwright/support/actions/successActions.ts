import { Page, expect } from '@playwright/test'

export function createSuccessActions(page: Page) {
    return {
        async expectRedirect() {
            await expect(page).toHaveURL(/\/success/)
        },

        async expectApproved() {
            await expect(page).toHaveURL(/\/success/)
            await expect(page.getByRole('heading', { name: 'Pedido Aprovado!' })).toBeVisible()
        },

        async expectRejected() {
            await expect(page).toHaveURL(/\/success/)
            await expect(page.getByRole('heading', { name: 'Crédito Reprovado' })).toBeVisible()
        },
    }
}
