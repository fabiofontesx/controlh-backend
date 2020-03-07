const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

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
            timestamps: false,
        })
    }


    static associate(models){
        this.hasOne(models.Funcionarios, { foreignKey: 'id_usuario', as: 'funcionario'});
    }


}

module.exports = Usuarios;