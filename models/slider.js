const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbConnections = require('../dbConnections')

var hellometDbConnection = dbConnections.getHellometDbConnection();

const data = {
    title: {type: String, required: true},
    image_url: {type: String, required: true}
}

const sliderSchema = new Schema({
    _id:{type: String, required: true},
    data: {type: data, required: true}
},
{timestamps: true});

const Slider = hellometDbConnection.model('Slider', sliderSchema, "slider" );
module.exports = Slider;