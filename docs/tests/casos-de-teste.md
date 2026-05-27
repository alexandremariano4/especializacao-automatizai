# Casos de Teste — Velô Sprint

**Sistema:** Velô Sprint - Configurador de Veículo Elétrico  
**Versão:** 1.0  
**Perfil de Usuário:** Cliente (Usuário Comum)

---

## Módulo: Landing Page

---

### CT01 - Verificar carregamento da Landing Page

#### Objetivo
Validar que a Landing Page carrega corretamente com todos os elementos visíveis.

#### Pré-Condições
- A aplicação está rodando e acessível em `http://localhost:5173/`

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a URL raiz da aplicação (`/`) | A página carrega sem erros |
| 2  | Verificar o título da página no navegador | O título contém "Velô by Papito" |
| 3  | Verificar a seção Hero | O heading contém "Velô Sprint" e exibe as especificações (450km, 3.2s, 500cv) |
| 4  | Verificar a seção de Especificações | Exibe 6 cards de especificações (Bateria, Velocidade, Carregamento, Segurança, Tecnologia, Aerodinâmica) |
| 5  | Verificar a seção CTA | Exibe a imagem do carro e o preço a partir de R$ 40.000 |
| 6  | Verificar a seção FAQ | Exibe 6 perguntas frequentes em formato accordion |
| 7  | Verificar o Footer | Exibe links de redes sociais, modelos, suporte e informações legais |

#### Resultados Esperados
- Todas as seções da Landing Page são renderizadas corretamente e estão visíveis.

#### Critérios de Aceitação
- O título da aba contém "Velô by Papito"
- A seção Hero exibe o heading "Velô Sprint"
- As 6 especificações estão visíveis
- O preço base R$ 40.000 é exibido na seção CTA
- O FAQ contém 6 itens

---

### CT02 - Navegar para o Configurador via CTA da Landing Page

#### Objetivo
Validar que o botão CTA da Landing Page redireciona para o configurador.

#### Pré-Condições
- A Landing Page está carregada

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Localizar o botão "Configure Agora" na seção Hero ou CTA | O botão está visível e clicável |
| 2  | Clicar no botão "Configure Agora" | O sistema navega para a rota `/configure` |
| 3  | Verificar a página do Configurador | A página do Configurador é exibida com a visualização do carro e o painel de configuração |

#### Resultados Esperados
- O usuário é redirecionado para `/configure` e visualiza a interface do configurador.

#### Critérios de Aceitação
- A URL muda para `/configure`
- O Configurador é renderizado com as opções padrão

---

### CT03 - Navegar para Consulta de Pedidos via Header

#### Objetivo
Validar a navegação para a página de Consulta de Pedidos pelo menu do header.

#### Pré-Condições
- A Landing Page está carregada

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Localizar o link "Consultar Pedido" no header | O link está visível |
| 2  | Clicar no link "Consultar Pedido" | O sistema navega para a rota `/lookup` |
| 3  | Verificar a página de Consulta | O heading "Consultar Pedido" é exibido |

#### Resultados Esperados
- O usuário é levado à página de Consulta de Pedidos.

#### Critérios de Aceitação
- A URL muda para `/lookup`
- O campo de busca por número de pedido é exibido

---

### CT04 - Expandir e recolher itens do FAQ

#### Objetivo
Validar o comportamento accordion da seção FAQ.

#### Pré-Condições
- A Landing Page está carregada e a seção FAQ está visível

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Clicar no primeiro item do FAQ | A resposta do primeiro item é expandida e exibida |
| 2  | Clicar novamente no mesmo item | A resposta é recolhida |
| 3  | Clicar em outro item do FAQ | A resposta do novo item é exibida |

#### Resultados Esperados
- O accordion funciona corretamente, expandindo e recolhendo os itens.

#### Critérios de Aceitação
- Clicar em um item expande sua resposta
- Clicar novamente recolhe a resposta

---

### CT05 - Verificar navegação do Header em dispositivo móvel

#### Objetivo
Validar que o menu hamburger funciona corretamente em viewport mobile.

#### Pré-Condições
- A aplicação está aberta em viewport de celular (largura < 768px)

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Verificar o header | O menu de navegação padrão está oculto e o ícone de menu hamburger está visível |
| 2  | Clicar no ícone do menu hamburger | O menu mobile é exibido com os links de navegação |
| 3  | Clicar no link "Consultar Pedido" no menu mobile | O sistema navega para `/lookup` e o menu é fechado |

#### Resultados Esperados
- O menu responsivo funciona corretamente em viewport mobile.

#### Critérios de Aceitação
- O hamburger menu é exibido em viewport mobile
- Os links de navegação são acessíveis pelo menu mobile
- Ao clicar em um link, o menu fecha e navega corretamente

---

## Módulo: Configurador de Veículo

---

### CT06 - Verificar configuração padrão ao acessar o Configurador

#### Objetivo
Validar que o configurador exibe a configuração padrão ao ser acessado pela primeira vez.

#### Pré-Condições
- O localStorage está limpo (sem configurações salvas)
- O usuário acessa `/configure`

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a página `/configure` | O configurador é carregado |
| 2  | Verificar a cor exterior selecionada | "Glacier Blue" está selecionada por padrão |
| 3  | Verificar o tipo de rodas selecionado | "Aero Wheels" está selecionado (incluso) |
| 4  | Verificar os opcionais | Nenhum opcional está marcado |
| 5  | Verificar o preço total | O preço exibido é R$ 40.000,00 |
| 6  | Verificar a imagem do carro | A imagem mostra o Velô Sprint Glacier Blue com rodas Aero |

#### Resultados Esperados
- A configuração padrão é Glacier Blue, Aero Wheels, sem opcionais, a R$ 40.000.

