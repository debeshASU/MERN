const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   product_name : String,
   product_price : Number,
   product_image_url : String

});

module.exports = mongoose.model("Product", productSchema);