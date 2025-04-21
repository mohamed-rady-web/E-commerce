const express = require('express');
app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
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
    const connecttodb= async () => {
    try {
        mongoose.set('strictQuery', false); 
            mongoose.connect(process.env.URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
connecttodb();
app.listen(process.env.PORT, () => {
    console.log(`Server is Running on Your Port`);
})
const allowedOrigins = [
    'http://192.168.1.7:5173',
    'https://192.168.1.7:5173'
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
  

app.use('/api', AuthRoute);
app.use('/product', Products);
app.use('/', ContactUs)
app.use('/', About); 
app.use(Middlewares);
app.use('/admin', ContactAd);
app.use('/admin', OrderAd); 
app.use('/order', Orders); 
app.use('/admin', ProductAd); 