#### Critérios de Aceitação
- Cor exterior padrão: Glacier Blue
- Rodas padrão: Aero Wheels
- Opcionais desmarcados
- Preço total: R$ 40.000,00

---

### CT07 - Selecionar cor exterior e verificar atualização da imagem

#### Objetivo
Validar que ao selecionar uma cor exterior diferente, a imagem do carro e o swatch são atualizados.

#### Pré-Condições
- O Configurador está aberto com a configuração padrão

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Clicar na opção de cor "Midnight Black" | A cor Midnight Black é selecionada (swatch com destaque) |
| 2  | Verificar a imagem do carro | A imagem muda para o Velô Sprint em Midnight Black |
| 3  | Verificar o preço total | O preço permanece R$ 40.000,00 (cor não altera preço) |
| 4  | Clicar na opção de cor "Lunar White" | A cor Lunar White é selecionada |
| 5  | Verificar a imagem do carro | A imagem muda para o Velô Sprint em Lunar White |

#### Resultados Esperados
- A imagem do carro é atualizada dinamicamente conforme a cor selecionada.

#### Critérios de Aceitação
- Cada cor disponível (Glacier Blue, Midnight Black, Lunar White) atualiza a imagem do carro
- O preço não é alterado pela troca de cor

---

### CT08 - Selecionar rodas Sport e verificar cálculo de preço

#### Objetivo
Validar que ao selecionar "Sport Wheels", o preço é acrescido de R$ 2.000.

#### Pré-Condições
- O Configurador está aberto com a configuração padrão (Aero Wheels, R$ 40.000)

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Clicar na opção "Sport Wheels" | A opção Sport Wheels é selecionada |
| 2  | Verificar o preço total | O preço atualiza para R$ 42.000,00 |
| 3  | Verificar a imagem do carro | A imagem mostra o carro com rodas Sport |
| 4  | Clicar na opção "Aero Wheels" novamente | A opção Aero Wheels é selecionada |
| 5  | Verificar o preço total | O preço retorna para R$ 40.000,00 |

#### Resultados Esperados
- A troca entre Aero e Sport atualiza corretamente o preço (+R$ 2.000 para Sport).

#### Critérios de Aceitação
- Sport Wheels adiciona R$ 2.000 ao preço
- Aero Wheels é incluso (sem custo adicional)
- A imagem atualiza conforme o tipo de roda

---

### CT09 - Adicionar opcional Precision Park

#### Objetivo
Validar que ao marcar o opcional "Precision Park", o preço é acrescido de R$ 5.500.

#### Pré-Condições
- O Configurador está com a configuração padrão (R$ 40.000)

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Marcar o checkbox "Precision Park" | O opcional é adicionado à configuração |
| 2  | Verificar o preço total | O preço atualiza para R$ 45.500,00 |
| 3  | Desmarcar o checkbox "Precision Park" | O opcional é removido |
| 4  | Verificar o preço total | O preço retorna para R$ 40.000,00 |

#### Resultados Esperados
- O opcional Precision Park adiciona e remove R$ 5.500 corretamente.

#### Critérios de Aceitação
- Precision Park custa +R$ 5.500
- Marcar/desmarcar atualiza o preço total em tempo real

---

### CT10 - Adicionar opcional Flux Capacitor

#### Objetivo
Validar que ao marcar o opcional "Flux Capacitor", o preço é acrescido de R$ 5.000.

#### Pré-Condições
- O Configurador está com a configuração padrão (R$ 40.000)

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Marcar o checkbox "Flux Capacitor" | O opcional é adicionado à configuração |
| 2  | Verificar o preço total | O preço atualiza para R$ 45.000,00 |
| 3  | Desmarcar o checkbox "Flux Capacitor" | O opcional é removido |
| 4  | Verificar o preço total | O preço retorna para R$ 40.000,00 |

#### Resultados Esperados
- O opcional Flux Capacitor adiciona e remove R$ 5.000 corretamente.

#### Critérios de Aceitação
- Flux Capacitor custa +R$ 5.000
- Marcar/desmarcar atualiza o preço total em tempo real

---

### CT11 - Configuração completa (todos os adicionais)

#### Objetivo
Validar o cálculo de preço com todas as opções mais caras selecionadas.

#### Pré-Condições
- O Configurador está com a configuração padrão

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Selecionar a cor "Midnight Black" | Cor atualizada |
| 2  | Selecionar "Sport Wheels" | Rodas atualizadas, preço muda para R$ 42.000,00 |
| 3  | Marcar "Precision Park" | Preço muda para R$ 47.500,00 |
| 4  | Marcar "Flux Capacitor" | Preço muda para R$ 52.500,00 |
| 5  | Verificar o preço total final | R$ 52.500,00 (40.000 + 2.000 + 5.500 + 5.000) |

#### Resultados Esperados
- O preço total reflete a soma correta de todos os adicionais.

#### Critérios de Aceitação
- Preço final: R$ 52.500,00
- Fórmula: Base (40.000) + Sport (2.000) + Precision Park (5.500) + Flux Capacitor (5.000)

---

### CT12 - Alternar entre visualização exterior e interior

#### Objetivo
Validar que o usuário pode alternar entre a visualização exterior e interior do veículo.

#### Pré-Condições
- O Configurador está aberto (modo exterior por padrão)

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Verificar a visualização padrão | A imagem do exterior do carro é exibida |
| 2  | Selecionar uma cor de interior (ex: "Deep Blue") | A visualização muda para o modo interior |
| 3  | Verificar a visualização interior | O preview do interior é exibido com a cor selecionada |
| 4  | Selecionar uma cor exterior | A visualização retorna para o modo exterior |

