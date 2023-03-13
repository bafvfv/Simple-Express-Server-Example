const Router = require('express');
const deviceController = require('../controllers/deviceController');
const router = new Router();
const checkRole = require('../middleware/checkRoleMiddlware');

router.post('/', checkRole('ADMIN'), deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.put('/', checkRole('ADMIN'), deviceController.updatePrice)
router.delete('/', checkRole('ADMIN'), deviceController.remove)

module.exports = router