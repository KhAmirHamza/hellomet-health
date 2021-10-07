const { ifError } = require("assert");
const { json } = require("body-parser");
const { response } = require("express");
const express = require("express");
const medicineRouter = express.Router();

const Medicine = require('../models/medicine')


module.exports = {
     updateMedicine(id, req, res){
    let mData = req.body.meta_data;

    //console.log(req);
    const medicine = new Medicine({
        _id: id,
        meta_data: {
            name: mData.image_url,
            image_url: mData.image_url,
            features: mData.features,
            brand: mData.brand,
            indication: mData.indication,
            price: mData.price,
            description: mData.description
        }
    });

    const query = { "_id": id } ;

    Medicine.updateOne(query, {$set: medicine}, (err, result) => {
        if (err) {
            console.log(err);
            res.end();
        }else{
            console.log(result);
            res.json(result)
            res.end();
        }
      });








//     let query = { "_id": id };
//     medicine.findOneAndUpdate(query, medicine, {upsert: true},function(error, result){
//         if (error) {
//             console.log(error);
//             res.end();
//         }else{
//             console.log(result);
//             res.json(result);
//             res.end();
//         }
//     })

  }
}


// //Update Order By  ID...
// medicineRouter.patch("/:id", function (req, res) {
//     let id = req.params.id;
//     let mData = req.body.meta_data;

//     const medicine = new Medicine({
//         _id: "M" + Date.now(),
//         meta_data: {
//             name: mData.image_url,
//             image_url: mData.image_url,
//             features: mData.features,
//             brand: mData.brand,
//             indication: mData.indication,
//             price: mData.price,
//             description: mData.description
//         }
//     });
//     let query = { "_id": id };
//     medicine.findOneAndUpdate(query, medicine, {upsert: true},function(error, result){
//         if (error) {
//             console.log(error);
//             res.end();
//         }else{
//             console.log(result);
//             res.json(result);
//             res.end();
//         }
//     })














    // var Client = mongoUtil.getMongoClient();
    // // MongoClient.connect(connectionUrl, config, function (error, Client) {
    // //     if (error) {
    // //         sendError(res, error);
    // //     } else {
    //         let dbOrder = Client.db("order");
    //         let collecOrder = dbOrder.collection("data");
    //         let updatedData = req.body;
    //         let id = req.params.id;
    //         console.log(id);
    //         //var ObjectID = require('mongodb').ObjectID;
    //         //var query = {"_id": ObjectID(req.params.id)};
    //         let query = { "_id": id };
    //         var newvalues = { $set: updatedData };
    //         collecOrder.updateOne(query, newvalues, function (error, result) {
    //             if (error) {
    //                 console.log(error);
    //                 res.sendStatus(404);
    //                 res.end();
    //             } else {
    //                 console.log("1 document updated");
    //                 console.log(result);
    //                 res.json(result);
    //                 res.end();
    //             }
    //         })
    //     }
    // });
//})