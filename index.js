const express = require('express');

const app = express();
const { json } = require("body-parser");
app.use(express.json());

var MongoClient = require('mongodb').MongoClient;
var config = { useUnifiedTopology: true };
var URL = "mongodb+srv://ecommerce:amirhamza@cluster0.p4fnz.mongodb.net/?retryWrites=true&w=majority";

app.post('/addPharmacy', function(req, res){

    MongoClient.connect(URL,config, function(error, Client){
        if(error){
            console.log(error);
        }else{
            let pharmacy_meta_data = req.body;
            console.log("Connection Success.");
            console.log(pharmacy_meta_data);
            
            let db = Client.db("HellometHealth");
            let collec = db.collection("pharmacy");

            let pharmacyId = "P" + Date.now();
            // set id for every part of pharmacy data...
            let pharmacy_data = {
                _id: pharmacyId,
                meta_data: pharmacy_meta_data.meta_data
            }

        collec.insertOne(pharmacy_data, function(error, result){
            if(error){
                console.log("uploading pharmacy meta_data to MongoDB has Failed: error: " + error);
                res.json({ message: "Meta-data upload Failed" });
                res.end();
            }else{
                console.log("uploading pharmacy meta_data to MongoDB has successful.");
                res.json({ message: "Pharmacy successfully added." })
                console.log(result);
            }
        })           
        }
    });
});

app.get('/getPharmacies', function(req, res){

    MongoClient.connect(URL, config, function(error, Client){
        if(error){
            console.log(error);
        }else{
            let db = Client.db("HellometHealth");
            let collec = db.collection("pharmacy");
            var query = {};
            collec.find(query).toArray(function(error, result){
                if (error) {
                    console.log(error);
                }else{
                    res.json(result);
                    res.end();
                }
            })
        }
    })

})



const PORT = process.env.PORT || 1010;

app.listen(PORT, function(error,){
    if(error){
        console.log(error);
    }else{
        console.log('Server is running on port :' + PORT);
    }

});