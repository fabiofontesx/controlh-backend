const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

async function crypto(usuario){
    usuario.senha = await bcrypt.hash(usuario.senha, 7);
}

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
            hooks: {
                beforeCreate: crypto,
                beforeUpdate: crypto
            }
        })
    }


    static associate(models){
        this.belongsTo(models.Funcionarios, { foreignKey: 'id_funcionario', as: 'funcionario'});
    }


}

module.exports = Usuarios;