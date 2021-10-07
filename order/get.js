const Order = require('../models/order')
const Rider = require('../models/rider')
const FCM = require('../models/fcm')
const admin = require('firebase-admin');
var serviceAccount = require('../fcm/hellomet-c4399-firebase-adminsdk-tgqg0-f39a5fb6f5.json')
var adminInit = false;

module.exports = {
    getOrder(req, res) {

        const { limit = 50, page = 1, name, id } = req.query;
        console.log("limit");
        console.log(limit);
        console.log("skip");
        console.log(((page - 1) * limit));
        var searchQuery = {}
        var { user_phone_number, pharmacy_id, status, rider_phone_number } = req.query;
        console.log(req.query);
        if (id) {
            searchQuery = { '_id': { '$regex': id, '$options': 'i' } }
            findDataObjectThenSend(res, searchQuery);
        }
        else if (user_phone_number) {

            if (status != null) {
                searchQuery = { "meta_data.user_phone_number": user_phone_number, "meta_data.status": status };
                findDataArrayThenSend(res, limit, page, searchQuery);
            } else {
                searchQuery = { "meta_data.user_phone_number": user_phone_number };
                findDataArrayThenSend(res, limit, page, searchQuery);
            }
        } else if (pharmacy_id != null) {
            if (status != null) {
                searchQuery = { "meta_data.pharmacy_id": pharmacy_id, "meta_data.status": status };
                findDataArrayThenSend(res, limit, page, searchQuery);
            } else {
                searchQuery = { "meta_data.pharmacy_id": pharmacy_id };
                findDataArrayThenSend(res, limit, page, searchQuery);
            }
        }

        else if (rider_phone_number != null) {
            if (status != null) {
                console.log("Order by rider_phone_number and Status");
                searchQuery = { "meta_data.rider_phone_number": rider_phone_number, "meta_data.status": status };
                findDataArrayThenSend(res, limit, page, searchQuery);
            } else {
                console.log("Order by rider_phone_number");
                searchQuery = { "meta_data.rider_phone_number": rider_phone_number };
                findDataArrayThenSend(res, limit, page, searchQuery);
            }
        } else {
            notFoundException(res, "Nothing Found!");
        }

    }
    ,
    getAllOrdersAsoLocal(req, res) {
        var searchQuery = {};
        const { limit = 50, page = 1, name, id, action, status } = req.query;

        console.log(req.query);
        // Get All Local Order...
        if (action != null && action == "local") {

                    if (status != null) {
                        //Get All local order By Status...
                        searchQuery = { "meta_data.status": status };
                        Order.find(searchQuery)
                            .limit(parseInt(limit)).skip(((page - 1) * limit))
                            .then((result) => {
                                console.log("ALL Order: " + status);
                                console.log(result);
                                filterLocalOrderThenSend(req, res, result);
                            })
                            .catch((error) => {
                                console.log(error);
                                res.end()
                            })
                    } else {
                        console.log("ALL Order");
                        console.log(result);
                        filterLocalOrderThenSend(req, res, result);
                    }
                }
          
        
        else {
            findDataArrayThenSend(res, limit, page, searchQuery);
        }
    },

    getLocalRidersTokensThenSendNotification(req, res,pharmacy_id, pharmacyLat, pharmacyLng, maxDistanc) {
        getLocalRidersTokensThenSendNotification(req, res,pharmacy_id, pharmacyLat, pharmacyLng, maxDistanc)
    },
    getUserTokenThenSendNotification(req, res, user_id, title, body){
        getUserTokenThenSendNotification(req, res, user_id, title, body);
    },
    getPharmacyTokenThenSendNotification(req, res, pharmacy_id, title, body){
        getPharmacyTokenThenSendNotification(req, res, pharmacy_id, title, body);
    }

}

function filterLocalOrderThenSend(req, res, result) {

    if (result == null || result.length < 1) {
        res.json(result);
        notFoundException(res, "Nothing Found!");
        return;
    }

    var deliverymanLat = req.query.lat;
    var deliverymanLng = req.query.lng;
    var maxDistance = req.query.max_distance;

    if (deliverymanLat != null && deliverymanLng != null) {

        var filteredResult = [];

        for (let i = 0; i < result.length; i++) {
            const element = result[i];

            var pharmacyLat = element.meta_data.pharmacy_lat;
            var pharmacyLng = element.meta_data.pharmacy_lng;

            let distense = getDistanceOfAreaFromOnePlaceToAnother(
                deliverymanLat, deliverymanLng, pharmacyLat, pharmacyLng);
            if (distense == maxDistance || distense < maxDistance) {
                filteredResult.push(element);
            }
            if (i == (result.length - 1)) {
                res.json(filteredResult);
                res.end();
            }
        }
    } else {
        res.json(result);
        res.end();
    }
}


