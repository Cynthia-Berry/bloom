const {mongoose} = require('mongoose');

const tokenSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    token: {type: String, required: true},
    userId: {type: String, required: true}
});

const TokenModel = mongoose.model('token', tokenSchema);

module.exports = {TokenModel};