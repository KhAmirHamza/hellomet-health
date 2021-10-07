const Pharmacy = require('../models/pharmacy')

module.exports = {
     addPharmacy(req, res){
        var pData = req.body.meta_data;
        const pharmacy = new Pharmacy({
            _id: "P" + Date.now(),
            meta_data: {
                name: pData.name,
                founder: pData.founder,
                image_url: pData.image_url,
                latitude: pData.latitude,
                longitude: pData.longitude,
                phone_number: pData.phone_number,
                status: pData.status
            },
            auth: {
                phone_number: req.body.auth.phone_number,
                password: req.body.auth.password
            }
        });

        pharmacy.save().then((result)=>{
            console.log("uploading Pharmacy to MongoDB has successful.");
            console.log(result);
            res.json(result)
            res.end();
        }).catch((error)=>{
            console.log("uploading Pharmacy to MongoDB has Failed: error: " + error);
            res.json({ message: "Pharmacy add Failed" })
            res.end();
        })

  }
}
