const Slider = require('../models/slider')

module.exports = {
    updateSlider(id, req, res){
    let data = req.body;

    //console.log(req);
    const slider = new Slider({
        _id: id,
        data: {
            title: data.title,
            image_url:  data.image_url
        }
    });

    const query = { "_id": id } ;

    Slider.updateOne(query, {$set: slider}, (err, result) => {
        if (err) {
            console.log(err);
            res.end();
        }else{
            console.log(result);
            res.json(result)
            res.end();
        }
      });

  }
}