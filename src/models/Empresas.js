const { Model, DataTypes } = require('sequelize');

class Empresas extends Model {
    static init(connection) {
        super.init({
            cnpj: {
                type: DataTypes.STRING,
                allowNull: false
              },
              nomeFantasia: {
                type: DataTypes.STRING,
                allowNull: false,
                field: "nome_fantasia"
              }
        }, {
            sequelize: connection,
            tableName: 'empresas',
            timestamps: false
        })
    }

    static associate(models){
        this.hasMany(models.Projetos, { foreignKey: 'id_empresa', as: 'projeto'});
    }
}

module.exports = Empresas;