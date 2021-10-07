const User = require('../models/user')

module.exports = {
     updateUser(id, req, res){
    let meta_data = req.body.meta_data;
    let auth = req.body.auth;

    //console.log(req);
    const user = new User({
        _id: id,
        meta_data: {
            email: meta_data.email,
            image_url: meta_data.image_url,
            name: meta_data.name,
            phone_number: meta_data.phone_number
        },
        auth: {
        phone_number: auth.phone_number,
        password: auth.password
        }
    });

    const query = { "_id": id } ;

    User.updateOne(query, {$set: user}, (err, result) => {
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