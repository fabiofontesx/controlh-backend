const ModelEmpresas = require('../models/Empresas');
const ModelProjetos = require('../models/Projetos');
const ModelFuncionarios = require('../models/Funcionarios');

module.exports = {
    async store(req, res){
        const  {id_empresa,  descricao, dtInicio} = req.body;

        const empresa = await ModelEmpresas.findByPk(id_empresa);
        if(!empresa){ 
            return res.status(404).json({criado: false, mensagem: 'Empresa não existe!'});
        }

        const projeto = await ModelProjetos.create({descricao, dtInicio});
        empresa.addProjeto(projeto);

        return res.status(201).json({criado: true, mensagem: 'Projeto criado com sucesso!'})
    },

    async addProjetoFuncionario(req, res){
        const { idProjeto, idFuncionario} = req.body;
        const projeto = await ModelProjetos.findByPk(idProjeto);
        if(!projeto){
            return res.status(404).json({vinculado: false, mensagem: 'Projeto não existe!'});
        }

        const funcionario = await ModelFuncionarios.findByPk(idFuncionario);
        if(!funcionario){
            return res.status(404).json({vinculado: false, mensagem: 'Funcionario não existe!'});

        }

        const projetoFuncionario = await funcionario.getProjetos({
            where: {
                id: idProjeto
            }
        });

        if(projetoFuncionario.length > 0 ){
            return res.status(501).json({vinculado: false, mensagem: `O projeto ${idProjeto} já está vinculado ao funcionario ${idFuncionario}`});
        }

        await funcionario.addProjetos(projeto);
        return res.status(200).json({vinculado: true, mensagem: 'Projeto vinculado!'});
    },

    async getProjetosFuncionario(req,res){
        const {idFuncionario}  = req.query;
        const funcionario = await ModelFuncionarios.findByPk(idFuncionario);
        if(!funcionario){
            return res.status(404).json({ mensagem: 'Funcionario não existe!'});
        }
        const projetos = await funcionario.getProjetos();

        return res.status(200).json({projetos})
    }

}