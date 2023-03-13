const DeviceService = require('../services/deviceService');
const ApiError = require('../error/ApiError');

class DeviceController {
    
    async create(req, res, next) {
        try {
            const createItem = await DeviceService.create(req.body, req.files.img);
            return res.json(createItem)
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
        
    }
    
    async getAll(req, res) {
        const all = await DeviceService.getAll(req.query)
        return res.json(all)
    }
    
    async getOne(req, res) {
        const device = await DeviceService.getOne(req.params)
        return res.json(device)               
    }

    async updatePrice(req, res, next) {
        try {
            const newPrice = await DeviceService.updatePrice(req.body);
            return res.json('Цена успешно обновлена')
        } catch(e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async remove(req, res, next) {
        try {
            const deleteItem = await DeviceService.removeDevice(req.body);
            return res.json('Товар успешно удалён из базы данных')
        } catch(e) {
            return next(ApiError.badRequest(e.message));
        }
    }
   
}

module.exports = new DeviceController()