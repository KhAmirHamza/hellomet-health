const mongoose = require('mongoose');
const config = {useNewUrlParser: true, useUnifiedTopology: true };
const hellometDbConnectUrl = "mongodb+srv://hellomethealth:hellomethealth@cluster0.vrnxz.mongodb.net/hellomet?retryWrites=true&w=majority";

module.exports = {
    getHellometDbConnection(){
        return mongoose.createConnection(hellometDbConnectUrl, config, function(error, result){
            if (error) {
                console.log(error)
            }else{
                console.log("Connected with Hellomet Db!")
            }
        });
    }
}