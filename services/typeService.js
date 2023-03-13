const {Type} = require('../models/models');

class TypeService {

    async createType(post) {
        if (!post.name) {
            throw new Error('Название категории должно быть указано')
        }
        const newType = await Type.create(post)
        return newType
    }

    async getAllTypes() {
        const allTypes = await Type.findAll()
        return allTypes
    }

}

module.exports = new TypeService()