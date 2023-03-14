const {User, Basket} = require('../models/models');
const bcrypt = require('bcrypt');


class UserService {

    async registerUser(post) {
        let {email, password, role} = post
        if (!email || !password) {
            throw new Error('Поля электронная почта и пароль - обязательны к заполнению')
        }
        const isUser = await User.findOne({where:{email}})
        if (isUser) {
            throw new Error('Этот емейл уже зарегистрирован на сайте')
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const createUser = await User.create({email, role, password: hashPassword}) 
        const createBasket = await Basket.create({userId: createUser.id})
        return createUser
    }

    async userLogin(post) {
        const {email, password} = post
        if (!email || !password) {
            throw new Error('Поля электронная почта и пароль - обязательны к заполнению')
        }
        const user = await User.findOne({where:{email}})
        if (!user) {
            throw new Error('Вы не зарегистрированы в системе')
        }
        let comparePassword = await bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            throw new Error('Указан неверный пароль')
        }
        return user
    }
}

module.exports = new UserService()