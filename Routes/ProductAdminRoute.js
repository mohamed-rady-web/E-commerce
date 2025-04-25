const express =require('express');
const router = express.Router();
const ProductController = require('../Controllers/ProductsController.admin');
const Middlewares = require('../Middlewares/auth')

router.post('/add-product',Middlewares,ProductController.addProduct);
router.put('/update-product/',ProductController.UpdateProduct);
router.post('/flash-sales/',ProductController.AddToFlashSale);
router.delete('/delete/',ProductController.DeleteProduct);
router.put('/change-price/',ProductController.ChangePrice);
router.delete('/delete-flashsales/',ProductController.deleteFromFlashSales);
router.post('/create-slider/',ProductController.slider)
module.exports = router;