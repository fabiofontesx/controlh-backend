const ModelProjetos = require('../models/Projetos');
const ModelFuncionarios = require('../models/Funcionarios');
const ModelApontamentos = require('../models/Apontamentos');

const { Op } = require('sequelize');

module.exports = {
    async addApontamento(req, res) {
        const { idFuncionario, idProjeto, inicio, fim, observacao, data } = req.body;

        const funcionario = await ModelFuncionarios.findByPk(idFuncionario);
        if (!funcionario) {
            return res.status(404).json({ adicionado: false, mensagem: `Funcionario não existe!` })
        }

        const projeto = await ModelProjetos.findByPk(idProjeto);
        if (!projeto) {
            return res.status(404).json({ adicionado: false, mensagem: `Projeto não existe` })
        }

        const apontamento = await ModelApontamentos.create({
            id_funcionario: idFuncionario,
            id_projeto: idProjeto,
            data,
            inicio,
            fim,
            observacao
        });

        return res.status(201).json({ adicionado: true, mensagem: `Apontamento realizado com sucesso!`, apontamento });
    },

    async findAllByFuncionario(req, res) {
        const { idFuncionario, data } = req.query;
        const apontamentos = await ModelApontamentos.findAll({
            where: {
                id_funcionario: idFuncionario,
            }
        });

        return res.status(200).json({ apontamentos })
    },

    async findByFuncionarioAndData(req, res) {
        const { idFuncionario, data } = req.query;
        const apontamentos = await ModelApontamentos.findAll({
            where: {
                [Op.and] : [
                    {id_funcionario: idFuncionario},
                    {data}
                ]
            },
            include: {
                association: 'projeto',
                attributes: ['descricao']
            }
        });
        
        return res.status(200).json({ apontamentos })
    },

    async deleteById(req, res){
        const {id} = req.params;
        await ModelApontamentos.destroy({
            where: {
                id
            }
        })

        return res.status(200).send();
    }


} 