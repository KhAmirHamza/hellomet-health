const { ifError } = require("assert");
const { json } = require("body-parser");
const { response } = require("express");
const express = require("express");
const medicineRouter = express.Router();

const Medicine = require('../models/medicine')


module.exports = {
     deleteMedicine(id, req, res){

    const query = { "_id": id } ;

      Medicine.deleteOne(query, (error, result)=>{
          if (error) {
              console.log(error);
          }else{
              res.json({"message": id+" Medicine is Deleted!"})
          }
      })

  }
}