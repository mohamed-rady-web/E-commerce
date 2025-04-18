const express = require('express');
app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('dotenv').config();
const AuthRoute = require('./Routes/AuthRoute');
const About =require ('./Routes/AboutRoute')
const ContactAd= require('./Routes/ContactAdminRoute')
const ContactUs= require('./Routes/ContactUsRoute')
const OrderAd =require('./Routes/OrderAdminRoute')
const Orders = require('./Routes/OrderRoute')
const ProductAd=require('./Routes/ProductAdminRoute')
const Products =require('./Routes/ProductsRoute')
const Middlewares=require('./Middlewares/auth')
const uri =process.env.URI;
    const connecttodb= async () => {
    try {
        mongoose.set('strictQuery', false); 
            mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
connecttodb();
app.listen(process.env.PORT, () => {
    console.log(`Server is Running on Your Port`);
})

app.use('/api', AuthRoute);
app.use('/product', Products);
app.use('/', ContactUs)
app.use('/', About); 
app.use(Middlewares);
app.use('/admin', ContactAd);
app.use('/admin', OrderAd); 
app.use('/order', Orders); 
app.use('/admin', ProductAd); 

