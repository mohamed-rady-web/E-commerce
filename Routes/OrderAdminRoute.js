const express =require('express');
const router = express.Router();
const OrderController = require('../Controllers/OrderController.admin');


router.put('/order-status/:orderId',OrderController.ChangeOrderStatus);
router.get('/see-allorders/',OrderController.SeeAll);
router.get('/search-order/:orderId',OrderController.SearchOrder);
module.exports = router;