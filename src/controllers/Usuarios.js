const ModelUsuarios = require('../models/Usuarios');
const ModelFuncionarios = require('../models/Funcionarios');

const bcrypt = require('bcrypt');
const { Op }  = require( 'sequelize');
const jwt = require('jsonwebtoken');

module.exports = {
    async login(req, res){
        const { usuario, senha } = req.body;
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
            attributes:['id', 'matricula', 'id_cargo']
        });
        const token = jwt.sign({usuarioLogin}, process.env.SECRET, {expiresIn: "2 days"});
        return res.status(200).json({auth: true, token, funcionario});
    },

    async store(req, res){
        const { matricula, senha, usuario } = req.body;
        const funcionarioExists = await ModelFuncionarios.findOne({
            where: { matricula }
        });
        
        if(!funcionarioExists){
            return res.status(404).json({criado: false, erro: `O funcionário ${matricula} não existe`});
        }

        const idUsuarioFuncionario = funcionarioExists.id_usuario;
        if(idUsuarioFuncionario){
            const {usuario} = await ModelUsuarios.findByPk(idUsuarioFuncionario, 
                { attributes: [ 'usuario' ]}
            );

            return res.status(406).json({criado: false, erro: `O funcionario ${matricula} já possui um usuario cadastrado`, usuario})
        }

        const usuarioCriado = await ModelUsuarios.create({usuario, senha});
        await usuarioCriado.setFuncionario(funcionarioExists);
        return res.status(201).json({criado: true});
    }
}