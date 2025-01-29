const {Model, DataTypes} = require('sequelize');

class Transacao extends Model {
    static init(sequelize) {
        super.init({
            usuario_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            pagamento_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            evento_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            data : {
                type: DataTypes.DATE,
                allowNull: false,
                validade: {
                    isDate: {
                        msg: "A data deve ser válida"
                    }
                },
            },
        }, {
            sequelize,
            tableName: 'transacoes',
        });
    }

    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'usuario_id', as: 'usuario'
        });

        this.belongsTo(models.Pagamento, {
            foreignKey: 'pagamento_id', as: 'pagamento'
        });
        this.belongsTo(models.Evento, {
            foreignKey: 'evento_id', as: 'evento'
        });
        
        this.hasMany(models.TransacaoPacote, { as: 'transacao_pacotes', foreignKey: 'transacao_id' });
        

    }
}

module.exports = Transacao;