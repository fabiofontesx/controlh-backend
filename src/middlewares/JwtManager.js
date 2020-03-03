const jwt = require('jsonwebtoken');

module.exports = { 
    async verifyToken(req, res, next){
        let { authorization } = req.headers;
        if(!authorization){
            return res.status(401).json({ sucesso: false, erro: 'Token não enviado'});
        } else if(authorization.startsWith('Bearer ')){
            authorization = authorization.slice(7, authorization.length);
        }
        try{
            await jwt.verify(authorization, process.env.SECRET);
            next();
        }catch(e){
            return res.status(500).json({sucesso: false, erro: 'Token inválido'});
        }
    }
}