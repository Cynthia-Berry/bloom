const jwt = require("jsonwebtoken"), bcrypt = require("bcrypt"), {mongoose} = require('mongoose');
const {UserModel} = require("../models/user.model");
const {TokenModel} = require("../models/auth.model");
const UserResponse = require("../middlewares/helpers/responses/user.response");
const TokenResponse = require("../middlewares/helpers/responses/auth.response");

const getUsers = (req, res) => {
  UserModel.find({}).then(users => {
    const response = UserResponse.getUserResponse();
    res.status(response.status).json({
      count: users.length,
      data: users,
      status: response.type,
      message: response.message
    });
  }).catch(() => {
    const response = UserResponse.getUserError('User cannot be found');
    res.status(response.status).json({status: response.type, message: response.message});
  })
}

const createUser = async (req, res) => {
  const {firstName, lastName, userName, email, phone, password} = req.body;
  const encryptedUserPassword = await bcrypt.hash(password, 10);

  const user = await new UserModel({
    _id: new mongoose.Types.ObjectId(),
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    email: email.toLowerCase(),
    phone: phone,
    password: encryptedUserPassword,
  });

  user.save().then( () => {
    const response = UserResponse.createUserResponse();
    jwt.sign(
      {user_id: user.id}, process.env.TOKEN_KEY, {expiresIn: "5h"}, async (error, result) => {
        if (error) {
          const response = TokenResponse.tokenExpired();
          return res.status(response.status).json({status: response.type, message: response.message});
        }
        console.log(result);
        const token = await new TokenModel({token: result, userId: user.id});
        token.save().then(() => {
          res.status(response.status).json({
            status: response.type, message: response.message,
            data: {
              firstName: user.firstName,
              lastName: user.lastName,
              userName: user.userName,
              email: user.email,
              phone: user.phone,
              updatedAt: user.updatedAt,
              createdAt: user.createdAt,
            }
          });
        });
      });
  }).catch((error) => {
    console.log(error);
    const response = UserResponse.getUserError();
    res.status(response.status).json({status: response.type, message: response.message});
  })

};

const getUserById = (req, res) => {
  UserModel.findById(req.params['id']).then(user => {
    const response = UserResponse.getUserResponse();
    res.status(response.status).json({
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }, status: response.type, message: response.message
    });
  }).catch(() => {
    const response = UserResponse.getUserError();
    res.status(response.status).json({status: response.type, message: response.message});
  });
};

const updateUser = async (req, res) => {
  let user = await UserModel.findByIdAndUpdate(req.params['id'], req.body, {new: true});

  if (!user) {
    const response = UserResponse.getUserError();
    return res.status(response.status).json({status: response.type, message: response.message});
  }
  const response = UserResponse.updateUserResponse();
  res.status(response.status).json({status: response.type, message: response.message, data: user});
};

const deleteUser = (req, res) => {
  UserModel.findByIdAndDelete(req.params['id']).then(async () => {
    const response = UserResponse.deleteUserResponse();
    res.status(response.status).json({status: response.type, message: response.message});
  }).catch(() => {
    const response = UserResponse.getUserError();
    res.status(response.status).json({status: response.type, message: response.message});
  });
};

module.exports = {getUsers, createUser, getUserById, updateUser, deleteUser}