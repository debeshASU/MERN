const mongoose = require('mongoose');

const DbConnect = async () =>
{
     try{

        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Successfully connected to the Database!!!");

     }
     catch(err)
     {
        console.log(err);
     }
}

module.exports = DbConnect ;