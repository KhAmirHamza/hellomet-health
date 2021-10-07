const Order = require('../models/order')
const GetOrder = require('../order/get')


module.exports = {
     updateOrder(id, req, res){

        let updatedData = req.body;
        console.log(id);
        let query = { "_id": id };
        var newvalues = { $set: updatedData };
        console.log(newvalues);
                Order.updateOne(query, newvalues, function (error, result) {
            if (error) {
                console.log(error);
                res.end()
                }else{
                    var pharmacy_id = updatedData.meta_data.pharmacy_id;
                        var user_id = updatedData.meta_data.user_id;
                        var pharmacyLat = updatedData.meta_data.pharmacy_lat;
                        var pharmacyLng = updatedData.meta_data.pharmacy_lng;
                        var maxDistance = 3;
                    if(updatedData.meta_data.status=="Active"){
                        GetOrder.getLocalRidersTokensThenSendNotification(req, res, pharmacy_id, pharmacyLat, pharmacyLng, maxDistance);
                        GetOrder.getUserTokenThenSendNotification(req, res, user_id, "Order Updates", "Your order is now Active!");
                        res.json({"message": "Order Update Succesfully"})
                        res.end();
                    }else if(updatedData.meta_data.status=="On The Way"){
                        GetOrder.getUserTokenThenSendNotification(req, res, user_id, "Order Updates", "Your order is now On The Way!");
                        res.json({"message": "Order Update Succesfully"})
                        res.end();
                    }else if(updatedData.meta_data.status=="Completed"){
                        GetOrder.getUserTokenThenSendNotification(req, res, user_id, "Order Updates", "Your order is now Completed!");
                        res.json({"message": "Order Update Succesfully"})
                        res.end();
                    }
                    
                    else{
                    res.json({"message": "Order Update Succesfully"})
                    res.end();
                }
                
            }
        })

     }
}