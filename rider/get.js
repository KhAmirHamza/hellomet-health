const Rider = require('../models/rider')

module.exports = {
     getRider(req, res){
         
        const {limit =50 , page =1, name, id, phone_number} = req.query;
        console.log("limit");
        console.log(limit);
        console.log("skip");
        console.log(((page-1)*limit));
        
        var searchQuery ={}
        
        if (name) {
            //  {"meta_data.name" : {$regex : ".*"+name+".*/i"}}
            searchQuery = { 'meta_data.name' : { '$regex' : name, '$options' : 'i' } }
            findRiders(req, res, searchQuery, limit, page)
        } else if (id) {
            searchQuery = {"_id" : {$regex : ".*"+id+".*"}}
            findRiders(req, res, searchQuery, limit, page)
        }
        else if (phone_number) {
            searchQuery = {"meta_data.phone_number" : phone_number}
            findRider(req, res, searchQuery);
        }else{
            findRiders(req, res, searchQuery, limit, page);
        }
  },
  authenticateRider(req, res){
    var query = { 
        "auth.phone_number": req.query.phone_number,
        "auth.password": req.query.password
    }
    findRider(req, res, query);
  }
}

function findRiders(req, res, searchQuery, limit, page){
    Rider.find(searchQuery)
            .limit(parseInt(limit)).skip(((page-1)*limit))
            .then((result)=>{
                res.json(result);
                res.end();
            })
            .catch((error)=>{
                console.log(error);
                res.end()
            })
}
function findRider(req, res, searchQuery){

    Rider.findOne(searchQuery, function(error, result){
        if (error) {
            console.log(error);
        }else{
            res.json(result);
            res.end();
        }
    })
}
