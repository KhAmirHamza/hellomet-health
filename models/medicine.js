const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = {useNewUrlParser: true, useUnifiedTopology: true };
const medicineDbConnectUrl = "mongodb+srv://hellomethealth:hellomethealth@cluster0.vrnxz.mongodb.net/medicine?retryWrites=true&w=majority";

var medicineDbConnection = mongoose.createConnection(medicineDbConnectUrl, config, function(error, result){
    if (error) {
        console.log(error)
    }else{
        console.log("Connected with Medicine Db!")
    }
});


const meta_data = {
    name: {type: String, required: true},
    image_url: {type: String, required: true},
    features: {type: String, required: true},
    brand: {type: String, required: true},
    indication: {type: String, required: true},
    price: {type: String, required: true},
    description: {type: String, required: true}
}

const medicineSchema = new Schema({
    _id:{type: String, required: true},
    meta_data: {type: meta_data, required: true}
},
{timestamps: true});

const Medicine = medicineDbConnection.model('Medicine', medicineSchema, "meta_data" );
module.exports = Medicine;