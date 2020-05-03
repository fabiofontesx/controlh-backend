const { Model, DataTypes } = require('sequelize');

class Projetos extends Model {
    static init(connection) {
        super.init({
            descricao: {
                type: DataTypes.STRING,
                allowNull: false,
              },
              dtInicio: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                field: "dt_inicio"
              }
        }, {
            sequelize: connection,
            tableName: 'projetos',
            timestamps: false
        })
    }

    static associate(models){
        this.belongsTo(models.Empresas, { foreignKey: 'id_empresa', as: 'projeto'});
        this.belongsToMany(models.Funcionarios, { foreignKey: 'id_projeto', as: 'funcionario', through: 'projeto_funcionario', timestamps:false})
    }
}

module.exports = Projetos;