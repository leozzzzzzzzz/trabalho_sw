const tipoServices = require('../services/tipoServices');
const TipoDAO = require('../dao/tipoDAO');

jest.mock('../dao/tipoDAO', () => ({
  getTipoByCodigo: jest.fn(),
  getTipos: jest.fn(),
  addTipo: jest.fn(),
  updateTipo: jest.fn(),
  deleteTipo: jest.fn(),
}));

describe('tipoServices', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw a 404-style Error when tipo is not found by código', async () => {
    TipoDAO.getTipoByCodigo.mockResolvedValue(null);

    await expect(tipoServices.getTipoByCodigoDB(19999)).rejects.toThrow('Tipo não encontrado');
  });

  it('should preserve the original error message when DAO fails unexpectedly', async () => {
    TipoDAO.getTipoByCodigo.mockRejectedValue(new Error('DB offline'));

    await expect(tipoServices.getTipoByCodigoDB(19999)).rejects.toThrow('Erro ao buscar tipo: DB offline');
  });
});
