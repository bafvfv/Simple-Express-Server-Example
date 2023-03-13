const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');

class FileService {
    saveFile(file, next) {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static', fileName);
            file.mv(filePath);
            return fileName
        } catch(e) {
            next(ApiError.internal(e.message))
        }
    }

}

module.exports = new FileService()