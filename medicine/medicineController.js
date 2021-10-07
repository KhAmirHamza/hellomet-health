const express = require("express");
const medicineRouter = express.Router();
const Update = require('../medicine/update')
const Delete = require('../medicine/delete')
const Add = require('../medicine/add')
const Get = require('../medicine/get')

medicineRouter.post("/", function (req, res) {
    Add.addMeMedicine(req, res);
});

medicineRouter.get("/",(req, res)=>{
 //   Get.getMeMedicine(req, res);
})

//update
medicineRouter.patch("/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Update.updateMedicine(id, req, res);
})

//udelete
medicineRouter.delete("/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Delete.deleteMedicine(id, req, res);
})


module.exports = medicineRouter;


