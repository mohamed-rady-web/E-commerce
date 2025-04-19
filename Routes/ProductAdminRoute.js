const express =require('express');
const router = express.Router();
const ProductController = require('../Controllers/ProductsController.admin');
const Middlewares = require('../Middlewares/auth')

router.post('/add-product',Middlewares,ProductController.addProduct);
router.put('/update-product/:productId',ProductController.UpdateProduct);
router.post('/flash-sales/:productId',ProductController.AddToFlashSale);
router.delete('/delete/:productId',ProductController.DeleteProduct);
router.put('/change-price/:productId',ProductController.ChangePrice);
router.delete('/delete-flashsales/:offerId',ProductController.deleteFromFlashSales);
router.post('/create-slider/',ProductController.slider)
module.exports = router;