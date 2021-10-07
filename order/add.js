const Order = require('../models/order')
const SendNotification = require('../fcm/admin_send_notfication');
const FCM = require('../models/fcm')
const GetOrder = require('../order/get')

module.exports = {
     addOrder(req, res){
        const { pharmacy_id, pharmacy_name, pharmacy_address, pharmacy_phone_number, user_id, pharmacy_lat, pharmacy_lng,
            user_phone_number, user_name, user_address, user_lat, user_lng, rider_id, rider_name, rider_phone_number,
            requirement, total_price, status, payment_method, payment_status } = req.body.meta_data;

            var orderMetaData = {

                user_id,
                user_name,
                user_phone_number,
                user_address,
                user_lat,
                user_lng,

                pharmacy_id,
                pharmacy_name,
                pharmacy_phone_number,
                pharmacy_address,
                pharmacy_lat,
                pharmacy_lng,
                
                rider_id,
                rider_name,
                rider_phone_number,
                
                requirement,
                total_price,
                status,
                payment_method,
                payment_status,
                created_at: Date.now(),
            }

            var prescriptionImageUrls = req.body.prescriptionImageUrls;
            var items = req.body.items;
            var order;
            if (prescriptionImageUrls) {
                order = new Order(
                    {
                        _id: generateID("O"),
                        meta_data: orderMetaData,
                        prescriptionImageUrls: prescriptionImageUrls,
                    }
                )
            } else if (items) {
                order = new Order(
                    {
                        _id: generateID("O"),
                        meta_data: orderMetaData,
                        items: items,
                    }
                )
            }
            console.log(order);

            order.save().then((result)=>{
                console.log(result);
                // res.json({ message: "Order add Successfuly" })
           
              GetOrder.getPharmacyTokenThenSendNotification(req, res, order.meta_data.pharmacy_id, "New Order", "New order placed! Check it now!");
              res.json({"message": "Order Update Succesfully"})
              res.end();
            

        }).catch((error)=>{
                console.log(error);
                res.end();
            })
     }
}
function generateID(type) {
    var currentDateInMillisecond = Date.now();
    function prepareDate(d) {
        [d, m, y] = d.split("-"); //Split the string
        return [y, m - 1, d]; //Return as an array with y,m,d sequence
    }
    let str = "31-12-2020";
    let date2020 = new Date(...prepareDate(str));
    let currentDateInMillisecAfter2020 = currentDateInMillisecond - date2020.getTime();
    console.log(type + currentDateInMillisecAfter2020);
    return type + currentDateInMillisecAfter2020;
}