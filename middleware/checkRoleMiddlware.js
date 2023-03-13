const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (role) {
    return function (req, res, next) {
        if(req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token) {
                return res.status(401).json({message: 'Пользователь не авторизован на сайте'})
            }
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            if(decoded.role !== role) {
                return res.status(403).json({message: 'Доступ запрещён'})
            }
            req.user = decoded
            next()
        } catch(e) {
            console.log(e)
            return res.status(401).json({message: 'Пользователь не авторизован'})
        }
    }
}


