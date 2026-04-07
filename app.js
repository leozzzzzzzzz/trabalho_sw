const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const rotas = require('./routes/routes');
const { Model } = require('objection');
const db = require('./db');

const app = express();

Model.knex(db);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Trabalho API',
    version: '1.0.0',
    description: 'Documentação da API de pedágio',
  },
  servers: [{ url: 'http://localhost:3000', description: 'Servidor local' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'error' },
          message: { type: 'string', example: 'Erro interno do servidor.' },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          auth: { type: 'boolean', example: true },
          token: { type: 'string', example: 'eyJhbGciOi...' },
        },
      },
      Tipo: {
        type: 'object',
        properties: {
          codigo: { type: 'integer', example: 1 },
          nome: { type: 'string', example: 'Carro' },
          tarifa: { type: 'number', example: 2.5 },
        },
      },
      Local: {
        type: 'object',
        properties: {
          codigo: { type: 'integer', example: 1 },
          nome: { type: 'string', example: 'Pedágio Norte' },
          localizacao: { type: 'string', example: 'São Paulo' },
        },
      },
      Veiculo: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          tipo: { type: 'integer', example: 1 },
          placa: { type: 'string', example: 'ABC-1234' },
          cor: { type: 'string', example: 'Prata' },
        },
      },
      Passagem: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          veiculo: { type: 'integer', example: 1 },
          local: { type: 'integer', example: 1 },
          data_hora: { type: 'string', format: 'date-time', example: '2026-04-07T12:30:00Z' },
          valor: { type: 'number', example: 15.5 },
          pago: { type: 'boolean', example: true },
        },
      },
      Usuario: {
        type: 'object',
        properties: {
          email: { type: 'string', example: 'admin@via.com' },
          cpf: { type: 'string', example: '00000000000' },
          telefone: { type: 'string', example: '11999999999' },
          nome: { type: 'string', example: 'Admin' },
          tipo: { type: 'string', example: 'admin' },
        },
      },
      LoginRequest: {
        type: 'object',
        properties: {
          email: { type: 'string', example: 'admin@via.com' },
          senha: { type: 'string', example: 'minhasenha' },
        },
        required: ['email', 'senha'],
      },
      UsuarioRequest: {
        type: 'object',
        properties: {
          email: { type: 'string', example: 'admin@via.com' },
          cpf: { type: 'string', example: '00000000000' },
          telefone: { type: 'string', example: '11999999999' },
          nome: { type: 'string', example: 'Admin' },
          tipo: { type: 'string', example: 'admin' },
          senha: { type: 'string', example: 'minhasenha' },
        },
        required: ['email', 'cpf', 'senha'],
      },
      TipoRequest: {
        type: 'object',
        properties: {
          nome: { type: 'string', example: 'Carro' },
          tarifa: { type: 'number', example: 2.5 },
        },
        required: ['nome', 'tarifa'],
      },
      LocalRequest: {
        type: 'object',
        properties: {
          nome: { type: 'string', example: 'Pedágio Norte' },
          localizacao: { type: 'string', example: 'São Paulo' },
        },
        required: ['nome', 'localizacao'],
      },
      VeiculoRequest: {
        type: 'object',
        properties: {
          tipo: { type: 'integer', example: 1 },
          placa: { type: 'string', example: 'ABC-1234' },
          cor: { type: 'string', example: 'Prata' },
        },
        required: ['tipo', 'placa', 'cor'],
      },
      PassagemRequest: {
        type: 'object',
        properties: {
          veiculo: { type: 'integer', example: 1 },
          local: { type: 'integer', example: 1 },
          data_hora: { type: 'string', format: 'date-time', example: '2026-04-07T12:30:00Z' },
          valor: { type: 'number', example: 15.5 },
          pago: { type: 'boolean', example: true },
        },
        required: ['veiculo', 'local', 'data_hora', 'valor', 'pago'],
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    '/login': {
      post: {
        tags: ['Segurança'],
        summary: 'Autenticação JWT',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Token JWT',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } },
          },
          '400': { description: 'Requisição inválida', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '401': { description: 'Autenticação inválida', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/usuario': {
      post: {
        tags: ['Usuario'],
        summary: 'Criar novo usuário',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UsuarioRequest' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Usuário criado com sucesso',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Usuario' } } },
          },
          '400': { description: 'Requisição inválida', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/usuario/{cpf}': {
      parameters: [{ name: 'cpf', in: 'path', required: true, schema: { type: 'string' } }],
      get: {
        tags: ['Usuario'],
        summary: 'Buscar usuário por CPF',
        responses: {
          '200': { description: 'Usuário encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Usuario' } } } },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '403': { description: 'Acesso negado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '404': { description: 'Usuário não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
      put: {
        tags: ['Usuario'],
        summary: 'Atualizar usuário por CPF',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UsuarioRequest' },
            },
          },
        },
        responses: {
          '200': { description: 'Usuário atualizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Usuario' } } } },
          '400': { description: 'Requisição inválida', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '403': { description: 'Acesso negado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '404': { description: 'Usuário não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/tipo': {
      get: {
        tags: ['Tipo'],
        summary: 'Listar tipos',
        responses: {
          '200': {
            description: 'Lista de tipos',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Tipo' } } } },
          },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
      post: {
        tags: ['Tipo'],
        summary: 'Criar novo tipo',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/TipoRequest' },
            },
          },
        },
        responses: {
          '201': { description: 'Tipo criado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Tipo' } } } },
          '400': { description: 'Requisição inválida', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/tipo/{codigo}': {
      parameters: [{ name: 'codigo', in: 'path', required: true, schema: { type: 'integer' } }],
      get: {
        tags: ['Tipo'],
        summary: 'Buscar tipo por código',
        responses: {
          '200': { description: 'Tipo encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Tipo' } } } },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '404': { description: 'Tipo não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
      put: {
        tags: ['Tipo'],
        summary: 'Atualizar tipo',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/TipoRequest' },
            },
          },
        },
        responses: {
          '200': { description: 'Tipo atualizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Tipo' } } } },
          '400': { description: 'Requisição inválida', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '404': { description: 'Tipo não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
      delete: {
        tags: ['Tipo'],
        summary: 'Remover tipo',
        responses: {
          '200': { description: 'Tipo removido', content: { 'application/json': { schema: { $ref: '#/components/schemas/Tipo' } } } },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '404': { description: 'Tipo não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/local': {
      get: {
        tags: ['Local'],
        summary: 'Listar locais',
        responses: {
          '200': {
            description: 'Lista de locais',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Local' } } } },
          },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
      post: {
        tags: ['Local'],
        summary: 'Criar novo local',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LocalRequest' },
            },
          },
        },
        responses: {
          '201': { description: 'Local criado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Local' } } } },
          '400': { description: 'Requisição inválida', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/local/{codigo}': {
      parameters: [{ name: 'codigo', in: 'path', required: true, schema: { type: 'integer' } }],
      get: {
        tags: ['Local'],
        summary: 'Buscar local por código',
        responses: {
          '200': { description: 'Local encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Local' } } } },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '404': { description: 'Local não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
      put: {
        tags: ['Local'],
        summary: 'Atualizar local',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LocalRequest' },
            },
          },
        },
        responses: {
          '200': { description: 'Local atualizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Local' } } } },
          '400': { description: 'Requisição inválida', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '404': { description: 'Local não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
      delete: {
        tags: ['Local'],
        summary: 'Remover local',
        responses: {
          '200': { description: 'Local removido', content: { 'application/json': { schema: { $ref: '#/components/schemas/Local' } } } },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '404': { description: 'Local não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/veiculo': {
      get: {
        tags: ['Veiculo'],
        summary: 'Listar veículos',
        responses: {
          '200': {
            description: 'Lista de veículos',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Veiculo' } } } },
          },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
      post: {
        tags: ['Veiculo'],
        summary: 'Criar novo veículo',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/VeiculoRequest' },
            },
          },
        },
        responses: {
          '201': { description: 'Veículo criado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Veiculo' } } } },
          '400': { description: 'Requisição inválida', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/veiculo/{id}': {
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
      get: {
        tags: ['Veiculo'],
        summary: 'Buscar veículo por id',
        responses: {
          '200': { description: 'Veículo encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Veiculo' } } } },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '404': { description: 'Veículo não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
      put: {
        tags: ['Veiculo'],
        summary: 'Atualizar veículo',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/VeiculoRequest' },
            },
          },
        },
        responses: {
          '200': { description: 'Veículo atualizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Veiculo' } } } },
          '400': { description: 'Requisição inválida', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '404': { description: 'Veículo não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
      delete: {
        tags: ['Veiculo'],
        summary: 'Remover veículo',
        responses: {
          '200': { description: 'Veículo removido', content: { 'application/json': { schema: { $ref: '#/components/schemas/Veiculo' } } } },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '404': { description: 'Veículo não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/passagem': {
      get: {
        tags: ['Passagem'],
        summary: 'Listar passagens',
        responses: {
          '200': {
            description: 'Lista de passagens',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Passagem' } } } },
          },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
      post: {
        tags: ['Passagem'],
        summary: 'Criar nova passagem',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PassagemRequest' },
            },
          },
        },
        responses: {
          '201': { description: 'Passagem criada', content: { 'application/json': { schema: { $ref: '#/components/schemas/Passagem' } } } },
          '400': { description: 'Requisição inválida', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
    '/passagem/{id}': {
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
      get: {
        tags: ['Passagem'],
        summary: 'Buscar passagem por id',
        responses: {
          '200': { description: 'Passagem encontrada', content: { 'application/json': { schema: { $ref: '#/components/schemas/Passagem' } } } },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '404': { description: 'Passagem não encontrada', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
      put: {
        tags: ['Passagem'],
        summary: 'Atualizar passagem',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PassagemRequest' },
            },
          },
        },
        responses: {
          '200': { description: 'Passagem atualizada', content: { 'application/json': { schema: { $ref: '#/components/schemas/Passagem' } } } },
          '400': { description: 'Requisição inválida', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '404': { description: 'Passagem não encontrada', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
      delete: {
        tags: ['Passagem'],
        summary: 'Remover passagem',
        responses: {
          '200': { description: 'Passagem removida', content: { 'application/json': { schema: { $ref: '#/components/schemas/Passagem' } } } },
          '401': { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
          '404': { description: 'Passagem não encontrada', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } },
        },
      },
    },
  },
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV === 'test') {
  app.get('/__test/error', (req, res) => {
    throw new Error('Erro interno simulado');
  });
}

app.use(rotas);

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Recurso não encontrado.' });
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ status: 'error', message: err.message || 'Erro interno do servidor.' });
});

module.exports = app;