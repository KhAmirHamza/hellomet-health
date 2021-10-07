const FCM = require('../models/fcm')

module.exports = {
     addFCM(req, res){
        var fcmData = req.body;
        const fcm = new FCM({
            _id: fcmData.id,
            token: fcmData.token
        });

        fcm.save().then((result)=>{
            console.log("FCM token create has successful.");
            console.log(result);
            res.json({ message: "FCM Token upload Successfuly" })
            res.end();
        }).catch((error)=>{
            console.log("Uploading token has Failed: error: " + error);
            res.json({ message: "FCM Token upload Failed" })
            res.end();
        })

  }
}
