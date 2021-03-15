const express = require("express");
const port = process.env.PORT || 8000; //Run locally on port 8000
const MONGO_DB_ROOT = "struth";
const MONGO_DB_PASSWORD = "Saket@123";
const MONGO_DB_DATABASE = "ecommerce";
const userRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const app = express();
const mongoose = require("mongoose"); 
const bcrypt = require('bcrypt');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const path = require('path');
const cors = require('cors');
mongoose.connect(`mongodb+srv://struth:Saket@123@cluster0.b9wuc.mongodb.net/ecommerce?retryWrites=true&w=majority`,
    {   useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex:true})
        .then(()=>{
            console.log("Connected");
        }).catch((e)=>{
            console.log(e);
        })
app.use(cors());
app.use(express.json());

app.use('/public',express.static(path.join(__dirname,'uploads')));
app.use('/api',userRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
// listen to port 8000
app.listen(port,()=>{
    console.log("Success server")
})