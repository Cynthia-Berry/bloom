const bcrypt = require("bcrypt"), jwt = require("jsonwebtoken");
const {TokenModel} = require("../models/auth.model");
const {UserModel} = require('../models/user.model');
const userController = require('./user.controller');
const AuthResponse = require("../middlewares/helpers/responses/auth.response");
const UserResponse = require("../middlewares/helpers/responses/user.response");

const signIn = (req, res) => {
  const {email, password} = req.body;

  UserModel.findOne({email: email.toLowerCase()}).then(async user => {
    const encryptedUserPassword = await bcrypt.compare(password, user.password);
    if (!user || !encryptedUserPassword) {
      const response = AuthResponse.logInError()
      res.status(response.status).json({status: response.type, message: response.message});
    } else {

      //Find stored JWT For returning User
      TokenModel.findOne({userId: user.id}).then(result => {
        jwt.verify(result.token, process.env.TOKEN_KEY, {}, async (err, data) => {

          //If JWT has expired sign/create a new one
          if (err || typeof err === 'undefined') {
            console.log(err)
            const userToken = jwt.sign(
              {user_id: user.id}, process.env.TOKEN_KEY, {expiresIn: "5hr"}
            );
            await TokenModel.updateOne({token: userToken}).where('userId').equals(user.id);
            user.token = userToken;

            //Else take the user in with existing JWT from the TokenModel
          } else {
            const response = AuthResponse.LoginResponse();
            res.status(response.status).json({
              token: result.token, status: response.type, message: response.message
            });
          }
        });
      });
    }

  }).catch((error) => {
    console.log(error)
    const response = AuthResponse.logInError();
    res.status(response.status).json({status: response.type, message: response.message});
  });

};

const signUp = async (req, res) => {
  try {
    const isUserExist = await UserModel.findOne({email: req.body.email.toLowerCase()});

    if (isUserExist) {
      const response = UserResponse.getUserExistError()
      return res.status(response.status).json({status: response.type, message: response.message});
    }

    await userController.createUser(req, res);
  } catch (error) {
    const response = UserResponse.getUserError('error.errors[0].message')
    res.status(response.status).json({status: response.type, message: response.message});
  }
};

module.exports = {signIn, signUp}