#### Resultados Esperados
- A alternância entre exterior e interior funciona automaticamente ao selecionar cores.

#### Critérios de Aceitação
- Selecionar cor exterior ativa modo exterior
- Selecionar cor interior ativa modo interior
- Cada modo exibe a visualização correspondente

---

### CT13 - Persistência da configuração no localStorage

#### Objetivo
Validar que a configuração é salva e restaurada ao recarregar a página.

#### Pré-Condições
- O Configurador está aberto com a configuração padrão

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Selecionar cor "Lunar White" | Cor atualizada |
| 2  | Selecionar "Sport Wheels" | Rodas atualizadas |
| 3  | Marcar "Flux Capacitor" | Opcional adicionado |
| 4  | Recarregar a página (F5) | A página recarrega |
| 5  | Verificar a configuração após recarga | Cor "Lunar White", Sport Wheels e Flux Capacitor permanecem selecionados |
| 6  | Verificar o preço | R$ 47.000,00 (40.000 + 2.000 + 5.000) |

#### Resultados Esperados
- A configuração é persistida no localStorage e restaurada após recarregar.

#### Critérios de Aceitação
- A configuração persiste entre recarregamentos da página
- O preço é recalculado corretamente com os valores restaurados

---

### CT14 - Navegar para o Checkout a partir do Configurador

#### Objetivo
Validar que o botão "Monte o Seu" leva ao checkout com a configuração atual.

#### Pré-Condições
- O Configurador está com uma configuração personalizada

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Configurar o veículo (ex: Sport Wheels + Precision Park) | Configuração aplicada, preço R$ 47.500,00 |
| 2  | Clicar no botão "Monte o Seu" | O sistema navega para `/order` |
| 3  | Verificar a página de Checkout | O resumo exibe a configuração escolhida com o preço correto |

#### Resultados Esperados
- O checkout exibe a configuração escolhida no configurador.

#### Critérios de Aceitação
- A URL muda para `/order`
- O resumo do pedido reflete a configuração feita
- O preço total no resumo está correto

---

## Módulo: Checkout / Pedido

---

### CT15 - Preencher formulário de pedido com dados válidos (Pagamento à Vista)

#### Objetivo
Validar o fluxo feliz de compra com pagamento à vista e todos os campos preenchidos corretamente.

#### Pré-Condições
- O usuário configurou o veículo e está na página `/order`

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher o campo "Nome" com "João" | Campo aceita o valor |
| 2  | Preencher o campo "Sobrenome" com "Silva" | Campo aceita o valor |
| 3  | Preencher o campo "Email" com "joao@email.com" | Campo aceita o valor |
| 4  | Preencher o campo "Telefone" com "(11) 99999-1234" | Campo aceita o valor com máscara |
| 5  | Preencher o campo "CPF" com "123.456.789-00" | Campo aceita o valor com máscara |
| 6  | Selecionar a loja "Velô Paulista - Av. Paulista, 1000" | A loja é selecionada |
| 7  | Selecionar a opção de pagamento "À Vista" | A opção é marcada |
| 8  | Marcar o checkbox "Aceito os Termos de Uso e Política de Privacidade" | O checkbox é marcado |
| 9  | Clicar no botão "Confirmar Pedido" | O pedido é criado com status APROVADO |
| 10 | Verificar a página de confirmação | O sistema navega para `/success` com o pedido exibido |

#### Resultados Esperados
- O pedido é criado com sucesso, sem análise de crédito, com status APROVADO.

#### Critérios de Aceitação
- Todos os campos são validados sem erro
- Pagamento à vista ignora análise de crédito
- Pedido é salvo no banco com status APROVADO
- O número do pedido é gerado no formato VLO-XXXXXX
- O usuário é redirecionado para a página de sucesso

---

### CT16 - Submeter formulário com todos os campos vazios

#### Objetivo
Validar que o sistema exibe mensagens de erro para todos os campos obrigatórios quando o formulário é submetido vazio.

#### Pré-Condições
- O usuário está na página `/order` sem preencher nenhum campo

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Não preencher nenhum campo do formulário | Os campos permanecem vazios |
| 2  | Clicar no botão "Confirmar Pedido" | O sistema exibe mensagens de validação |
| 3  | Verificar erro no campo "Nome" | Exibe "Nome deve ter pelo menos 2 caracteres" |
| 4  | Verificar erro no campo "Sobrenome" | Exibe "Sobrenome deve ter pelo menos 2 caracteres" |
| 5  | Verificar erro no campo "Email" | Exibe "Email inválido" |
| 6  | Verificar erro no campo "Telefone" | Exibe "Telefone inválido" |
| 7  | Verificar erro no campo "CPF" | Exibe "CPF inválido" |
| 8  | Verificar erro no campo "Loja" | Exibe "Selecione uma loja" |
| 9  | Verificar erro no checkbox "Termos" | Exibe "Aceite os termos" |

#### Resultados Esperados
- Todas as mensagens de validação são exibidas e o formulário não é submetido.

#### Critérios de Aceitação
- Cada campo obrigatório exibe sua mensagem de erro específica
- O formulário não é submetido
- Nenhuma requisição é feita à API
- Os campos com erro exibem borda vermelha

---

### CT17 - Preencher campo Nome com menos de 2 caracteres

#### Objetivo
Validar a regra de mínimo de 2 caracteres para o campo Nome.

#### Pré-Condições
- O usuário está na página `/order`

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher o campo "Nome" com "A" (1 caractere) | Campo aceita a digitação |
| 2  | Preencher os demais campos com dados válidos | Campos preenchidos |
| 3  | Clicar em "Confirmar Pedido" | Exibe erro no campo Nome |
| 4  | Verificar a mensagem de erro | "Nome deve ter pelo menos 2 caracteres" |

