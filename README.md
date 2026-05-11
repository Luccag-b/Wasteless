# Wasteless

Projeto front-end estático para cadastro, acompanhamento e análise de desperdícios, com navegação entre páginas e componentes construídos em HTML, CSS, JavaScript e Bootstrap.

## Visão Geral

O objetivo do projeto é apoiar o registro de desperdício, exibir um painel de recursos e permitir o envio de mensagens pela página de contato. As telas foram organizadas para funcionar como um conjunto de páginas independentes, mas com menu compartilhado e layout consistente.

## Páginas

- Página inicial: cadastro de usuário com perfis, dados pessoais e observações.
- Registro de desperdícios: formulário para informar data, tipo de alimento, quantidade, motivo, possibilidade de doação e frequência.
- Dashboard de recursos: painel com cartões de indicadores e atalhos para as principais ações.
- Relatórios automáticos: formulário para gerar resumo com período, sobra, produção, sugestões e histórico.
- Fale Conosco: formulário de contato com armazenamento das mensagens no navegador.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Bootstrap 5

## Estrutura do Projeto

```text
Wasteless-2/
├─ 01_cadastro_de_usuario.html
├─ css/
│  └─ style.css
├─ js/
│  └─ code.js
├─ pages/
│  ├─ 02_registro_desperdicio.html
│  ├─ 03_dashboard_recursos.html
│  ├─ 04_relatorios_automaticos.html
│  └─ 05_fale_conosco.html
```

## Como Usar

1. Abra `01_cadastro_de_usuario.html` no navegador para iniciar a navegação.
2. Use o menu do topo ou do rodapé para acessar as demais páginas.
3. Na página de contato, as mensagens ficam salvas no `localStorage` do navegador.

## Observações

- O projeto está em formato estático e não depende de backend.
- Os dados inseridos nos formulários não são enviados para um servidor.
- A persistência do formulário de contato acontece apenas localmente no navegador.

## Próximos Passos

- Publicar o projeto em um repositório GitHub.
- Substituir os arquivos do ramo principal com a versão final organizada.
- Opcionalmente, adicionar validações e refinamentos visuais nas páginas.