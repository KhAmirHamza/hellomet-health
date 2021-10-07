const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbConnections = require('../dbConnections')
var hellometDbConnection = dbConnections.getHellometDbConnection();


const meta_data = {
    name: {type: String, required: true},
    phone_number: {type: String, required: true},
    date_of_birth: {type: String, required: true},
    image_url: {type: String, required: true},
    lat: {type: Number, required: true},
    lng: {type: Number, required: true}
}
const auth = {
    phone_number: {type: String, required: true},
    password: {type: String, required: true}
}

const riderSchema = new Schema({
    _id:{type: String, required: true},
    meta_data: {type: meta_data, required: true},
    auth: {type: auth, required: true}
},
{timestamps: true});

const Rider = hellometDbConnection.model('Rider', riderSchema, "rider" );
module.exports = Rider;