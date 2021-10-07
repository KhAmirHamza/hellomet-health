const Slider = require('../models/slider')

module.exports = {
     addSlider(req, res){
        var sData = req.body;
        const slider = new Slider({
            _id: "S" + Date.now(),
            data: {
                title: sData.title,
                image_url: sData.image_url
            }
        });

        slider.save().then((result)=>{
            console.log("Uploading Slider to MongoDB has successful.");
            console.log(result);
            res.json(result)
            res.end();
        }).catch((error)=>{
            console.log("uploading Slider to MongoDB has Failed: error: " + error);
            res.json({ message: "Slider add Failed" })
            res.end();
        })

  }
}
