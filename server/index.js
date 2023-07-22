const express = require('express');
require('dotenv').config();
const DbConnect = require('./database/dbConnection.js');
DbConnect();
const app = express();
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add any other HTTP methods your frontend might use
  };
  
  app.use(cors(corsOptions));
const route = require('./routes/productRoutes.js');
const router = require('./routes/userRoutes.js');

app.use(express.json());
app.use(cors());
app.use("/products", route);
app.use("/users",router);
app.listen(process.env.DB_PORT, ()=>
{
    console.log(`Server started at port : ${process.env.DB_PORT}`);
});