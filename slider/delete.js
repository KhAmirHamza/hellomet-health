const Slider = require('../models/slider')

module.exports = {
     deleteSlider(id, req, res){

    const query = { "_id": id } ;

    Slider.deleteOne(query, (error, result)=>{
          if (error) {
              console.log(error);
          }else{
              res.json({"message": id+" Slider data is Deleted!"})
          }
      })

  }
}