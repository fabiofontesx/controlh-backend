const ModelFuncionarios = require('../models/Funcionarios');

const { Op } = require('sequelize');
module.exports = {
    async findByMatricula(req, res){
        const {matricula} = req.params;
        const funcionario = await ModelFuncionarios.findOne({
            where: {matricula},
            include: { association: 'cargo', attributes: [ 'descricao' ]},
            attributes: [ 'id', 'nome', 'matricula', 'email']
        });
        if(!funcionario){
            return res.status(404).json({ mensagem: `Funcionario ${matricula} nao existe!`})
        }
        return res.status(200).json(funcionario)
    },
    
    async store(req, res){
        const { nome, matricula, email, id_cargo, usuario } = req.body;

        let funcionario = await ModelFuncionarios.findOne({
            where: {
                matricula
            }
        });
        if(funcionario){
            return res.status(501).json({criado: false, mensagem: `O funcionário ${matricula} já existe`, funcionario});
        }

        funcionario = await ModelFuncionarios.create({nome, matricula, email, id_cargo, usuario});
        return res.status(201).json({criado: true, mensagem: 'Usuário criado com sucesso!'});
    },

    async getAll(req, res){
        const funcionarios = await ModelFuncionarios.findAll({
            include: {association: 'cargo', attributes:['descricao']},
            attributes:['id', 'nome', 'matricula',  'email']
        });
        return res.status(200).json({funcionarios});
    },

    
}