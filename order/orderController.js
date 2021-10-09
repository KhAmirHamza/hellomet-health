const express = require("express");
const orderRouter = express.Router();
const Update = require('../order/update')
const Delete = require('../order/delete')
const Add = require('../order/add')
const Get = require('../order/get')
const Range =  require('../order/range')
const Order = require('../models/order')

orderRouter.post("/", function (req, res) {
    Add.addOrder(req, res);
});

orderRouter.get("/",(req, res)=>{
    Get.getOrder(req, res);
})

orderRouter.get("/all",(req, res)=>{
    Get.getAllOrdersAsoLocal(req, res);
})

//update
orderRouter.patch("/:id", function (req, res) {
    let id = req.params.id;
    // console.log(req);
    Update.updateOrder(id, req, res);
})

//deleteMany
orderRouter.delete("/", function (req, res) {
    
    console.log(req.body);
    console.log(req.body.ids);
    Delete.deleteManyOrder(req, res, req.body.ids);
})

//delete
orderRouter.delete("/all", function (req, res) {
    Order.deleteMany({},function(error){
            if (error) {
                console.log(error);
                res.end();
            }else{
                console.log("Multiple Order are Deleted");
                res.json({"message": " Multiple Order are Deleted!"})
                res.end();
            }
        })
})

//delete
orderRouter.delete("/:id", function (req, res) {
    let id = req.params.id;
    console.log(id);
    Delete.deleteOrder(id, req, res);
})



orderRouter.get("/range", function (req, res) {
    Range.getOrderByRange(req, res)
})

module.exports = orderRouter;


