import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  //Tempo máximo para cada teste (30 segundo é o padrão)
  timeout: 30_000, 

  // Tempo máximo para assertions (toBeVisible(), toHaveText()) 5 segundos 
  expect: {
    timeout: 5_000, /*
    Não vale a pena aumentar porque o teste pode ficar lento 
    no tempo de execução, vale a pena usar o timeout explícito em cada comnado 
    de expect quando necessário
    */
  },

  testDir: './playwright/e2e',  
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],
  
  use: {
    trace: 'retain-on-failure', // on / off / retain-on-failure / on-first-retry
    headless: true,
    baseURL: process.env.BASE_URL || 'http://localhost:5173/',
    // Tempo máximo para cada ação (click(), fill())
    // Quando o valor é 0, herda o limite do timeout geral do teste
    actionTimeout: 5_000, // Padrão é 0 (sem limite)

    // Tempo máximo para navegação (goto(), waitForURL())
    // Quando o valor é 0, herda o limite do timeout geral do teste
    navigationTimeout : 10_000 // Padrão é 0 (sem limite)
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],  
  // Sobe o Vite local apenas quando BASE_URL nao foi informada.
  // No CI o e2e roda contra a preview Vercel (BASE_URL setada), entao nao precisa de webServer.
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'npm run dev',
        cwd: './app/velo',
        url: 'http://localhost:5173/',
        reuseExistingServer: !process.env.CI,
      },
});
