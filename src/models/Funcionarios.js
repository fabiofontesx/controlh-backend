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
            }, 
            avatar: {
                type: DataTypes.TEXT('long'),
                allowNull: true
            }
        }, {
            sequelize: connection,
            tableName: 'funcionarios',
            timestamps: false
        })
    }

    static associate(models){
        this.belongsTo(models.Cargos, { foreignKey: 'id_cargo', as: 'cargo'});
        this.hasOne(models.Usuarios, {foreignKey: 'id_funcionario', as: 'usuario'});
        this.belongsToMany(models.Projetos, {foreignKey: 'id_funcionario', as: 'projetos', through: 'projeto_funcionario', timestamps:false})
        
        this.hasMany(models.Apontamentos, {foreignKey: 'id_funcionario', as: 'apontamentos'});
    }
}

module.exports = Funcionarios;