const FCM = require('../models/fcm')

module.exports = {
     updateFCM(id, req, res){
    let fcmData = req.body;


    //console.log(req);
    const fcm = new FCM({
        _id: id,
        token: fcmData.token
    });

    const query = { "_id": id } ;

    FCM.updateOne(query, {$set: fcm}, (err, result) => {
        if (err) {
            console.log(err);
            res.end();
        }else{
            console.log(result);
            res.json(result)
            res.end();
        }
      });

  }
}