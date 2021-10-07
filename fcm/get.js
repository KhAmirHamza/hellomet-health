const FCM = require('../models/fcm')

module.exports = {
     getFCM(req, res){
         
        const {id} = req.query;
        var searchQuery ={}
        
        if (id) {
            searchQuery = {"_id" : id}
            FCM.findOne(searchQuery)
            .then((result)=>{
                res.json(result);
                res.end();
            })
            .catch((error)=>{
                console.log(error);
            })
        }else{
            FCM.find(searchQuery)
            .then((result)=>{
                res.json(result);
                res.end();
            })
            .catch((error)=>{
                console.log(error);
            })
        }
            

  }
}
