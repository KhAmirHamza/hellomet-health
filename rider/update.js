const Rider = require('../models/rider')

module.exports = {
    updateRider(id, req, res){
    let meta_data = req.body.meta_data;
    let auth = req.body.auth;

    //console.log(req);
    const rider = new Rider({
        _id: id,
        meta_data: {
            date_of_birth: meta_data.date_of_birth,
            image_url:  meta_data.image_url,
            name:  meta_data.name,
            phone_number:  meta_data.phone_number,
            lat: meta_data.lat,
            lng: meta_data.lng
        },
        auth: {
        phone_number: auth.phone_number,
        password: auth.password
        }
    });

    const query = { "_id": id } ;

    Rider.updateOne(query, {$set: rider}, (err, result) => {
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