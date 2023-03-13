const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');
const FileService = require('./fileService');
const { where } = require('sequelize');

class DeviceService {

    async create(post, img) {
        const fileName = FileService.saveFile(img);
        const createItem = await Device.create({...post, img: fileName});
        if(info) {
            info = JSON.parse(info)
            info.forEach(i => 
                DeviceInfo.create({
                    title: i.title,
                    description: i.description,
                    createItemId: createItem.id
                }))
            }
        return createItem;
    }
    
    async getAll(query) {
        let {brandId, typeId, page, limit} = query
        if(!page) {
            page = 1
        }
        if(!limit) {
            limit = 5
        }
        let offset = page * limit - limit
        let devices;
        if(!brandId && !typeId) {
            devices = await Device.findAndCountAll({offset, limit})
        }
        if(brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, offset, limit});
        }
        if(!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, offset, limit});
        }
        if(brandId && typeId) {
            devices = await Device.findAndCountAll({where:{brandId, typeId}, offset, limit})
        }
        return devices;
    }

    async getOne(id) {
        if(!id) {
            throw new Error('Не указан ID');
        }
        const info = [{model: DeviceInfo, as: 'info'}]
        const post = await Device.findOne({where:id, include: info},);
        return post;
    }

    async updatePrice(post) {
        if(!post.id && !post.price) {
            throw new Error('Для обновления стоимости товара, нужно указать его id и новую цену')
        }
        if(!post.id) {
            throw new Error('Пожалуйста, введите id товара')
        }
        if(!post.price) {
            throw new Error('Пожалуйста, введите новую цену')
        }
        const updPrice = await Device.update({price: post.price}, {where:{id: post.id}})
        return updPrice;
    }

    async removeDevice(post) {
        if(!post.id) {
            throw new Error('Пожалуйста, введите id товара')
        }
        const remove = await Device.destroy({where: post});
        return remove;
    }
}

module.exports = new DeviceService();