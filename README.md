# Projeto AutomatizAI 


1. Instalar o projeto e usar o comando `npm i`
2. Após instalado, usar o comando `npm run dev`
3. Será aberto no `http://localhost:5173`

**Porém, para conseguir acesso corretamente, siga os passos abaixo**
1. Criar uma conta no Supabase e acesse o dashboard: [Supabase](https://supabase.com/)
2. Crie o ambiente e logo após crie o projeto em si, escolha qualquer nome (guarde a senha que criar para o projeto)
3. Vá em "Connect" e depois "App Frameworks" e copie o valor da variável `NEXT_PUBLIC_SUPABASE_URL` e insira no .env do projeto, e também o valor da variável `VITE_SUPABASE_PUBLISHABLE_KEY` e também altere no .env, o valor do `VITE_SUPABASE_PROJECT_ID` será o início da url do SUPABASE_URL sem o `.supabase.co`

**Agora para criar o banco de dados siga as instruções abaixo**
```bash
# Instalar CLI
npm install supabase --save-dev

# Login e vincular projeto
npx supabase login # Aperte a tecla enter e copie o código que abriu no navegador e cole no terminal 
npx supabase link --project-ref SEU_PROJECT_ID

# Aplicar migrações (cria tabelas e RLS)
npx supabase db push

# Deploy das Edge Functions (O docker desktop tem que estar aberto)
npx supabase functions deploy
```

Agora acessando o supabase e indo no dashboard, no menu lateral esquerdo acesse "Table Editor", a tabella "orders" terá sido criada corretamente.


# Instruções para instalar o playwright

1. Utilize o comando `npm init playwright@latest`
2. Escolha a opção TypeScript
3. Deixe inicicalmente a pasta onde ficarão os testes como `tests`
4. Não selecione que deseja um workflow github actions
5. Marque sim para instalar os browsers do playwright