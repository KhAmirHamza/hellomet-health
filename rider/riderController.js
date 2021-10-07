const express = require("express");
const riderRouter = express.Router();
const Update = require('../rider/update')
const Delete = require('../rider/delete')
const Add = require('../rider/add')
const Get = require('../rider/get')

riderRouter.post("/", function (req, res) {
    Add.addRider(req, res);
});


riderRouter.get("/",(req, res)=>{
    Get.getRider(req, res);
})
riderRouter.get("/auth",(req, res)=>{
    Get.authenticateRider(req, res);
})

//update
riderRouter.patch("/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Update.updateRider(id, req, res);
})

//udelete
riderRouter.delete("/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Delete.deleteRider(id, req, res);
})


module.exports = riderRouter;


