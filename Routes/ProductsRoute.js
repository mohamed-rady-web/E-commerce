const express =require('express');
const router = express.Router();
const ProductController = require('../Controllers/ProductsController');
const Middlewares = require('../Middlewares/auth');

router.post('/rate/:productId',Middlewares,ProductController.RateProduct);
router.get('/show-product/:productId',ProductController.ShowProduct);
router.put('/plus/:productId',ProductController.IncreamentQuantity);
router.put('/mins/:productId',ProductController.DecreamentQuantity);
router.get('/show-category/:category',ProductController.Catgory);
router.get('/show-best/',ProductController.BestSelling);
router.get('/related-items/:category/:productId',ProductController.showRelatedItems);
router.get('/offers/',ProductController.ShowOffers)
router.get('/show-slider/',ProductController.showSliders)
router.get('/show-flashsales/',ProductController.ShowFlashOffers)
router.get('/show-all/',ProductController.ShowAllProducts);

module.exports = router;