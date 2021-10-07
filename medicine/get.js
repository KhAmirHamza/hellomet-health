const Medicine = require('../models/medicine')

module.exports = {
     getMeMedicine(req, res){
         
        const {limit =10 , page =1, name, id} = req.query;
        console.log("limit");
        console.log(limit);
        console.log("skip");
        console.log(((page-1)*limit));
        
        var searchQuery ={}
        
        if (name) {
            //  {"meta_data.name" : {$regex : ".*"+name+".*/i"}}
            searchQuery = { 'meta_data.name' : { '$regex' : name, '$options' : 'i' } }
            findMedicines(req, res, searchQuery, limit, page);
        } else if (id) {
            searchQuery = {"_id" : id}
            findMedicine(req, res, searchQuery);
        }else{
            findMedicines(req, res, searchQuery, limit, page);
        }
  }
}
function findMedicines(req, res, searchQuery, limit, page){
    Medicine.find(searchQuery)
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
function findMedicine(req, res, searchQuery){

    Medicine.findOne(searchQuery, function(error, result){
        if (error) {
            console.log(error);
        }else{
            res.json(result);
            res.end();
        }
    })
}
