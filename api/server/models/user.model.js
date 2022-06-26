const {mongoose} = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  userName: {type: String, unique: true},
  email: {type: String, unique: true, lowercase: true},
  phone: {type: String, unique: true,},
  password: String,
  createdAt: {type: Date, required: true, default: Date.now()},
  updatedAt: {type: Date, required: true, default: Date.now()},
});

const UserModel = mongoose.model('users', userSchema);

module.exports = {UserModel};