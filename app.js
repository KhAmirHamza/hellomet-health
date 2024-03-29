const express = require('express');

const app = express();
const { ifError } = require("assert");
const { json } = require("body-parser");
app.use(express.json());
var storage, path;
path = require('path');
const multer = require("multer");

const fcm = require('./fcm/fcmController');

const order = require('./order/orderController');
const medicine = require('./medicine/medicineController');
const pharmacyController = require('./pharmacy/pharmacyController');
const riderController = require('./rider/riderController');
const userController = require('./user/userController');
const sliderController = require('./slider/sliderController')


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept, Authorization');
     if (req.method === 'OPTIONS') {
         res.header('Access-Control-Allow-Method', 'GET, PUT, POST, PATCH, DELETE');
         return res.status(200).json({});
     }
     next();
});


app.use("/order", order);
app.use("/medicine", medicine);
app.use("/pharmacy", pharmacyController);
app.use("/rider", riderController);
app.use("/user", userController);
app.use("/fcm", fcm);
app.use("/slider", sliderController)

var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
// res.append('Access-Control-Allow-Credentials', 'true');

//     next();
// });


//Updating Specefic value for all documents of collection
app.get("/customUpdate", (req, res)=>{
    updateSpeceficPropertiesForAllDocumentsOfCollection();
    res.end();
})
function updateSpeceficPropertiesForAllDocumentsOfCollection(){
        var count = 0;
        //todo.....mongodb connection now can reuse...
        const Medicine  = require('./models/medicine')
        Medicine.find({})
            .then((elements)=>{

                console.log("elements");
                //console.log(elements);

                elements.map(element=>{
                    const query = { "_id": element._id } ;
                    element.meta_data.image_url = element.meta_data.image_url.replace("https://api.hellometbd.com/","https://hellomet-health.herokuapp.com/")
                    Medicine.updateOne(query, {$set: element}, (err, result) => {
                        if (err) {
                            console.log(err);
                        }else{
                            //console.log(result);
                            console.log(++count);
                        }
                      });
                })
            
            })
            .catch((error)=>{
                console.log(error);
                res.end()
            })

        // var db = Client.db(dbName);
        // var coll = db.collection(collectionName)
        // coll.find({}).toArray(function(error, elements){
        //     if (error) {
        //         console.log(error);
        //     }else{

        //     }
        // })
}
// mongoUtil.connetToServer(function(error, Client){
//     if (error) {
//         console.log(error);
//     }else{
//     }
// })

storage = multer.diskStorage({
    destination: './Images/',
    filename: function (req, file, cb) {
        return cb(null, "image_" + new Date().getTime() + (path.extname(file.originalname)));
    }
});

var upload = multer({ storage: storage })

// uploading image to server hadrdisk then reference will insert to MongoDb...
app.post("/uploadImageToGenarateUrl",
    upload.single('uploadImage'),
    function (req, res) {
        console.log(req.file);
       console.log(__dirname + "/Images/" + req.file.filename);
       var ref = { url: "https://hellomet-health.herokuapp.com/Images/" + req.file.filename }
       res.json(ref);
    }
);



 app.get("/Images/:imageName", (req, res) => {
    file = req.params.imageName;
  res.sendFile(path.join(__dirname, "./Images/"+file));
});

app.get('/get',function(req, res){
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end("Success");
})

//For Cpanel...
//app.listen(5000);


//For Cloud Hosting...
const PORT = process.env.PORT || 5000;
app.listen(PORT, function(error){
    if(error){
        console.log(error);
    }else{
        console.log('Server is running on port :' + PORT);
    }
});

