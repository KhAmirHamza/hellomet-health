const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const config = {useNewUrlParser: true, useUnifiedTopology: true };
// const pharmacyDbConnectUrl = "mongodb+srv://hellomethealth:hellomethealth@cluster0.vrnxz.mongodb.net/pharmacy?retryWrites=true&w=majority";

// var pharmacyDbConnection = mongoose.createConnection(pharmacyDbConnectUrl, config, function(error, result){
//     if (error) {
//         console.log(error)
//     }else{
//         console.log("Connected with Pharmacy Db!")
//     }
// });

const dbConnections = require('../dbConnections')
var hellometDbConnection = dbConnections.getHellometDbConnection();

const meta_data = {
    address: {type: String, required: true},
    founder: {type: String, required: true},
    image_url: {type: String, required: true},
    latitude: {type: String, required: true},
    longitude: {type: String, required: true},
    name: {type: String, required: true},
    phone_number: {type: String, required: true},
    status: {type: String, required: true}
}
const auth = {
    phone_number: {type: String, required: true},
    password: {type: String, required: true}
    
}

const pharmacySchema = new Schema({
    _id:{type: String, required: true},
    meta_data: {type: meta_data, required: true},
    auth: {type: auth, required: true}
},
{timestamps: true});

const Pharmacy = hellometDbConnection.model('Pharmacy', pharmacySchema, "pharmacy" );
module.exports = Pharmacy;