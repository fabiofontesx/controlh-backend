const { Model, DataTypes } = require('sequelize');

class Usuarios extends Model {
    static init(connection) {
        super.init({
            usuario: {
                type: DataTypes.STRING,
                allowNull: false
            },
            senha: {
                type: DataTypes.STRING,
                allowNull: false
            },
        }, {
            sequelize: connection,
            tableName: 'usuarios',
        })
    }

    static associate(models){
        this.belongsTo(models.Funcionarios, { foreignKey: 'funcionario_id', as: 'funcionario'})
    }

}

module.exports = Usuarios;