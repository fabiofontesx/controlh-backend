const ModelEmpresas = require('../models/Empresas');

module.exports = {
    async findByNomeFantasia(req, res){
        const {nomeFantasia} = req.query;
        const empresa = await ModelEmpresas.findOne({
            where: {
                nomeFantasia
            }
        });

        if(!empresa){
            return res.status(404);
        }

        return res.status(200).json(empresa);
    },
    
    async store(req, res){
        const { cnpj, nomeFantasia } = req.body;

        const cnpjJaCadastrado = await ModelEmpresas.findOne({
            where: {cnpj}
        });

        if(cnpjJaCadastrado){
            return res.status(501).json({criado: false, mensagem: `A empresa ${cnpj} já existe`, empresa});
        }

        await ModelEmpresas.create({cnpj, nomeFantasia});

        return res.status(201).json({criado: true, mensagem: 'Empresa criada com sucesso!'});
    },

}