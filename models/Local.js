const { Model } = require('objection');

class Local extends Model {
    static get tableName() {
        return 'locais';
    }

    static get idColumn() {
        return 'codigo';
    }

    static get relationMappings() {
        const Passagem = require('./Passagem');

        return {
            passagens: {
                relation: Model.HasManyRelation,
                modelClass: Passagem,
                join: {
                    from: 'locais.codigo',
                    to: 'passagens.local'
                }
            }
        };
    }
}

module.exports = Local;
