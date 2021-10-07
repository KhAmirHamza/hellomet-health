const Rider = require('../models/rider')

module.exports = {
     deleteRider(id, req, res){

    const query = { "_id": id } ;

      Rider.deleteOne(query, (error, result)=>{
          if (error) {
              console.log(error);
          }else{
              res.json({"message": id+" Rider is Deleted!"})
          }
      })

  }
}