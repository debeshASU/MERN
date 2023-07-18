const express = require('express');
const route = express.Router();
const Product = require("../models/productsModel.js");
const VerifyToken = require('../middleware/token.js');

route.post("/",  async (req,res) =>
{

    const {product_name,product_price,product_image_url} = req.body;
    try{
        const response = await Product.create({product_name,product_price,product_image_url});
        res.json("Successfully created...!!!");


    }
    catch(err)
    {
        res.json(err);
    }
});

// getting the list of products
route.get("/", VerifyToken,  async (req,res) =>
{
    try{
        const response = await Product.find();
        res.json(response);
    }
    catch(err)
    {
        res.json(err);
    }
});

// getting the product by id
route.get("/:id",  async (req,res) =>
{
    try{
        const response = await Product.findById(req.params.id);
        res.json(response);
    }
    catch(err)
    {
        res.json(err);
    }
});




module.exports = route;