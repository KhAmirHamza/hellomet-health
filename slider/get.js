const Slider = require('../models/slider')

module.exports = {
     getSlider(req, res){
         
        const {limit =50 , page =1, title, id} = req.query;
        console.log("limit");
        console.log(limit);
        console.log("skip");
        console.log(((page-1)*limit));
        
        var searchQuery ={}
        
        if (title) {
            //  {"meta_data.name" : {$regex : ".*"+name+".*/i"}}
            searchQuery = { 'data.titile' : { '$regex' : titile, '$options' : 'i' } }
            findSliders(req, res, searchQuery, limit, page)
        } else if (id) {
            searchQuery = {"_id" : {$regex : ".*"+id+".*"}}
            findSliders(req, res, searchQuery, limit, page)
        }else{
            findSliders(req, res, searchQuery, limit, page);
        }
  }
}

function findSliders(req, res, searchQuery, limit, page){
    Slider.find(searchQuery)
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
function findSlider(req, res, searchQuery){

    Slider.findOne(searchQuery, function(error, result){
        if (error) {
            console.log(error);
        }else{
            res.json(result);
            res.end();
        }
    })
}
