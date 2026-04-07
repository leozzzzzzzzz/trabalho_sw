API pata o trabalho de Serviços Web.

##  Cenário

Sistema de controle de pedágios

## Instruções de execução:

1. Clone o repositório
2. Execute o `docker compose up -d` para inicializar o banco de dados
3. execute `npm install` para baixar as dependências
4. execute `npm start` para iniciar o servidor

### Relacionamentos Principais

- **Veículo e Pedágio**: Um veículo pode registrar passagens em múltiplos pedágios ao longo do tempo.
- **Motorista e Veículo**: Cada veículo é associado a um motorista responsável, com possibilidade de múltiplos motoristas por veículo em cenários compartilhados.
- **Passagem**: Cada passagem gera uma transação de pagamento.

### Stack 
- Postgres para persistência em banco de dados
- Express.js para servidor HTTP
- Swagger para documentação
- Objection + Knex para mapeamento (ORM)
- Jest para testes automatizados.

### Documentação OpenAPI

A API disponibiliza documentação Swagger em `/api-docs`.

### Testes

- Suíte de testes automática com Jest disponível em `tests/`
- Comando: `npm test`
- Atualmente existem testes de erro/validação de API e testes de serviço de `tipo`
- Postman collection disponível em `TrabalhoSW.postman_collection.json`