#### Resultados Esperados
- O campo Nome rejeita valores com menos de 2 caracteres.

#### Critérios de Aceitação
- Nome com 1 caractere é rejeitado
- Nome com 2 caracteres é aceito
- A mensagem de erro é exibida corretamente

---

### CT18 - Preencher campo Email com formato inválido

#### Objetivo
Validar que o campo de email rejeita formatos inválidos.

#### Pré-Condições
- O usuário está na página `/order`

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher o campo "Email" com "emailinvalido" | Campo aceita a digitação |
| 2  | Preencher os demais campos com dados válidos | Campos preenchidos |
| 3  | Clicar em "Confirmar Pedido" | Exibe erro no campo Email |
| 4  | Verificar a mensagem de erro | "Email inválido" |
| 5  | Corrigir o campo "Email" para "email@valido.com" | O erro é limpo |

#### Resultados Esperados
- O campo Email rejeita formatos que não seguem o padrão de email.

#### Critérios de Aceitação
- "emailinvalido" é rejeitado
- "email@" é rejeitado
- "email@valido.com" é aceito
- A mensagem de erro desaparece ao corrigir o valor

---

### CT19 - Validar máscara do campo Telefone

#### Objetivo
Validar que o campo Telefone aplica a máscara (99) 99999-9999 e rejeita valores incompletos.

#### Pré-Condições
- O usuário está na página `/order`

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Clicar no campo "Telefone" e digitar "11999991234" | O valor é formatado para "(11) 99999-1234" |
| 2  | Verificar a máscara aplicada | O campo exibe "(11) 99999-1234" |
| 3  | Limpar o campo e digitar apenas "1199" | O valor é formatado parcialmente "(11) 99" |
| 4  | Preencher os demais campos e submeter | Exibe "Telefone inválido" |

#### Resultados Esperados
- A máscara é aplicada automaticamente e valores incompletos são rejeitados.

#### Critérios de Aceitação
- A máscara (99) 99999-9999 é aplicada automaticamente
- Telefone com menos de 14 caracteres formatados é rejeitado
- Telefone completo com 14+ caracteres é aceito

---

### CT20 - Validar máscara do campo CPF

#### Objetivo
Validar que o campo CPF aplica a máscara 999.999.999-99 e rejeita valores incompletos.

#### Pré-Condições
- O usuário está na página `/order`

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Clicar no campo "CPF" e digitar "12345678900" | O valor é formatado para "123.456.789-00" |
| 2  | Verificar a máscara aplicada | O campo exibe "123.456.789-00" |
| 3  | Limpar o campo e digitar apenas "12345" | O valor é formatado parcialmente "123.45" |
| 4  | Preencher os demais campos e submeter | Exibe "CPF inválido" |

#### Resultados Esperados
- A máscara é aplicada automaticamente e valores incompletos são rejeitados.

#### Critérios de Aceitação
- A máscara 999.999.999-99 é aplicada automaticamente
- CPF com menos de 14 caracteres formatados é rejeitado
- CPF completo com 14 caracteres é aceito

---

### CT21 - Verificar que a seleção de Loja é obrigatória

#### Objetivo
Validar que o campo "Loja para Retirada" é obrigatório.

#### Pré-Condições
- O usuário está na página `/order`

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher todos os campos com dados válidos, exceto "Loja para Retirada" | Todos os campos estão preenchidos, exceto loja |
| 2  | Clicar em "Confirmar Pedido" | Exibe erro no campo de loja |
| 3  | Verificar a mensagem de erro | "Selecione uma loja" |
| 4  | Selecionar "Velô Faria Lima - Av. Faria Lima, 2500" | O erro é limpo |

#### Resultados Esperados
- O sistema exige a seleção de uma loja de retirada.

#### Critérios de Aceitação
- Sem seleção de loja, o formulário não é submetido
- As 4 opções de loja estão disponíveis
- Selecionar uma loja remove o erro

---

### CT22 - Verificar que a aceitação dos Termos é obrigatória

#### Objetivo
Validar que o checkbox de aceite dos Termos de Uso e Política de Privacidade é obrigatório.

#### Pré-Condições
- O usuário está na página `/order`

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher todos os campos com dados válidos | Campos preenchidos |
| 2  | NÃO marcar o checkbox de termos | O checkbox permanece desmarcado |
| 3  | Clicar em "Confirmar Pedido" | Exibe erro de validação |
| 4  | Verificar a mensagem de erro | "Aceite os termos" |
| 5  | Marcar o checkbox de termos | O erro desaparece |

#### Resultados Esperados
- O pedido não pode ser concluído sem aceitar os termos.

#### Critérios de Aceitação
- Formulário é bloqueado sem aceite dos termos
- A mensagem "Aceite os termos" é exibida
- Marcar o checkbox remove o erro

---

### CT23 - Selecionar pagamento via Financiamento e verificar cálculos

#### Objetivo
Validar que ao selecionar financiamento, os campos e cálculos de parcelas são exibidos corretamente.

#### Pré-Condições
- O usuário está na página `/order` com veículo de R$ 40.000 (configuração base)

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Selecionar a opção de pagamento "Financiamento" | Os campos de financiamento são exibidos |
| 2  | Verificar o campo de entrada (Valor de Entrada) | O campo é exibido com valor inicial 0 |
| 3  | Preencher o campo de entrada com R$ 10.000 | O valor é aceito |
| 4  | Verificar "Valor a Financiar" | R$ 30.000,00 (40.000 - 10.000) |
| 5  | Verificar "Parcela (12x)" | R$ 2.550,00 ((30.000 / 12) * 1.02) |
| 6  | Verificar "Taxa de Juros" | 2% a.m. |
| 7  | Verificar "Total Financiado" | R$ 30.600,00 (2.550 * 12) |
| 8  | Verificar "Juros Totais" | R$ 600,00 (30.600 - 30.000) |

