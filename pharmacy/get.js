const Pharmacy = require('../models/pharmacy')

module.exports = {
     getPharmacy(req, res){
         
        const {limit =10 , page =1, name, id, phone_number} = req.query;
        console.log("limit");
        console.log(limit);
        console.log("skip");
        console.log(((page-1)*limit));
        
        var searchQuery ={}
        
        if (name) {
            //  {"meta_data.name" : {$regex : ".*"+name+".*/i"}}
            searchQuery = { 'meta_data.name' : { '$regex' : name, '$options' : 'i' } }
            findPharmacies(req, res, searchQuery);
        } else if (id) {
            searchQuery = {"_id" : id}
            findPharmacy(req, res, searchQuery);

        }else if (phone_number) {
            searchQuery = {"meta_data.phone_number" : phone_number}
            findPharmacy(req, res, searchQuery);
        }
        else{
            findPharmacies(req, res, searchQuery);
        }
    },
    authenticatePharmacy(req, res){
      var query = {
          "auth.phone_number": req.query.phone_number,
          "auth.password": req.query.password
      }
      findPharmacy(req, res, query);
    }
}


function findPharmacies(req, res, searchQuery, limit, page){
    Pharmacy.find(searchQuery)
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
function findPharmacy(req, res, searchQuery){

    Pharmacy.findOne(searchQuery, function(error, result){
        if (error) {
            console.log(error);
        }else{
            res.json(result);
            console.log(result);
            res.end();
        }
    })
}
