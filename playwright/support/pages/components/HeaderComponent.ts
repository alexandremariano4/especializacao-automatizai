import { Page } from '@playwright/test'

export class HeaderComponent {
    constructor(private page: Page) { }

    async goToOrderLookup() {
        await this.page.getByRole('link', { name: 'Consultar Pedido' }).click()
    }
}