#### Resultados Esperados
- Os cálculos de financiamento são exibidos corretamente com juros compostos de 2% a.m.

#### Critérios de Aceitação
- Parcela = (valorAFinanciar / 12) * 1.02
- Total financiado = parcela * 12
- Juros totais = total financiado - valor a financiar
- Taxa exibida: 2% a.m.
- Financiamento em 12 parcelas fixas

---

### CT24 - Alterar valor de entrada e verificar recálculo

#### Objetivo
Validar que alterar o valor de entrada recalcula todas as métricas de financiamento.

#### Pré-Condições
- O usuário está na página `/order` com financiamento selecionado, veículo de R$ 40.000

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher entrada com R$ 0 | Valor a financiar: R$ 40.000 |
| 2  | Verificar parcela | R$ 3.400,00 ((40.000 / 12) * 1.02) |
| 3  | Alterar entrada para R$ 20.000 (50%) | Valor a financiar: R$ 20.000 |
| 4  | Verificar parcela | R$ 1.700,00 ((20.000 / 12) * 1.02) |
| 5  | Alterar entrada para R$ 40.000 (100%) | Valor a financiar: R$ 0 |
| 6  | Verificar parcela | R$ 0,00 |

#### Resultados Esperados
- Os cálculos são atualizados em tempo real ao alterar o valor de entrada.

#### Critérios de Aceitação
- O valor de entrada aceita valores de 0 até o preço total
- Os cálculos atualizam automaticamente ao alterar o valor de entrada

---

### CT25 - Verificar resumo do pedido no sidebar

#### Objetivo
Validar que o resumo lateral exibe corretamente a configuração e preço do veículo.

#### Pré-Condições
- O usuário configurou: Midnight Black, Sport Wheels, Precision Park (R$ 47.500) e está em `/order`

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Verificar a imagem do carro no resumo | Exibe o Velô Sprint em Midnight Black com Sport Wheels |
| 2  | Verificar os detalhes da configuração | Exibe: cor, interior, rodas, opcionais |
| 3  | Verificar os itens de preço | Base: R$ 40.000 + Sport: R$ 2.000 + Precision Park: R$ 5.500 |
| 4  | Verificar o preço total | R$ 47.500,00 |

#### Resultados Esperados
- O resumo exibe todos os itens da configuração com preços detalhados.

#### Critérios de Aceitação
- A imagem corresponde à configuração escolhida
- Todos os itens com preço são listados individualmente
- O total está correto

---

## Módulo: Análise de Crédito Automática

---

### CT26 - Pedido à vista (sem análise de crédito)

#### Objetivo
Validar que pedidos com pagamento à vista não passam por análise de crédito e são aprovados automaticamente.

#### Pré-Condições
- O formulário está preenchido com dados válidos
- Pagamento: À Vista

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Selecionar pagamento "À Vista" | Opção selecionada, sem campos de financiamento |
| 2  | Clicar em "Confirmar Pedido" | O pedido é processado |
| 3  | Verificar a página de sucesso | O pedido é exibido com status "APROVADO" |

#### Resultados Esperados
- Nenhuma análise de crédito é executada. O pedido é aprovado automaticamente.

#### Critérios de Aceitação
- Não há chamada à função `credit-analysis`
- O status do pedido é APROVADO
- O ícone de sucesso (verde) é exibido

---

### CT27 - Financiamento com score > 700 (Aprovado)

#### Objetivo
Validar que um pedido com financiamento e score de crédito acima de 700 é aprovado.

#### Pré-Condições
- O CPF informado retorna um score > 700 na API de análise de crédito
- Pagamento: Financiamento

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher o formulário com dados válidos | Campos preenchidos |
| 2  | Selecionar "Financiamento" e definir um valor de entrada (< 50%) | Financiamento configurado |
| 3  | Clicar em "Confirmar Pedido" | A API de crédito é chamada com o CPF |
| 4  | Verificar o resultado | Pedido criado com status APROVADO |
| 5  | Verificar a página de sucesso | Ícone verde e mensagem "Pedido Aprovado!" |

#### Resultados Esperados
- Score > 700 resulta em aprovação independente do valor da entrada.

#### Critérios de Aceitação
- A análise de crédito é executada
- Score > 700 → Status APROVADO
- Mensagem de sucesso é exibida

---

### CT28 - Financiamento com score entre 501 e 700 (Em Análise)

#### Objetivo
Validar que um pedido com financiamento e score entre 501 e 700 fica em análise.

#### Pré-Condições
- O CPF informado retorna um score entre 501 e 700
- Pagamento: Financiamento
- Valor de entrada < 50% do total

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher o formulário com dados válidos | Campos preenchidos |
| 2  | Selecionar "Financiamento" com entrada < 50% | Financiamento configurado |
| 3  | Clicar em "Confirmar Pedido" | A API de crédito é chamada |
| 4  | Verificar o resultado | Pedido criado com status EM_ANALISE |
| 5  | Verificar a página de sucesso | Ícone vermelho e mensagem "Crédito Reprovado" |

#### Resultados Esperados
- Score entre 501-700 com entrada < 50% resulta em status EM_ANALISE.

#### Critérios de Aceitação
- A análise de crédito é executada
- Score 501-700 + entrada < 50% → Status EM_ANALISE
- A página de resultado exibe o ícone vermelho

---

### CT29 - Financiamento com score <= 500 (Reprovado)

#### Objetivo
Validar que um pedido com financiamento e score de crédito menor ou igual a 500 é reprovado.

