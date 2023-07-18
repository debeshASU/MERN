const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');
const Product = require('../models/productsModel.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const VerifyToken = require('../middleware/token.js');

// for increasing the cart items
router.put("/addItem", async (req, res) =>
{
    const{user_id,p_id} = req.body;
    try{
        const user = await User.findById(user_id);
        const cartItem = user.cartItems.find((item) => item.p_id.equals(p_id));

        if (!cartItem) {
         // Item does not exist in the cart, add a new item
         user.cartItems.push({ p_id, quantity: 1 });
         await user.save();
         return res.json(1);
        } 
        else {
         // Item already exists in the cart, increase the quantity
        cartItem.quantity += 1;
        await user.save();
       return res.json(cartItem.quantity);
      }   
    }
    catch(err)
    {
        res.json(err);
    }
});

// for reducing the cart items
router.put("/removeItem", async (req, res) =>
{
    const{user_id,p_id} = req.body;
    try{
        const user = await User.findById(user_id);
        const cartItem = user.cartItems.find((item) => item.p_id.equals(p_id));
        if( !cartItem )
        {
            return res.json(-1);
        }
        
            cartItem.quantity -= 1;
            await user.save();
            if (cartItem.quantity === 0) {
                const result = await User.updateOne(
                  { _id: user_id },
                  { $pull: { cartItems: { p_id: p_id, quantity: { $eq: 0 } } } }
                );
                return res.json(0);
              }
            return res.json(cartItem.quantity);
       
    }
    catch(err)
    {
        res.json(err);
    }
});

// for registering
router.post("/register", async (req, res) =>
{
    const{username,password} = req.body;
    try{
        const user = await User.findOne({username});
        if( !username || !password )
        {
            return res.json("Fields cannot be empty...!!!");
        }
        if( user )
        {
            return res.json("Username already exists...!!!");
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const response = await User.create({username,password:hashedPassword});
        console.log(response);
        return res.json("Successfully Registered...!!!");

    }
    catch(err)
    {
        res.json(err);
    }
});

// for login
router.post("/login",  async (req, res) =>
{
    const{username,password} = req.body;
    try{
        if( !username || ! password )
        {
            return res.status(400).json("Fields cannot be empty...!!!");
        }
        const user = await User.findOne({username});
        if(!user)
        {
            return res.status(400).json("User not found...!!!");
        }
        const isCorrectPassword = await bcrypt.compare(password,user.password);
        if(!isCorrectPassword)
        {
            return res.status(400).json("Invalid Credentials...!!!");
        }
        const token = await jwt.sign({user_id  :user._id}, process.env.SECRET_CODE);
        return res.json({ id : user.id, token});
    }
    catch(err)
    {
        res.json(err);
    }
});

router.get("/cartItems/:id" , VerifyToken,  async (req,res) =>
{
   try{
     const user = await User.findById(req.params.id);
     return res.json(user.cartItems);
   }
   catch(err)
   {
    res.json(err);
   }
});

// get the total cart price of the user
router.get("/totalPrice/:id", async (req, res) => {
    try {
       const user = await User.findById(req.params.id);
       let total_price = 0;
       
       for (const product of user.cartItems) {
          try {
             const foundProduct = await Product.findById(product.p_id);
             let p_price = foundProduct.product_price;
             let price = product.quantity * p_price;
             total_price += price;
          } catch (err) {
             throw err;
          }
       }
       
       return res.json(total_price);
    } catch (err) {
       res.json(err);
    }
 });
 
 
 

module.exports= router;