const { Model } = require('objection');

class Tipo extends Model {
    static get tableName() {
        return 'tipos';
    }

    static get idColumn() {
        return 'codigo';
    }

    static get relationMappings() {
        const Veiculo = require('./Veiculo');

        return {
            veiculos: {
                relation: Model.HasManyRelation,
                modelClass: Veiculo,
                join: {
                    from: 'tipos.codigo',
                    to: 'veiculos.tipo'
                }
            }
        };
    }
}

module.exports = Tipo;
