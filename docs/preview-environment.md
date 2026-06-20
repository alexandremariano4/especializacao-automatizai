# Ambiente de Preview com Banco Isolado

Este documento descreve a separação dos ambientes `preview` e `production`
adotada no projeto.

## Contexto

Variáveis com prefixo `VITE_*` são **embutidas no bundle** em tempo de build.
Trocar `VITE_SUPABASE_*` em runtime não é possível — o valor já foi compilado
para dentro do JavaScript final. Por isso a separação preview/produção precisa
acontecer antes do `vite build`, garantindo que cada build carregue o
Supabase certo.

## Arquitetura

```
┌──────────────────────────────────────────────────────────────────┐
│ Pipeline cd.yml                                                  │
│                                                                  │
│  unit-tests  ─►  build-and-deploy  ─►  e2e-tests  ─►  promote    │
│                  (preview)             (preview)      (rebuild)  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                          │                              │
                          ▼                              ▼
                Vercel env Preview              Vercel env Production
                          │                              │
                          ▼                              ▼
              Supabase AutomatizAI Preview    Supabase AutomatizAI
              (vhwhxhnjqhxwrrnbwphy)          (wuwyhbthwsjdhvpwnfib)
```

### Projetos Supabase

| Ambiente   | Projeto              | Ref                    |
|------------|----------------------|------------------------|
| Production | AutomatizAI          | `wuwyhbthwsjdhvpwnfib` |
| Preview    | AutomatizAI Preview  | `vhwhxhnjqhxwrrnbwphy` |

Ambos vivem na org **Alexandre Estudos**, region `sa-east-1`, com as
mesmas migrations (`app/velo/supabase/migrations`) e a edge function
`credit-analysis` (`verify_jwt = false`).

### Variáveis Vercel

Configuradas via `vercel env add ... <environment>`:

| Variável                        | Production                                                 | Preview                                                  |
|---------------------------------|------------------------------------------------------------|----------------------------------------------------------|
| `VITE_SUPABASE_URL`             | `https://wuwyhbthwsjdhvpwnfib.supabase.co`                 | `https://vhwhxhnjqhxwrrnbwphy.supabase.co`               |
| `VITE_SUPABASE_PROJECT_ID`      | `wuwyhbthwsjdhvpwnfib`                                     | `vhwhxhnjqhxwrrnbwphy`                                   |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_KmLQDzpwQOUVTJ5S6sT3Pw_agH72Oby` (atual)   | `sb_publishable_QKm2YiIMtD08vh5Mw_liVQ_ROSpMHy1`         |

### GitHub Secrets

- `DATABASE_URL` — pooler do Supabase **preview** (pra Kysely seedar/limpar
  pedidos durante os testes E2E sem encostar em produção).
- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` — Vercel.
- `TD_TOKEN` — Testdino.

## Fluxo de build

### Preview (push em `main`)

1. `vercel pull --environment=preview` baixa as `VITE_*` do ambiente Preview.
2. `vercel build` gera bundle com `VITE_SUPABASE_URL` do **preview**.
3. `vercel deploy --prebuilt --target=preview` publica em URL `*.vercel.app`.
4. Frontend preview conversa só com `vhwhxhnjqhxwrrnbwphy.supabase.co`.

### Testes E2E

5. `BASE_URL` = URL da preview do passo 3.
6. Kysely (camada de teste) usa `DATABASE_URL` = pooler **preview**.
7. Pedidos criados/consultados nos testes ficam isolados no banco preview.
8. Produção nunca recebe dado de teste.

### Promote para produção

9. `vercel promote <preview-url>` dispara **novo build** com `VITE_*` do
   ambiente **Production**.
10. Bundle resultante embute `VITE_SUPABASE_URL` da produção.
11. Alias de produção aponta para esse novo build.
12. App em produção fala com `wuwyhbthwsjdhvpwnfib.supabase.co`.

### Por que `promote` e não `deploy --prod`?

`vercel promote` reaproveita o build de preview **apenas quando o ambiente
de variáveis é igual**. Como mudam as `VITE_*`, a Vercel detecta a
divergência e **rebuilda** automaticamente com o env de produção. Isso é
exatamente o comportamento desejado:

- O preview foi validado pelos E2E.
- O código que vai pra produção é o mesmo do preview (mesmo commit).
- Só os env vars trocam, gerando um bundle diferente apontado pro Supabase
  certo.

## Garantias

- ✅ Dois projetos Supabase distintos.
- ✅ E2E nunca toca o banco de produção.
- ✅ Após o promote, produção lê/escreve no Supabase de produção.
- ✅ Migrations e edge functions sincronizadas (mesmos arquivos em
  `app/velo/supabase/`).
- ✅ Secrets sensíveis no GitHub Secrets / Vercel env (nenhuma credencial
  commitada).