#### Pré-Condições
- O CPF informado retorna um score <= 500
- Pagamento: Financiamento
- Valor de entrada < 50% do total

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher o formulário com dados válidos | Campos preenchidos |
| 2  | Selecionar "Financiamento" com entrada < 50% | Financiamento configurado |
| 3  | Clicar em "Confirmar Pedido" | A API de crédito é chamada |
| 4  | Verificar o resultado | Pedido criado com status REPROVADO |
| 5  | Verificar a página de sucesso | Ícone vermelho e mensagem "Crédito Reprovado" |

#### Resultados Esperados
- Score <= 500 com entrada < 50% resulta em reprovação.

#### Critérios de Aceitação
- A análise de crédito é executada
- Score <= 500 + entrada < 50% → Status REPROVADO
- A mensagem de crédito reprovado é exibida

---

### CT30 - Financiamento com entrada >= 50% e score < 700 (Aprovação por entrada alta)

#### Objetivo
Validar a regra de exceção: entrada >= 50% do valor total aprova automaticamente o pedido, ignorando o score de crédito.

#### Pré-Condições
- O CPF informado retorna um score < 700 (ex: 450)
- Pagamento: Financiamento
- Veículo de R$ 40.000

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher o formulário com dados válidos | Campos preenchidos |
| 2  | Selecionar "Financiamento" | Campos de financiamento exibidos |
| 3  | Definir valor de entrada de R$ 20.000 (50%) | Valor a financiar: R$ 20.000 |
| 4  | Clicar em "Confirmar Pedido" | A API de crédito é chamada |
| 5  | Verificar o resultado | Pedido criado com status APROVADO |
| 6  | Verificar a página de sucesso | Ícone verde e mensagem "Pedido Aprovado!" |

#### Resultados Esperados
- Mesmo com score baixo, entrada >= 50% do total aprova o pedido.

#### Critérios de Aceitação
- Entrada >= 50% + Score < 700 → Status APROVADO
- A regra de exceção prevalece sobre a regra de score
- Mensagem de sucesso é exibida

---

### CT31 - Financiamento com entrada >= 50% e score >= 700

#### Objetivo
Validar que com score alto e entrada alta, o pedido é aprovado normalmente.

#### Pré-Condições
- O CPF informado retorna um score > 700
- Pagamento: Financiamento
- Entrada >= 50%

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher o formulário com dados válidos | Campos preenchidos |
| 2  | Selecionar "Financiamento" com entrada >= 50% | Financiamento configurado |
| 3  | Clicar em "Confirmar Pedido" | A API de crédito é chamada |
| 4  | Verificar o resultado | Pedido criado com status APROVADO |

#### Resultados Esperados
- Score > 700 com qualquer valor de entrada resulta em aprovação.

#### Critérios de Aceitação
- Score > 700 → Status APROVADO independente do valor de entrada

---

### CT32 - Financiamento com entrada de 49% e score entre 501-700

#### Objetivo
Validar o cenário limítrofe onde a entrada está logo abaixo de 50% e o score é mediano.

#### Pré-Condições
- O CPF informado retorna um score entre 501 e 700 (ex: 550)
- Pagamento: Financiamento
- Veículo de R$ 40.000

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher o formulário com dados válidos | Campos preenchidos |
| 2  | Selecionar "Financiamento" | Campos de financiamento exibidos |
| 3  | Definir valor de entrada de R$ 19.600 (49%) | Valor a financiar: R$ 20.400 |
| 4  | Clicar em "Confirmar Pedido" | A API de crédito é chamada |
| 5  | Verificar o resultado | Pedido criado com status EM_ANALISE |

#### Resultados Esperados
- Entrada de 49% NÃO ativa a regra de exceção. Score 501-700 → EM_ANALISE.

#### Critérios de Aceitação
- Entrada < 50% não ativa a aprovação automática
- Score 501-700 + entrada < 50% → Status EM_ANALISE

---

### CT33 - Falha na API de análise de crédito

#### Objetivo
Validar o comportamento do sistema quando a API de análise de crédito falha.

#### Pré-Condições
- Pagamento: Financiamento
- A API de análise de crédito está indisponível ou retorna erro

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher o formulário com dados válidos | Campos preenchidos |
| 2  | Selecionar "Financiamento" | Campos de financiamento exibidos |
| 3  | Clicar em "Confirmar Pedido" | A API de crédito é chamada e falha |
| 4  | Verificar o feedback ao usuário | Uma notificação toast de erro é exibida |
| 5  | Verificar a mensagem | "Falha ao consultar análise de crédito" ou similar |

#### Resultados Esperados
- O sistema exibe uma mensagem de erro clara e não cria o pedido.

#### Critérios de Aceitação
- Toast de erro é exibido com variante "destructive"
- O pedido NÃO é criado no banco
- O usuário permanece na página de checkout e pode tentar novamente

---

## Módulo: Confirmação (Success)

---

### CT34 - Exibir confirmação de pedido aprovado

#### Objetivo
Validar que a página de sucesso exibe corretamente os dados de um pedido aprovado.

#### Pré-Condições
- Um pedido acabou de ser criado com status APROVADO

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Verificar o ícone de status | Ícone de checkmark verde é exibido |
| 2  | Verificar o heading | "Pedido Aprovado!" |
| 3  | Verificar a mensagem | "Seu pedido foi processado com sucesso. Em breve entraremos em contato." |
| 4  | Verificar o número do pedido | Exibido no formato VLO-XXXXXX |
| 5  | Verificar os dados do cliente | Nome, email e loja de retirada estão corretos |
| 6  | Verificar a configuração do veículo | Cor, rodas e preço estão corretos |
| 7  | Verificar os botões de ação | "Consultar Pedido" e "Configurar Outro" são exibidos |

