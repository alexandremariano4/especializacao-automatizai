import { Page, expect } from '@playwright/test'

export function createSuccessActions(page: Page) {
    return {
        async expectResult(status: string) {
            await expect(page).toHaveURL(/\/success/)
            await expect(page.getByRole('heading', { name: status })).toBeVisible()
        },
    }
}
