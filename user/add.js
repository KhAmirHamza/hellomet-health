const User = require('../models/user')

module.exports = {
     addUser(req, res){
        var uData = req.body.meta_data;
        const user = new User({
            _id: "U" + Date.now(),
            meta_data: {
                name: uData.name,
                phone_number: uData.phone_number,
                image_url: uData.image_url,
                email: uData.email
            },
            auth: {
                phone_number: req.body.auth.phone_number,
                password: req.body.auth.password
            }
        });

        user.save().then((result)=>{
            console.log("Uploading User to MongoDB has successful.");
            console.log(result);
            res.json(result);
            res.end();
        }).catch((error)=>{
            console.log("Uploading User to MongoDB has Failed: error: " + error);
            res.json({ message: "User add Failed" });
            res.end();
        })
  }
}
