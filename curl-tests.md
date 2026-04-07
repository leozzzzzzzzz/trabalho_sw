# Testes da API com cURL

Este arquivo contém comandos cURL para testar os endpoints da API. Certifique-se de que o servidor esteja rodando em `http://localhost:3000` (execute `npm start`).

## 1. Login (obter token JWT)

Primeiro, faça login para obter um token de autenticação:

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@via.com", "senha": "admin123"}'
```

**Resposta esperada:** Um JSON com `auth: true` e um `token`. Copie o token para usar nos próximos comandos.

Exemplo de resposta:
```json
{
  "auth": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Substitua `<TOKEN>` nos comandos abaixo pelo token obtido.

## 2. Tipos de Veículo

### Listar todos os tipos
```bash
curl -X GET http://localhost:3000/tipo \
  -H "Authorization: Bearer <TOKEN>"
```

### Obter tipo por código
```bash
curl -X GET http://localhost:3000/tipo/1 \
  -H "Authorization: Bearer <TOKEN>"
```

### Adicionar novo tipo
```bash
curl -X POST http://localhost:3000/tipo \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"nome": "Ônibus", "tarifa": 15.00}'
```

### Atualizar tipo
```bash
curl -X PUT http://localhost:3000/tipo/4 \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"nome": "Ônibus", "tarifa": 20.00}'
```

### Deletar tipo
```bash
curl -X DELETE http://localhost:3000/tipo/4 \
  -H "Authorization: Bearer <TOKEN>"
```

## 3. Locais

### Listar todos os locais
```bash
curl -X GET http://localhost:3000/local \
  -H "Authorization: Bearer <TOKEN>"
```

### Obter local por código
```bash
curl -X GET http://localhost:3000/local/1 \
  -H "Authorization: Bearer <TOKEN>"
```

### Adicionar novo local
```bash
curl -X POST http://localhost:3000/local \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"nome": "Pedágio Oeste", "localizacao": "BR-101 km 200"}'
```

### Atualizar local
```bash
curl -X PUT http://localhost:3000/local/4 \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"nome": "Pedágio Oeste Atualizado", "localizacao": "BR-101 km 210"}'
```

### Deletar local
```bash
curl -X DELETE http://localhost:3000/local/4 \
  -H "Authorization: Bearer <TOKEN>"
```

## 4. Veículos

### Listar todos os veículos
```bash
curl -X GET http://localhost:3000/veiculo \
  -H "Authorization: Bearer <TOKEN>"
```

### Obter veículo por ID
```bash
curl -X GET http://localhost:3000/veiculo/1 \
  -H "Authorization: Bearer <TOKEN>"
```

### Adicionar novo veículo
```bash
curl -X POST http://localhost:3000/veiculo \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"tipo": 2, "placa": "XYZ1234", "cor": "Azul"}'
```

### Atualizar veículo
```bash
curl -X PUT http://localhost:3000/veiculo/5 \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"tipo": 2, "placa": "XYZ5678", "cor": "Verde"}'
```

### Deletar veículo
```bash
curl -X DELETE http://localhost:3000/veiculo/5 \
  -H "Authorization: Bearer <TOKEN>"
```

## 5. Passagens

### Listar todas as passagens
```bash
curl -X GET http://localhost:3000/passagem \
  -H "Authorization: Bearer <TOKEN>"
```

### Obter passagem por ID
```bash
curl -X GET http://localhost:3000/passagem/1 \
  -H "Authorization: Bearer <TOKEN>"
```

### Adicionar nova passagem
```bash
curl -X POST http://localhost:3000/passagem \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"veiculo": 1, "local": 1, "valor": 5.00, "pago": true}'
```

### Atualizar passagem
```bash
curl -X PUT http://localhost:3000/passagem/5 \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"veiculo": 1, "local": 1, "valor": 5.00, "pago": false}'
```

### Deletar passagem
```bash
curl -X DELETE http://localhost:3000/passagem/5 \
  -H "Authorization: Bearer <TOKEN>"
```

## 6. Usuários

### Cadastrar novo usuário (não requer token)
```bash
curl -X POST http://localhost:3000/usuario \
  -H "Content-Type: application/json" \
  -d '{"email": "teste@email.com", "senha": "senha123", "cpf": "11122233344", "telefone": "(11)99999-9999", "nome": "Teste Usuario"}'
```

### Obter usuário por CPF (requer token do próprio usuário)
```bash
curl -X GET http://localhost:3000/usuario/00000000000 \
  -H "Authorization: Bearer <TOKEN>"
```

### Atualizar usuário (requer token do próprio usuário)
```bash
curl -X PUT http://localhost:3000/usuario/00000000000 \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@via.com", "senha": "novaSenha", "telefone": "(11)99999-0001", "nome": "Admin Atualizado"}'
```

## Notas
- Todos os endpoints (exceto login e cadastro de usuário) requerem autenticação JWT via header `Authorization: Bearer <token>`.
- Use dados válidos baseados no schema do banco (ex.: tipos existentes, placas no formato correto).
- Verifique as respostas para códigos de status HTTP (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, etc.).
- Para testar erros, tente acessar sem token ou com dados inválidos.