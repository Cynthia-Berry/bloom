const express = require('express');
const router = express.Router();
const validators = require("../middlewares/services/validator.service");
const {signIn, signUp} = require("../controllers/auth.controller");


router.post('/register',validators("userValidators", "createUserValidator"), signUp);

router.post('/login', validators("authValidators", "loginValidator"), signIn);

module.exports = router;