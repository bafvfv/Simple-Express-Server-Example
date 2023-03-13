const {Brand} = require('../models/models');
const ApiError = require('../error/ApiError');

class BrandController{

    async create(req, res) {
        const {name} = req.body // указываем, что name будет в теле запроса 
        const brand = await Brand.create({name}); // добавляем name в таблицу брэндов
        return res.json(brand) // отправляем новый товар в результате, в оригинале будем отправлять сообщение об успешном
    }                          // создании брэнда

    async getAll(req, res) {
        const brand = await Brand.findAll();
        return res.json(brand)
    }

}

module.exports = new BrandController()