#### Resultados Esperados
- Todos os dados do pedido aprovado são exibidos corretamente com o visual de sucesso.

#### Critérios de Aceitação
- Ícone verde (sucesso)
- Número do pedido no formato VLO-XXXXXX
- Dados do cliente corretos
- Configuração do veículo correta
- Preço total correto

---

### CT35 - Exibir confirmação de pedido reprovado ou em análise

#### Objetivo
Validar que a página de sucesso exibe a mensagem de crédito reprovado para pedidos não aprovados.

#### Pré-Condições
- Um pedido acabou de ser criado com status EM_ANALISE ou REPROVADO

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Verificar o ícone de status | Ícone X vermelho é exibido |
| 2  | Verificar o heading | "Crédito Reprovado" |
| 3  | Verificar a mensagem | "Infelizmente seu crédito não foi aprovado. Tente novamente com pagamento à vista." |
| 4  | Verificar o número do pedido | Exibido no formato VLO-XXXXXX |
| 5  | Verificar os botões de ação | "Consultar Pedido" e "Configurar Outro" são exibidos |

#### Resultados Esperados
- A mensagem de rejeição é exibida com o visual de erro.

#### Critérios de Aceitação
- Ícone vermelho (erro)
- Heading: "Crédito Reprovado"
- Sugere tentar com pagamento à vista
- Número do pedido é exibido mesmo para pedidos não aprovados

---

### CT36 - Navegar para Consulta de Pedido a partir da página de sucesso

#### Objetivo
Validar que o botão "Consultar Pedido" na página de sucesso redireciona corretamente.

#### Pré-Condições
- O usuário está na página `/success` após criar um pedido

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Clicar no botão "Consultar Pedido" | O sistema navega para `/lookup` |
| 2  | Verificar a página | A página de Consulta de Pedidos é carregada |

#### Resultados Esperados
- O usuário é levado à página de consulta de pedidos.

#### Critérios de Aceitação
- A URL muda para `/lookup`
- A página de consulta é renderizada

---

### CT37 - Navegar para configurar outro veículo a partir da página de sucesso

#### Objetivo
Validar que o botão "Configurar Outro" reinicia o fluxo.

#### Pré-Condições
- O usuário está na página `/success` após criar um pedido

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Clicar no botão "Configurar Outro" | O sistema navega para `/configure` |
| 2  | Verificar a configuração | A configuração foi resetada para os valores padrão |

#### Resultados Esperados
- O configurador é exibido com a configuração padrão.

#### Critérios de Aceitação
- A URL muda para `/configure`
- A configuração está resetada (Glacier Blue, Aero, sem opcionais, R$ 40.000)

---

### CT38 - Acessar página de sucesso diretamente sem estado

#### Objetivo
Validar que acessar `/success` diretamente, sem ter criado um pedido, redireciona para a home.

#### Pré-Condições
- Nenhum pedido foi criado na sessão

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar diretamente a URL `/success` no navegador | O sistema detecta a ausência de state |
| 2  | Verificar o redirecionamento | O sistema redireciona para `/` (Landing Page) |

#### Resultados Esperados
- O acesso direto a `/success` sem state é tratado com redirecionamento seguro.

#### Critérios de Aceitação
- Não exibe página em branco ou erro
- Redireciona para a Landing Page

---

## Módulo: Consulta de Pedidos

---

### CT39 - Consultar pedido existente com status APROVADO

#### Objetivo
Validar que a busca por um pedido aprovado retorna e exibe os dados corretamente.

#### Pré-Condições
- Existe um pedido com status APROVADO no banco de dados
- O usuário conhece o número do pedido (ex: VLO-2GA8RB)

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a página `/lookup` | A página de consulta é exibida com o heading "Consultar Pedido" |
| 2  | Preencher o campo com "VLO-2GA8RB" | O campo aceita o valor |
| 3  | Clicar no botão "Buscar Pedido" | O sistema busca o pedido na API |
| 4  | Verificar o resultado | Os detalhes do pedido são exibidos |
| 5  | Verificar o badge de status | Badge verde com texto "APROVADO" e ícone de check |
| 6  | Verificar os dados do pedido | Número, configuração, cliente, pagamento e data exibidos |

#### Resultados Esperados
- O pedido é encontrado e todos os seus dados são exibidos com o badge de status correto.

#### Critérios de Aceitação
- O badge exibe fundo verde (bg-green-100), texto verde (text-green-700) e ícone lucide-circle-check-big
- Todos os campos do pedido são exibidos
- O número do pedido corresponde ao buscado

---

### CT40 - Consultar pedido existente com status REPROVADO

#### Objetivo
Validar a exibição correta do badge de status para pedido reprovado.

#### Pré-Condições
- Existe um pedido com status REPROVADO no banco de dados

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a página `/lookup` | Página de consulta exibida |
| 2  | Preencher o campo com o número do pedido reprovado | Campo preenchido |
| 3  | Clicar em "Buscar Pedido" | O pedido é encontrado |
| 4  | Verificar o badge de status | Badge vermelho com texto "REPROVADO" e ícone X |

#### Resultados Esperados
- O badge de status exibe corretamente a reprovação com estilização vermelha.

#### Critérios de Aceitação
- Badge com fundo vermelho (bg-red-100), texto vermelho (text-red-700) e ícone lucide-circle-x

---

### CT41 - Consultar pedido existente com status EM_ANALISE

#### Objetivo
Validar a exibição correta do badge de status para pedido em análise.

#### Pré-Condições
- Existe um pedido com status EM_ANALISE no banco de dados

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a página `/lookup` | Página de consulta exibida |
| 2  | Preencher o campo com o número do pedido em análise | Campo preenchido |
| 3  | Clicar em "Buscar Pedido" | O pedido é encontrado |
| 4  | Verificar o badge de status | Badge âmbar com texto "EM_ANALISE" e ícone de relógio |

