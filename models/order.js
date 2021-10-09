const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const config = {useNewUrlParser: true, useUnifiedTopology: true };
// const orderDbConnectUrl = "mongodb+srv://hellomethealth:hellomethealth@cluster0.vrnxz.mongodb.net/order?retryWrites=true&w=majority";
// var orderDbConnection = mongoose.createConnection(orderDbConnectUrl, config, function(error, result){
//     if (error) {
//         console.log(error)
//     }else{
//         console.log("Connected with Order Db!")
//     }
// });

const dbConnections = require('../dbConnections')
var hellometDbConnection = dbConnections.getHellometDbConnection();


const meta_data = {
    created_at: {type: String, required: true},
    payment_method: {type: String, required: true},
    payment_status: {type: String, required: true},
    requirement: {type: String, required: true},
    status: {type: String, required: true},
    total_price: {type: String, required: true},

    pharmacy_address: {type: String, required: true},
    pharmacy_id: {type: String, required: true},
    pharmacy_lat: {type: String, required: true},
    pharmacy_lng: {type: String, required: true},
    pharmacy_name: {type: String, required: true},
    pharmacy_phone_number: {type: String, required: true},

    user_id: {type: String, required: true},
    user_lat: {type: String, required: true},
    user_lng: {type: String, required: true},
    user_name: {type: String, required: true},
    user_address: {type: String, required: true},
    user_phone_number: {type: String, required: true},

    rider_id: {type: String, required: true},
    rider_name: {type: String, required: true},
    rider_phone_number: {type: String, required: true}
}

const prescriptionImageUrls = {
    prescriptionImageUrls: {type: Array, required: true}
}

const item = {
    brand: {type: String, required: true},
    features: {type: String, required: true},
    medicine_id: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: String, required: true},
    quantity: {type: String, required: true},
    sub_total: {type: String, required: true}
}

const items = {
    items : {type: [item], required: true},
}

const orderSchema = new Schema({
    _id:{type: String, required: true},
    meta_data: {type: meta_data, required: true},
    items: {type: items, required: false},
    prescriptionImageUrls: {type: Array, required: false}
},
{timestamps: true});

const Order = hellometDbConnection.model('Order', orderSchema, "order" );
module.exports = Order;