function getDistanceOfAreaFromOnePlaceToAnother(fromLat, fromLng, toLat, toLng) {
    let disLatKM;
    let disLngKM;

    if (fromLat < toLat) {
        disLatKM = (toLat - fromLat) * 111.0;
        disLngKM = (toLng - fromLng) * 111.0;
        return Math.sqrt((disLatKM * disLatKM) + (disLngKM * disLngKM))
    } else {
        disLatKM = (fromLat - toLat) * 111.0;
        disLngKM = (fromLng - toLng) * 111.0;
        return Math.sqrt((disLatKM * disLatKM) + (disLngKM * disLngKM))
    }
}


function findDataArrayThenSend(res, limit, page, searchQuery) {

    Order.find(searchQuery)
        .limit(parseInt(limit)).skip(((page - 1) * limit))
        .then((result) => {
            res.json(result);
            res.end();
        })
        .catch((error) => {
            console.log(error);
        })

    // collection.find(query).toArray(function (error, result) {
    //     if (error) {
    //         console.log(error);
    //         res.json({});
    //         res.end();
    //     } else {
    //         res.json(result);
    //         console.log(result);
    //         res.end();
    //     }
    // })
}
function findDataObjectThenSend(res, searchQuery) {

    Order.findOne(searchQuery, function (error, result) {
        if (error) {
            sendError(res, error);
        } else {
            if (result != null && result.length > 0) {
                sendResult(res, result);
            } else {
                res.json(result);
                notFoundException(res, "Nothing Found!");
            }
        }
    });
}

function sendError(res, error) {
    console.log(error);
    res.status(404);
    res.end();
}
function sendResult(res, result) {
    console.log(result);
    res.json(result);
    res.status(200)
    res.end();
}

function notFoundException(res, message) {
    console.log(message);
    //res.json({ status: 0, message })
    //res.status(404)
    res.end();

}
function getUserTokenThenSendNotification(req, res, user_id, title, body){
                var searchQuery = {"_id" : user_id}
            FCM.findOne(searchQuery)
            .then((result)=>{
            console.log(result);
              var token = result.token;
              sendFcmNotification(req, res, title, body, [ token]);
            })
            .catch((error)=>{
                console.log(error);
            })
}
function getPharmacyTokenThenSendNotification(req, res, pharmacy_id, title, body){
                var searchQuery = {"_id" : pharmacy_id}
            FCM.findOne(searchQuery)
            .then((result)=>{
            console.log(result);
              var token = result.token;
              sendFcmNotification(req, res, title, body, [ token]);
            })
            .catch((error)=>{
                console.log(error);
            })
}
function getLocalRidersTokensThenSendNotification(req, res, pharmacy_id, pharmacyLat, pharmacyLng, maxDistance) {

    Rider.find({})
        .then((result) => {
            if (result == null || result.length < 1) {
                console.log(message);
                //res.end();
                return;
            }

            var riderTokens = [];

            FCM.find({})
                .then((fcmResult) => {
                    for (let index = 0; index < result.length; index++) {
                        const rider = result[index];

                        var riderLat = rider.meta_data.lat
                        var riderLng = rider.meta_data.lng
                        console.log(rider._id);
                        let distense = getDistanceOfAreaFromOnePlaceToAnother(
                            pharmacyLat, pharmacyLng, riderLat, riderLng);

                        if (distense == maxDistance || distense < maxDistance) {
                            //add rider token...
                            var tokenContainer = fcmResult.filter(fcm => fcm._id == rider._id)
                            var token = tokenContainer[0].token;
                            console.log("Local Rider token");
                            console.log(token);
                            riderTokens.push(token);
                        }
                    }


                    if (riderTokens.length > 0) {
                        sendFcmNotification(req, res, "New Order found!", "Accept this order quickly!", riderTokens);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })

        })
        .catch((error) => {
            console.log(error);
        })
}



function sendFcmNotification(req, res, title, body, tokens) {

    if (adminInit == false) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://hellomet-c4399.firebaseio.com'
        });
        adminInit = true;
    }

    const message = {
        data: {
            title: title,
            body: body
        },
        //   notification:{ 
        //     "body": "My notification!"
        // },
        notification: {
            // "click_action" : ".MainActivity", 
            title: title,
            body: body

        },
        tokens: tokens,
    };

    admin.messaging().sendMulticast(message)
        .then((response) => {
            if (response.failureCount > 0) {
                const failedTokens = [];
                response.responses.forEach((resp, idx) => {
                    if (!resp.success) {
                        failedTokens.push(tokens[idx]);
                    }
                });
                console.log('List of tokens that caused failures: ' + failedTokens);
               // res.json({ "message": "List of tokens that caused failures: " + failedTokens })
               // res.end();
            } else {
                console.log("Notificaiton Sent!");
              //  res.json({ "message": "Notification send successfully" })
              //  res.end();
            }

        });
}
