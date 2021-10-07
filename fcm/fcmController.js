const express = require("express");
const fcmRouter = express.Router();
const Update = require('../fcm/update')
//const Delete = require('../fcm/delete')
const Add = require('../fcm/add')
const Get = require('../fcm/get')
const Send = require('../fcm/admin_send_notfication')

fcmRouter.post("/", function (req, res) {
   Add.addFCM(req, res);
});

fcmRouter.post("/send",(req, res)=>{
    Send.sendFcmNotification(req, res, req.body.title, req.body.body, req.body.tokens );
})

fcmRouter.get("/",(req, res)=>{
    Get.getFCM(req, res);
})

//update
fcmRouter.patch("/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Update.updateFCM(id, req, res);
})

//deleteMany
fcmRouter.delete("/", function (req, res) {
    
    console.log(req.body);
    console.log(req.body.ids);
    Delete.deleteManyUser(req, res, req.body.ids);
})

//delete
fcmRouter.delete("/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Delete.deleteUser(id, req, res);
})


module.exports = fcmRouter;


