const { Model } = require('objection');

class Passagem extends Model {
    static get tableName() {
        return 'passagens';
    }

    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        const Veiculo = require('./Veiculo');
        const Local = require('./Local');

        return {
            veiculoRelacao: {
                relation: Model.BelongsToOneRelation,
                modelClass: Veiculo,
                join: {
                    from: 'passagens.veiculo',
                    to: 'veiculos.id'
                }
            },
            localRelacao: {
                relation: Model.BelongsToOneRelation,
                modelClass: Local,
                join: {
                    from: 'passagens.local',
                    to: 'locais.codigo'
                }
            }
        };
    }
}

module.exports = Passagem;
