const User = require('../models/user')

module.exports = {
     getUser(req, res){
         
        const {limit =50 , page =1, name, id, phone_number} = req.query;
        console.log("limit");
        console.log(limit);
        console.log("skip");
        console.log(((page-1)*limit));
        
        var searchQuery ={}
        
        if (name) {
            //  {"meta_data.name" : {$regex : ".*"+name+".*/i"}}
            searchQuery = { 'meta_data.name' : { '$regex' : name, '$options' : 'i' } }
            findUsers(req, res, searchQuery, limit, page)
        } else if (id) {
            searchQuery = {"_id" : {$regex : ".*"+id+".*"}}
            findUsers(req, res, searchQuery, limit, page)
        }else if (phone_number) {
            searchQuery = {"meta_data.phone_number" : phone_number}
            findUser(req, res, searchQuery);
        }else{
            findUsers(req, res, searchQuery, limit, page);
        }
        
        
            User.find(searchQuery)
            .limit(parseInt(limit)).skip(((page-1)*limit))
            .then((result)=>{
                res.json(result);
                res.end();
            })
            .catch((error)=>{
                console.log(error);
            })

  },
  authenticateUser(req, res){
    var query = { 
        "auth.phone_number": req.query.phone_number,
        "auth.password": req.query.password
    }
    findUser(req, res, query);
  }
}

function findUsers(req, res, searchQuery, limit, page){
    User.find(searchQuery)
            .limit(parseInt(limit)).skip(((page-1)*limit))
            .then((result)=>{
                res.json(result);
                res.end();
            })
            .catch((error)=>{
                console.log(error);
                res.end()
            });
}
function findUser(req, res, searchQuery){

    User.findOne(searchQuery, function(error, result){
        if (error) {
            console.log(error);
        }else{
            res.json(result);
            res.end();
        }
    });
}
