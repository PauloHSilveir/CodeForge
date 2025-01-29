<h1 align="center">CodeForge</h1>
<p align="center">  
  Projeto fictício para a disciplina de Engenharia de Software da Universidade Federal de Lavras.  
</p>

## **📑 Descrição**  
O **Blue Star Events** é um sistema **WEB** desenvolvido para a empresa **Blue Star Events**, com o objetivo de centralizar, otimizar e organizar a gestão de eventos. O sistema oferece funcionalidades para que os **clientes** possam se cadastrar, fazer login, consultar e adquirir pacotes prontos. Os **administradores** podem gerenciar pacotes prontos e os componentes que os compõem, além de gerenciar outros administradores, com opções para cadastrá-los, visualizá-los, editá-los e excluí-los, garantindo eficiência operacional e uma experiência aprimorada para os clientes da empresa.

## **📋 Funcionalidades Principais**

- **Gestão de Cadastros (CRUD):** Clientes, pacotes de eventos, componentes e administradores.
- **Autenticação Segura:** Controle de acesso com diferentes níveis de permissões.
- **Controle de Disponibilidade:** Gerenciamento em tempo real de itens e serviços.
- **Solicitações de Serviços:** Registro e acompanhamento de solicitações de pacotes prontos e personalizados.

## **🚀 Tecnologias Utilizadas**  
- **🌐 Front-End:** React v18.3.1  
- **⚙️ Back-End:** Node.js v18
- **💾 Banco de Dados:** MySQL v8.0.36 e Sequelize 6.37
- **📡 Servidor:** Express v5 

## **📄 Regras de GitHub Utilizadas**

- **Commits significativos:** Mensagens descritivas e claras, que expliquem as mudanças realizadas.
- **Uso de Issues:** Registro de tarefas, bugs e melhorias.
- **Tags e Releases:** Versionamento do projeto com versões estáveis.
- **Branches organizadas:** Utilização de branches específicas para o desenvolvimento de novas funcionalidades ou correção de bugs, mantendo a branch principal (`main`) estável e pronta para deploy.

## **🛠️ Boas Práticas de Codificação**  

1. **Comentários e Documentação:**
   - Código claro e compreensível.
   - Comentários explicativos para partes complexas.
   - Métodos e funções com parâmetros e valores de retorno bem documentados.

2. **Código Limpo (Clean Code):**
   - **Nomes Significativos:** Nomes descritivos para variáveis, métodos e classes.
   - **Funções Curtas e Objetivas:** Cada função realiza uma única tarefa.

3. **Princípios SOLID:**
   - SRP (Single Responsibility Principle).
   - OCP (Open/Closed Principle).

4. **Tratamento de Erros:** Uso de exceções para erros excepcionais e tratamento apropriado de erros comuns.

5. **Testes Automatizados:** Garantia da qualidade do código com testes unitários e integrados.

6. **Padrões de Projeto:** Implementação de soluções reutilizáveis para problemas recorrentes.

## **📖 Como Rodar o Projeto**  

### **Back-End**
1. Clone o repositório:
   ```bash
   git clone https://github.com/PauloHSilveir/CodeForge.git
   ```
2. Navegue até o diretório do back-end:
   ```bash
   cd CodeForge/blue-star-events-back
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Crie o banco de dados no MySQL:
   ```sql
   CREATE DATABASE bluestarevents;
   ```
5. Execute as migrações para criar as tabelas:
   ```bash
   npx sequelize db:migrate
   ```
6. Inicie o servidor:
   ```bash
   npm run dev
   ```

### **Front-End**
7. Navegue até o diretório do front-end:
   ```bash
   cd CodeForge/blue-star-events-front
   ```
8. Instale as dependências:
   ```bash
   npm install
   ```
9. Inicie o servidor:
   ```bash
   npm run dev
   ```

## **📂 Estrutura de Pastas**

```
├── blue-star-events-back
│    ├── src
│    │    ├── config
│    │    ├── controllers
│    │    ├── database
│    │    │      └── migrations
│    │    ├── middlewares
│    │    ├── models
│    │    ├── modules
│    │    ├── resources
│    │    ├── routes
│    │    ├── services
│    │    └── utils
│    ├── uploads
│    ├── index.js
│    ├── .gitignore
│    ├── .sequelizerc
│    └── package.json
│
├── blue-star-events-front
│    ├── src
│    │     ├── assets
│    │     ├── components
│    │     ├── context
│    │     ├── pages
│    │     ├── pages
│    │     │      ├── Admin
│    │     │      ├── Client
│    │     │      └── Global
│    │     ├── styles
│    │     ├── utils
│    │     └── App.js
│    ├── .gitignore
│    └── package.json
│
├── Diagramas
│    ├── Diagrama de Classes.pdf
│    ├── Diagrama de Pacotes.pdf
│    ├── Diagrama de Implementação.pdf
│    └── Diagrama de Sequência.pdf
├── Padroes_Adotados
│    └── Regras_De_Verificação_E_Análise_De_Requisitos.pdf
├── Requisitos
│    └── Documento de Requisitos.pdf
├── package-lock.json
└── README.md
```

## **👥 Desenvolvedores**

- [Paulo Henrique](https://github.com/PauloHSilveir)
- [Gabriel Jardim](https://github.com/GNINE11)
- [Thiago Ferreira](https://github.com/Thiagoferreira13)
