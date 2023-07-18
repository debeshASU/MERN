const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username : String,
    password : String,
    cartItems : [ {p_id : {type : mongoose.Schema.Types.ObjectId, ref : "products"} , quantity : Number} ]

});

module.exports = mongoose.model("User", userSchema);