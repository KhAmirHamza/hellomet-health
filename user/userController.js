const express = require("express");
const userRouter = express.Router();
const Update = require('../user/update')
const Delete = require('../user/delete')
const Add = require('../user/add')
const Get = require('../user/get')

userRouter.post("/", function (req, res) {
    Add.addUser(req, res);
});


userRouter.get("/",(req, res)=>{
    Get.getUser(req, res);
})

userRouter.get("/auth",(req, res)=>{
    Get.authenticateUser(req, res);
})

//update
userRouter.patch("/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Update.updateUser(id, req, res);
})

//deleteMany
userRouter.delete("/", function (req, res) {
    
    console.log(req.body);
    console.log(req.body.ids);
    Delete.deleteManyUser(req, res, req.body.ids);
})

//delete
userRouter.delete("/:id", function (req, res) {
    let id = req.params.id;
   // console.log(req);
Delete.deleteUser(id, req, res);
})


module.exports = userRouter;


