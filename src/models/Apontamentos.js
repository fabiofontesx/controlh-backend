const { Model, DataTypes } = require('sequelize');

class Apontamentos extends Model {
    static init(connection) {
        super.init({
            inicio: {
                type: DataTypes.DATE,
                allowNull: false,
            },

            data: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },

            fim: {
                type: DataTypes.DATE,
                allowNull: false,

            },

            observacao: {
                type: DataTypes.TEXT
            }
        }, {
            sequelize: connection,
            tableName: 'apontamentos',
            timestamps: false
        })
    }
    static associate(models) {
        this.belongsTo(models.Funcionarios, { foreignKey: 'id_funcionario', as: 'funcionario' })
        this.belongsTo(models.Projetos, { foreignKey: 'id_projeto', as: 'projeto' })
    }
}

module.exports = Apontamentos;