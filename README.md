# 🌱 WasteLess

### Sistema de Monitoramento de Desperdício Alimentar

> **Dados que transformam desperdício em eficiência alimentar.**

O **WasteLess** é uma aplicação web desenvolvida para auxiliar estabelecimentos do setor alimentício a **registrar, acompanhar e analisar desperdícios de alimentos**, transformando dados operacionais em informações úteis para a tomada de decisão.

O projeto busca unir **tecnologia, eficiência operacional e sustentabilidade**, permitindo identificar padrões de desperdício e apoiar ações para reduzir perdas, melhorar processos e incentivar o reaproveitamento de alimentos.

O WasteLess é desenvolvido como projeto acadêmico do curso de **Engenharia de Software da FIAP**, com foco na **ODS 2 da ONU — Fome Zero e Agricultura Sustentável**.

---

## 🎯 Proposta de Valor

Muitos estabelecimentos ainda não possuem ferramentas adequadas para mensurar quanto alimento é perdido e quais são as principais causas dessas perdas.

O WasteLess propõe transformar essas informações em dados estruturados, permitindo:

* monitorar desperdícios;
* identificar padrões e causas;
* apoiar decisões de produção;
* reduzir perdas operacionais;
* incentivar reaproveitamento e doações;
* acompanhar indicadores e relatórios.

### Fluxo da solução

```text
Registro → Monitoramento → Análise → Decisão → Redução de Desperdício
```

---

## 🚀 Funcionalidades

A aplicação possui atualmente os seguintes módulos:

* 👤 **Cadastro de Usuários**
* 🍽️ **Registro de Desperdícios**
* 📊 **Dashboard de Recursos**
* 📈 **Relatórios Automáticos**
* 💬 **Fale Conosco**

A arquitetura baseada em React permite que novas funcionalidades sejam incorporadas de forma modular durante a evolução do projeto.

---

## 🛠️ Tecnologias Utilizadas

### Front-end

* **HTML5**
* **CSS3**
* **JavaScript**
* **JSX**
* **React**
* **Vite**

### Desenvolvimento

* **Node.js / npm**
* **ESLint**
* **Git**
* **GitHub**

### Principais tecnologias

| Tecnologia       | Utilização                            |
| ---------------- | ------------------------------------- |
| React            | Construção da interface e componentes |
| JavaScript / JSX | Lógica e estrutura dos componentes    |
| CSS3             | Estilização da aplicação              |
| HTML5            | Estrutura base da aplicação           |
| Vite             | Ambiente de desenvolvimento e build   |
| npm              | Gerenciamento de dependências         |
| ESLint           | Padronização e qualidade do código    |

---

## 🧩 Arquitetura

O projeto utiliza uma arquitetura baseada em **componentes React**, separando elementos reutilizáveis, páginas e arquivos de estilização.

```text
wasteless/
│
├── node_modules/
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── Footer.jsx
│   │   └── Header.jsx
│   │
│   ├── css/
│   │   └── style.css
│   │
│   ├── img/
│   │   └── logo-wateless.png
│   │
│   ├── pages/
│   │   ├── Cadastro.jsx
│   │   ├── DashboardRecursos.jsx
│   │   ├── FaleConosco.jsx
│   │   ├── RegistroDesperdicio.jsx
│   │   └── RelatoriosAutomaticos.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

### Organização

**`components/`**
Componentes reutilizáveis da interface, como `Header` e `Footer`.

**`pages/`**
Contém as principais páginas e funcionalidades da aplicação.

**`css/`**
Centraliza os estilos personalizados do projeto.

**`img/`**
Armazena os recursos visuais da aplicação.

**`App.jsx`**
Componente principal responsável pela estrutura da aplicação.

**`main.jsx`**
Ponto de entrada da aplicação React.

---

## ⚙️ Como Executar

### 1. Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/wasteless.git
```

### 2. Acesse o projeto

```bash
cd wasteless
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o ambiente de desenvolvimento

```bash
npm run dev
```

O Vite iniciará o servidor local e informará no terminal o endereço para acessar a aplicação.

---

## 🔭 Próximos Passos

Entre as possíveis evoluções do WasteLess estão:

* integração com banco de dados;
* autenticação de usuários;
* persistência dos registros;
* dashboards alimentados por dados reais;
* gráficos analíticos;
* histórico de desperdícios;
* geração dinâmica de relatórios;
* sugestões inteligentes para redução de perdas;
* integração com sistemas externos.

---

## 🌍 Impacto

O WasteLess está alinhado à **ODS 2 — Fome Zero e Agricultura Sustentável**, utilizando tecnologia para apoiar uma gestão mais eficiente dos alimentos.

A proposta é simples:

> **Transformar desperdício em informação e informação em decisões melhores.**

---

## 🎓 Projeto Acadêmico

**Instituição:** FIAP
**Curso:** Engenharia de Software
**Projeto:** WasteLess
**Área:** Monitoramento de Desperdício Alimentar
**Ano:** 2026
**ODS:** ODS 2 — Fome Zero e Agricultura Sustentável

---

## 🌱 WasteLess

**Tecnologia para transformar desperdício em eficiência alimentar.**
