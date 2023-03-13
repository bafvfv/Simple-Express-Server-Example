const Router = require('express');
const brandController = require('../controllers/brandController');
const router = new Router();
const checkRole = require('../middleware/checkRoleMiddlware');

router.post('/', checkRole('ADMIN'), brandController.create)
router.get('/', brandController.getAll)


module.exports = router