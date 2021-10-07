const { response } = require('express');
const Order = require('../models/order')

function getOrdersInsideRange(res, searchQuery, fromDate, toDate){
    console.log(searchQuery);
    let rangeOrderResult = [];
    Order.find(searchQuery, function (error, result) {
        if (error) {
            sendError(res, error);
        } else {
            //console.log(result);
            if (result != null && result.length > 0) {

                    var fromDateMillisec = getDateMillisecFromDateString(fromDate);
                    var toDateMillisec = getDateMillisecFromDateString(toDate);
                    for (let index = 0; index < result.length; index++) {
                        const element = result[index];
                        var dateForCheckMillisec = element.meta_data.created_at;
                        ///console.log(element.meta_data.pharmacy_id);
                        if (isDateInsideOfDateRange(fromDateMillisec, toDateMillisec,
                            dateForCheckMillisec)) {
                                //Order is inside of range...
                            rangeOrderResult.push(result[index]);
                            if (index == (result.length - 1)) {
                                res.json(rangeOrderResult);
                                res.end();
                            }

                        } else {
                            if (index == (result.length - 1)) {
                                res.json(rangeOrderResult);
                                res.end();
                            }
                        }
                    }
            }else{
                res.end();
                console.log("No Order Found!");
            }
        }
    })
}


module.exports = {
    getOrderByRange(req, res) {

        var fromDate = req.query.from_date;
        var toDate = req.query.to_date;
        var pharmacy_id = req.query.pharmacy_id;
        var user_id = req.query.user_id;
        var rider_id = req.query.rider_id;
        var searchQuery = {};

        if (fromDate != null && toDate != null) {
   
            if (pharmacy_id != null) {
                searchQuery ={"meta_data.pharmacy_id": pharmacy_id};
                getOrdersInsideRange(res, searchQuery, fromDate, toDate)
                
            } else if (user_id != null) {
                searchQuery ={"meta_data.user_id": user_id};
                getOrdersInsideRange(res, searchQuery, fromDate, toDate)
            } else if (rider_id != null) {
                searchQuery ={"meta_data.rider_id": rider_id};
                getOrdersInsideRange(res, searchQuery, fromDate, toDate)
    
            } else if (pharmacy_id == null && user_id == null && rider_id == null) {
                searchQuery ={};
                getOrdersInsideRange(res, searchQuery, fromDate, toDate)
            }   


        } else {
            res.json({"message": "Query is Null"});
            res.end();
            console.log("Query is null");
        }











        // Order.find(query, function (error, result) {
        //     if (error) {
        //         sendError(res, error);
        //     } else {
        //         //console.log(result);
        //         if (result != null && result.length > 0) {

        //             console.log(req.query);

        //             let rangeOrderResult = [];

        //             if (pharmacy_id !== null) {
        //                 console.log("pharmacyId: " +pharmacy_id);
        //                 rangeOrderResult.push(result[index]);

        //                 if (index == (result.length - 1)) {
        //                     res.json(rangeOrderResult);
        //                     res.end();
        //                 }
        //             } else if (user_id !== null) {
        //                 rangeOrderResult.push(result[index]);
        //                 console.log("user_id: " +user_id);
        //                 if (index == (result.length - 1)) {
        //                     res.json(rangeOrderResult);
        //                     res.end();
        //                 }
        //             } else if (deliveryman_id !== null) {
        //                 console.log("deliveryman_id: " +deliveryman_id);
        //                 rangeOrderResult.push(result[index]);

        //                 if (index == (result.length - 1)) {
        //                     res.json(rangeOrderResult);
        //                     res.end();
        //                 }

        //             } else if (pharmacy_id == null && user_id == null && deliveryman_id == null) {
        //                 console.log("Every query is null");
        //                 rangeOrderResult.push(result[index]);

        //                 console.log(result[index]._id);
        //                 if (index == (result.length - 1)) {
        //                     //console.log("check2");
        //                     res.json(rangeOrderResult);
        //                     res.end();
        //                 }
        //             } else {
        //                 if (index == (result.length - 1)) {
        //                     res.json(rangeOrderResult);
        //                     res.end();
        //                 }
        //             }

        //         } else {
        //             res.json({});
        //             notFoundException(res, "Nothing Found!")
        //         }
        //     }
        // })

    }

}


function isDateInsideOfDateRange(fromDateMillisec, toDateMillisec, dateForCheckMillisec) {
    if (dateForCheckMillisec >= fromDateMillisec && dateForCheckMillisec <= toDateMillisec) {
        var different = toDateMillisec - fromDateMillisec;
        //console.log("Different: " + different);
        return true;
    } else {
        return false;
    }
}
function getDateMillisecFromDateString(dateString) {
    //var date = Date.parse("11/22/12");
    return Date.parse(dateString);
}

