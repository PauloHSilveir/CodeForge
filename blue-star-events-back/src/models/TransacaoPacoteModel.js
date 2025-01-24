const {Model, DataTypes} = require('sequelize');

class TransacaoPacote extends Model {
    static init(sequelize) {
        super.init({
            transacao_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Transacao',
                    key: 'id'
                }
            },
            pacote_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Pacote',
                    key: 'id'
                }
            },
            quantidade_pacote: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'transacao_pacote',
        });
    }
    
    
    static associate(models) {
        this.belongsTo(models.Transacao, {
            foreignKey: 'transacao_id', as: 'transacao'
        });

        this.belongsTo(models.Pacote, {
            foreignKey: 'pacote_id', as: 'pacote'
        });

    }
}

module.exports = TransacaoPacote;