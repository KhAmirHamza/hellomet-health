const Order = require('../models/order')

module.exports = {
     deleteOrder(id, req, res){
        const query = { "_id": id } ;

        Order.deleteOne(query, (error, result)=>{
            if (error) {
                console.log(error);
                res.end();
            }else{
                res.json({"message": id+" order is Deleted!"})
                res.end();
            }
        })
     }
     ,
     deleteManyOrder(req, res, idArray){
        const query = {_id: { $in: idArray}}
        Order.deleteMany(query,function(error){
            if (error) {
                console.log(error);
                res.end();
            }else{
                console.log("Multiple Order are Deleted");
                res.json({"message": " Multiple Order are Deleted!"})
                res.end();
            }
        })
      }
}