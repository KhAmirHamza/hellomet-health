const User = require('../models/user')

module.exports = {
     deleteUser(id, req, res){

    const query = { "_id": id } ;

      User.deleteOne(query, (error, result)=>{
          if (error) {
              console.log(error);
              res.end();
          }else{
              res.json({"message": id+" User is Deleted!"})
              res.end();
          }
      })
  },
  deleteManyUser(req, res, idArray){
     const query = {_id: { $in: idArray}}
     User.deleteMany(query,function(error){
         if (error) {
             console.log(error);
             res.end();
         }else{
             console.log("Multiple User are Deleted");
             res.json({"message": " Multiple User are Deleted!"})
             res.end();
         }
     })
   }
}