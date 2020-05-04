const ModelUsuarios = require('../models/Usuarios');
const ModelFuncionarios = require('../models/Funcionarios');

const bcrypt = require('bcrypt');
const { Op }  = require( 'sequelize');
const jwt = require('jsonwebtoken');

module.exports = {
    async login(req, res){
        const { usuario, senha } = req.body;
        if(!usuario || !senha){
            return res.status(500).json({auth: false, erro:'Usuário ou Senha não preenchidos!'});
        }

        const usuarioLogin = await ModelUsuarios.findOne({
            where: {
                [Op.and]: [{usuario}]
            },
        });

        if(!usuarioLogin){
            return res.status(404).json({auth: false, erro: 'Usuario não existe'});
        }
        
        const senhaMatches = await bcrypt.compare(senha, usuarioLogin.senha);
        if(!senhaMatches){
            return res.status(401).json({auth: false, erro: 'Senha incorreta'});
        }

        const funcionario = await usuarioLogin.getFuncionario({
            attributes:['id', 'nome', 'matricula', 'id_cargo', 'avatar']
        });

        const token = jwt.sign({usuarioLogin}, process.env.SECRET, {expiresIn: "2 days"});
        return res.status(200).json({id: usuarioLogin.id, auth: true, token, funcionario});
    },

    async store(req, res){
        const { matricula, senha, usuario, avatar } = req.body;
        const funcionarioExists = await ModelFuncionarios.findOne({
            where: { matricula }
        });
        
        if(!funcionarioExists){
            return res.status(404).json({criado: false, erro: `O funcionário ${matricula} não existe`});
        }

        const usuarioFuncionario = await funcionarioExists.getUsuario();
        if(usuarioFuncionario){
            return res.status(406).json({criado: false, erro: `O funcionário ${matricula} já possui um usuário cadastrado`});
        }

        const usuarioCriado = await ModelUsuarios.create({usuario, senha, avatar});
        await usuarioCriado.setFuncionario(funcionarioExists);
        return res.status(201).json({criado: true});
    },

    async changePassword(req, res ){
        const { id, senhaAtual, novaSenha } = req.body;
        const usuario = await ModelUsuarios.findByPk(id);

        if(!usuario){
            return res.status(404).json({alterado: false, erro: 'Usuario não existe'});
        }

        const senhaMatches = await bcrypt.compare(senhaAtual, usuario.senha);
        if(!senhaMatches){
            return res.status(401).json({alterado: false, erro: 'Senha anterior incorreta'});
        }

        usuario.senha = novaSenha;
        await usuario.save();
        return res.status(200).json({alterado:true, message: 'Alterado Com Sucesso! Voltando para Home'})
    }
}