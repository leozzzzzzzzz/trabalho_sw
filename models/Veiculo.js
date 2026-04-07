const { Model } = require('objection');

class Veiculo extends Model {
    static get tableName() {
        return 'veiculos';
    }

    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        const Tipo = require('./Tipo');
        const Passagem = require('./Passagem');

        return {
            tipoRelacao: {
                relation: Model.BelongsToOneRelation,
                modelClass: Tipo,
                join: {
                    from: 'veiculos.tipo',
                    to: 'tipos.codigo'
                }
            },
            passagens: {
                relation: Model.HasManyRelation,
                modelClass: Passagem,
                join: {
                    from: 'veiculos.id',
                    to: 'passagens.veiculo'
                }
            }
        };
    }
}

module.exports = Veiculo;
