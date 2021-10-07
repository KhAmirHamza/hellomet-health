const express = require("express");
const pharmacyRouter = express.Router();
const Update = require('../pharmacy/update')
const Delete = require('../pharmacy/delete')
const Add = require('../pharmacy/add')
const Get = require('../pharmacy/get')

pharmacyRouter.post("/", function (req, res) {
    Add.addPharmacy(req, res);
});
pharmacyRouter.get("/auth",(req, res)=>{
    Get.authenticatePharmacy(req, res);
})

pharmacyRouter.get("/",(req, res)=>{
    Get.getPharmacy(req, res);
})



//update
pharmacyRouter.patch("/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Update.updatePharmacy(id, req, res);
})

//udelete
pharmacyRouter.delete("/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Delete.deletePharmacy(id, req, res);
})


module.exports = pharmacyRouter;


