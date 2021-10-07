const Pharmacy = require('../models/user')

module.exports = {
     deletePharmacy(id, req, res){

    const query = { "_id": id } ;

      Pharmacy.deleteOne(query, (error, result)=>{
          if (error) {
              console.log(error);
          }else{
              res.json({"message": id+" Pharmacy is Deleted!"})
          }
      })

  }
}