#### Resultados Esperados
- O badge de status exibe corretamente o estado em análise com estilização âmbar.

#### Critérios de Aceitação
- Badge com fundo âmbar (bg-amber-100), texto âmbar (text-amber-700) e ícone lucide-clock

---

### CT42 - Buscar pedido inexistente

#### Objetivo
Validar que a busca por um número de pedido que não existe exibe a mensagem apropriada.

#### Pré-Condições
- O número de pedido buscado não existe no banco de dados

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a página `/lookup` | Página de consulta exibida |
| 2  | Preencher o campo com um código aleatório (ex: VLO-ZZZZZZ) | Campo preenchido |
| 3  | Clicar em "Buscar Pedido" | O sistema busca e não encontra o pedido |
| 4  | Verificar a mensagem | Exibe "Pedido não encontrado" |
| 5  | Verificar a submensagem | "Verifique o número do pedido e tente novamente" |

#### Resultados Esperados
- O sistema exibe a mensagem de pedido não encontrado com orientação ao usuário.

#### Critérios de Aceitação
- Heading "Pedido não encontrado" é exibido
- Mensagem de orientação é exibida
- Nenhum card de pedido é renderizado

---

### CT43 - Buscar pedido com código fora do padrão

#### Objetivo
Validar que a busca com um código que não segue o formato VLO-XXXXXX é tratada corretamente.

#### Pré-Condições
- O usuário está na página `/lookup`

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher o campo com "INVALIDO-123" | Campo aceita a digitação |
| 2  | Clicar em "Buscar Pedido" | O sistema busca e não encontra |
| 3  | Verificar a mensagem | Exibe "Pedido não encontrado" |

#### Resultados Esperados
- Códigos fora do padrão são tratados sem erros técnicos, exibindo a mensagem de "não encontrado".

#### Critérios de Aceitação
- Não ocorrem erros técnicos (sem crashes ou erros no console)
- A mensagem de "Pedido não encontrado" é exibida

---

### CT44 - Verificar estado de loading durante a busca

#### Objetivo
Validar que o botão de busca exibe o estado de carregamento durante a requisição.

#### Pré-Condições
- O usuário está na página `/lookup`

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher o campo com um número de pedido válido | Campo preenchido |
| 2  | Clicar em "Buscar Pedido" | O botão muda para estado de loading |
| 3  | Observar durante a requisição | O botão exibe indicador de carregamento |
| 4  | Aguardar a resposta | O botão retorna ao estado normal e o resultado é exibido |

#### Resultados Esperados
- O botão indica visualmente que a busca está em andamento.

#### Critérios de Aceitação
- O botão mostra estado de loading durante a requisição
- O botão retorna ao normal após a resposta

---

## Módulo: Navegação Geral e 404

---

### CT45 - Acessar rota inexistente (Página 404)

#### Objetivo
Validar que acessar uma rota inexistente exibe a página 404.

#### Pré-Condições
- A aplicação está rodando

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar uma URL inexistente (ex: `/pagina-que-nao-existe`) | A página 404 é renderizada |
| 2  | Verificar a mensagem | Exibe mensagem informando que a página não foi encontrada |
| 3  | Verificar o link de retorno | Um link para a página inicial (`/`) está disponível |
| 4  | Clicar no link de retorno | O sistema navega para a Landing Page |

#### Resultados Esperados
- Rotas inexistentes são tratadas com uma página 404 amigável.

#### Critérios de Aceitação
- Não exibe tela em branco ou erro genérico
- Oferece caminho de volta para a home

---

### CT46 - Acessar página de Termos de Uso

#### Objetivo
Validar que a página de Termos de Uso é acessível e exibe o conteúdo completo.

#### Pré-Condições
- A aplicação está rodando

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a rota `/termos` | A página de Termos é carregada |
| 2  | Verificar o conteúdo | 8 seções de termos são exibidas |
| 3  | Verificar o contato | Email contato@velo.com.br é exibido |

#### Resultados Esperados
- A página de Termos de Uso exibe todo o conteúdo legal.

#### Critérios de Aceitação
- A página carrega sem erros
- As 8 seções estão visíveis

---

### CT47 - Acessar página de Política de Privacidade

#### Objetivo
Validar que a página de Política de Privacidade é acessível e exibe o conteúdo completo.

#### Pré-Condições
- A aplicação está rodando

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a rota `/privacidade` | A página de Privacidade é carregada |
| 2  | Verificar o conteúdo | 10 seções de privacidade são exibidas |
| 3  | Verificar o contato | Email privacidade@velo.com.br é exibido |

#### Resultados Esperados
- A página de Política de Privacidade exibe todo o conteúdo.

#### Critérios de Aceitação
- A página carrega sem erros
- As 10 seções estão visíveis

---

### CT48 - Links de Termos e Privacidade no formulário de Checkout

#### Objetivo
Validar que os links no checkbox de termos do checkout abrem as páginas corretas.

#### Pré-Condições
- O usuário está na página `/order`

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Localizar o checkbox de termos | O texto exibe links para "Termos de Uso" e "Política de Privacidade" |
| 2  | Clicar no link "Termos de Uso" | Abre a rota `/termos` |
| 3  | Voltar à página de checkout | A página `/order` é carregada |
| 4  | Clicar no link "Política de Privacidade" | Abre a rota `/privacidade` |

#### Resultados Esperados
- Os links no checkout direcionam para as páginas legais corretas.

#### Critérios de Aceitação
- O link "Termos de Uso" aponta para `/termos`
- O link "Política de Privacidade" aponta para `/privacidade`
