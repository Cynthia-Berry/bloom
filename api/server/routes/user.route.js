const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const TokenValidator = require('../middlewares/helpers/validators/token.validator');

router.get('/', TokenValidator.validateAuth, UserController.getUsers);

router.get('/:id',TokenValidator.validateAuth, UserController.getUserById);

router.patch('/:id',TokenValidator.validateAuth, UserController.updateUser);

router.delete('/:id',TokenValidator.validateAuth, UserController.deleteUser);


module.exports = router;