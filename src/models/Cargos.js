const { Model, DataTypes} = require('sequelize');

class Cargos extends Model{
    static init(connection){
        super.init({
            descricao: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        }, {
            sequelize: connection,
            tableName: 'cargos',
            timestamps: false
        })
    }
    static associate(models){
        this.hasMany(models.Funcionarios, { foreignKey: 'id_cargo', as: 'funcionarios'})
    }
}

module.exports = Cargos;