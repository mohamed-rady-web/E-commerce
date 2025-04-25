const express =require('express');
const router = express.Router();
const OrderController = require('../Controllers/OrdersController');



router.post('/product/',OrderController.AddToCart);
router.get('/cart',OrderController.Cart);
router.delete('/remove-cart/',OrderController.RemoveFromCart);
router.post('/checkout/',OrderController.Checkout);
router.post('/Create/',OrderController.CreateOrder);
router.delete('/deleteorder/',OrderController.CancelOrder);
router.get('/orderdetalis/',OrderController.OrderDetails);
router.get('/ShowOrders/',OrderController.Allorders);
module.exports = router;