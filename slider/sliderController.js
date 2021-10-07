const express = require("express");
const sliderRouter = express.Router();
const Update = require('../slider/update')
const Delete = require('../slider/delete')
const Add = require('../slider/add')
const Get = require('../slider/get')

sliderRouter.post("/", function (req, res) {
    Add.addSlider(req, res);
});


sliderRouter.get("/",(req, res)=>{
    Get.getSlider(req, res);
})


//update
sliderRouter.patch("/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Update.updateSlider(id, req, res);
})

//udelete
sliderRouter.delete("/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Delete.deleteSlider(id, req, res);
})


module.exports = sliderRouter;
