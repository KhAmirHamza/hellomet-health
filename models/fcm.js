const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbConnections = require('../dbConnections')

// const config = {useNewUrlParser: true, useUnifiedTopology: true };
// const hellometDbConnectUrl = "mongodb+srv://hellomethealth:hellomethealth@cluster0.vrnxz.mongodb.net/hellomet?retryWrites=true&w=majority";

// var hellometDbConnection = mongoose.createConnection(hellometDbConnectUrl, config, function(error, result){
//     if (error) {
//         console.log(error)
//     }else{
//         console.log("Connected with Hellomet Db!")
//     }
// });
var hellometDbConnection = dbConnections.getHellometDbConnection();


const fcmSchema = new Schema({
    _id:{type: String, required: true},
    token: {type: String, required: true}
},
{timestamps: true});

const FCM = hellometDbConnection.model('FCM', fcmSchema, "fcm" );
module.exports = FCM;