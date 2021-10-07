const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//const config = {useNewUrlParser: true, useUnifiedTopology: true };

const dbConnections = require('../dbConnections')
var hellometDbConnection = dbConnections.getHellometDbConnection();

// var userDbConnection = mongoose.createConnection(userDbConnectUrl, config, function(error, result){
//     if (error) {
//         console.log(error)
//     }else{
//         console.log("Connected with User Db!")
//     }
// });


const meta_data = {
    email: {type: String, required: true},
    image_url: {type: String, required: true},
    name: {type: String, required: true},
    phone_number: {type: String, required: true}
}
const auth = {
    phone_number: {type: String, required: true},
    password: {type: String, required: true}
}

const userSchema = new Schema({
    _id:{type: String, required: true},
    meta_data: {type: meta_data, required: true},
    auth: {type: auth, required: true}
},
{timestamps: true});

const User = hellometDbConnection.model('User', userSchema, "user" );
module.exports = User;

