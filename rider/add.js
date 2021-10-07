const Rider = require('../models/rider')

module.exports = {
     addRider(req, res){
        var rData = req.body.meta_data;
        const rider = new Rider({
            _id: "R" + Date.now(),
            meta_data: {
                name: rData.name,
                phone_number: rData.phone_number,
                date_of_birth: rData.date_of_birth,
                image_url: rData.image_url,
                lat: rData.lat,
                lng: rData.lng
            },
            auth: {
                phone_number: req.body.auth.phone_number,
                password: req.body.auth.password
            }
        });

        rider.save().then((result)=>{
            console.log("uploading Rider to MongoDB has successful.");
            console.log(result);
            res.json(result)
            res.end();
        }).catch((error)=>{
            console.log("uploading Rider to MongoDB has Failed: error: " + error);
            res.json({ message: "Rider add Failed" })
            res.end();
        })

  }
}
