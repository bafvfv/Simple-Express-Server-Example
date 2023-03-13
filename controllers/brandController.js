const BrandService = require('../services/brandService');
const ApiError = require('../error/ApiError');

class BrandController{

    async create(req, res, next) {
        try {
            const brand = await BrandService.createBrand(req.body)
            return res.json(brand)

        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const all = await BrandService.getAllBrands()
        return res.json(all)
    }

}

module.exports = new BrandController()
