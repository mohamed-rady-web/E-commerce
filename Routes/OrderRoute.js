const express =require('express');
const router = express.Router();
const OrderController = require('../Controllers/OrdersController');



router.post('/product/:productId',OrderController.AddToCart);
router.get('/cart',OrderController.Cart);
router.delete('/:cartItemId',OrderController.RemoveFromCart);
router.post('/checkout/:orderId',OrderController.Checkout);
router.post('/Create/',OrderController.CreateOrder);
router.delete('/deleteorder/:orderId',OrderController.CancelOrder);
router.get('/orderdetalis/:orderId',OrderController.OrderDetails);
router.get('/ShowOrders/',OrderController.Allorders);
module.exports = router;