const express = require('express');
require('dotenv').config();
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path')

const app = express();

app.use(cors()) // нужен для передачи данных с фронтенда
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)

// обработчик ошибок суём в самый конец списка мидлварь
app.use(errHandler)

async function start() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start();