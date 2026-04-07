const request = require('supertest');
const app = require('../app');

describe('API Error Handling', () => {
  it('should respond 200 OK for a working route', async () => {
    const response = await request(app).get('/api-docs/');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);
  });

  it('should respond 404 for an unknown route', async () => {
    const response = await request(app).get('/rota-nao-existe');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ status: 'error', message: 'Recurso não encontrado.' });
  });

  it('should respond 400 when login body is invalid', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'admin@via.com' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ auth: false, message: 'E-mail e senha são obrigatórios.' });
  });

  it('should respond 500 for internal server errors in test mode', async () => {
    const response = await request(app).get('/__test/error');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ status: 'error', message: 'Erro interno simulado' });
  });
});
