const Pharmacy = require('../models/pharmacy')

module.exports = {
     updatePharmacy(id, req, res){

        let updatedData = req.body;
        console.log(id);
        //var ObjectID = require('mongodb').ObjectID;
        //var query = {"_id": ObjectID(req.params.id)};
        let query = { "_id": id };
        var newvalues = { $set: updatedData };
        Pharmacy.updateOne(query, newvalues, function (error, result) {
            if (error) {
                console.log(error);
                //res.sendStatus(404);
                res.end();
            } else {
                console.log(result);
                res.json(result);
                res.end();
            }
        })

     }
}