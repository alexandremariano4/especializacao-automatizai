import { test, expect } from '../support/fixtures/fixtures'

test.describe('Configuração do Veículo', () => {
    test.beforeEach(async ({ app }) => {
        await app.configurator.open()
    })

    test('deve atualizar a imagem e manter o preço base ao trocar a cor do veículo', async ({ app }) => {
        await app.configurator.expectPrice('R$ 40.000,00')

        await app.configurator.selectColor('Midnight Black')
        await app.configurator.expectPrice('R$ 40.000,00')
        await app.configurator.expectCarImageSrc('/src/assets/midnight-black-aero-wheels.png')
    })

    test('deve atualizar o preço e a imagem ao alterar as rodas, e restaurar os valores padrão', async ({ app }) => {
        await app.configurator.expectPrice('R$ 40.000,00')

        await app.configurator.selectWheels(/Sport Wheels/)
        await app.configurator.expectPrice('R$ 42.000,00')
        await app.configurator.expectCarImageSrc('/src/assets/glacier-blue-sport-wheels.png')

        await app.configurator.selectWheels(/Aero Wheels/)
        await app.configurator.expectPrice('R$ 40.000,00')
        await app.configurator.expectCarImageSrc('/src/assets/glacier-blue-aero-wheels.png')
    })

    // CT03 - Configuração do Veículo (Adição de Opcionais) e Cálculo de Preço
    test('deve refletir os opcionais no preço e persistir a configuração no checkout', async ({ page, app }) => {
        // Pré-condição: veículo sem opcionais selecionados (R$ 40.000,00)
        await app.configurator.expectPrice('R$ 40.000,00')

        // Passo 1: marcar "Precision Park" -> acrescenta R$ 5.500,00
        await app.configurator.checkOptional(/Precision Park/i)
        await app.configurator.expectPrice('R$ 45.500,00')

        // Passo 2: marcar "Flux Capacitor" -> acrescenta R$ 5.000,00
        await app.configurator.checkOptional(/Flux Capacitor/i)
        await app.configurator.expectPrice('R$ 50.500,00')

        // Passo 3: desmarcar ambos -> preço retorna ao valor base
        await app.configurator.uncheckOptional(/Precision Park/i)
        await app.configurator.uncheckOptional(/Flux Capacitor/i)
        await app.configurator.expectPrice('R$ 40.000,00')

        // Passo 4: "Monte o Seu" -> redireciona para /order com os valores persistidos
        await app.configurator.finishConfigurator()
        await expect(page).toHaveURL(/\/order/)
        await app.checkout.expectLoaded()
        await app.checkout.expectSummaryTotal('R$ 40.000,00')
    })
})