const ModelUsuarios = require('../models/Usuarios');
const { Op }  = require( 'sequelize');
const jwt = require('jsonwebtoken');

module.exports = {
    async login(req, res){
        const { usuario, senha } = req.body;
        const idUsuario = await ModelUsuarios.findOne({
            where: {
                [Op.and]: [{usuario}, {senha}]
            },
            attributes: [ 'id' ]
        });
        if(!idUsuario){
            return res.status(404).json({auth: false, erro: 'Usuario não existe'});
        }

        const token = jwt.sign({idUsuario}, process.env.SECRET, {expiresIn: "2 days"});
        return res.status(200).json({auth: true, token});
    }
}