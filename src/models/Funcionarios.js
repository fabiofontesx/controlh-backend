const { Model, DataTypes } = require('sequelize');

class Funcionarios extends Model {
    static init(connection) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            matricula: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize: connection,
            tableName: 'funcionarios',
            timestamps: false
        })
    }

    static associate(models){
        this.belongsTo(models.Cargos, { foreignKey: 'id_cargo', as: 'cargo'})
        this.hasOne(models.Usuarios, {as: 'usuario'})
    }
}

module.exports = Funcionarios;