const {Brand} = require('../models/models');

class BrandService {

    async createBrand(post) {
        if (!post.name) {
            throw new Error('Название бренда должно быть указано')
        }
        const newBrand = await Brand.create(post)
        return newBrand
    }

    async getAllBrands() {
        const allBrands = await Brand.findAll()
        return allBrands
    }

}

module.exports = new BrandService()