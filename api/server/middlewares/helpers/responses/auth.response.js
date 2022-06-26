const errorCodes = require("../../enums/errorCodes.enum");
const successCodes = require("../../enums/successCodes.enum");
const tokenResponse = require("../../enums/token.enum");


const logInError = () => {
  return {
    status: errorCodes.Error400.code, type: errorCodes.Error400.type,
    message: 'Invalid login Credentials'
  }
};

const LoginResponse = () => {
  return {
    status: successCodes.Success202.code, type: successCodes.Success202.type,
    message: `Login Successful`
  };
};

const invalidTokenError = () => {
  return {
    status: errorCodes.Error401.code, type: errorCodes.Error401.type,
    message: tokenResponse.INVALID_TOKEN
  };
};

const tokenExpired = () => {
  return {
    status: errorCodes.Error401.code, type: tokenResponse.EXPIRED,
    message: 'Token expired, Login!'
  };
};

const tokenNotFound = () => {
  return {
    status: errorCodes.Error401.code, type: tokenResponse.TOKEN_NOT_FOUND,
    message: 'You do not have permissions to process this action'
  };
};


module.exports = {
  logInError,
  LoginResponse,
  invalidTokenError,
  tokenExpired,
  tokenNotFound
}