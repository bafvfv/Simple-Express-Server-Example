const TypeService = require('../services/typeService');
const ApiError = require('../error/ApiError');

class TypeController{

    async create(req, res, next) {
        try {
            const type = await TypeService.createType(req.body)
            return res.json(type)

        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const all = await TypeService.getAllTypes()
        return res.json(all)
    }

}

module.exports = new TypeController()
