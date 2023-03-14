const UserService = require('../services/userService');
const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role}, 
        process.env.JWT_KEY,
        {expiresIn: '24h'}
    )
}

class UserController{

    async registration(req, res, next) {
        try {
            const user = await UserService.registerUser(req.body)
            const token = generateJwt(user.id, user.email, user.role)
            return res.json(token)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async login(req, res, next) {
        try {
            const user = await UserService.userLogin(req.body)
            const token = generateJwt(user.id, user.email, user.role)
            return res.json(token)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

}

module.exports = new UserController()
