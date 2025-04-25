const express =require('express');
const router = express.Router();
const ProductController = require('../Controllers/ProductsController');
const Middlewares = require('../Middlewares/auth');

router.post('/rate/',Middlewares,ProductController.RateProduct);
router.get('/show-product/',ProductController.ShowProduct);
router.put('/plus/',ProductController.IncreamentQuantity);
router.put('/mins/',ProductController.DecreamentQuantity);
router.get('/show-category/',ProductController.Catgory);
router.get('/show-best/',ProductController.BestSelling);
router.get('/related-items/',ProductController.showRelatedItems);
router.get('/offers/',ProductController.ShowOffers)
router.get('/show-slider/',ProductController.showSliders)
router.get('/show-flashsales/',ProductController.ShowFlashOffers)
router.get('/show-all/',ProductController.ShowAllProducts);

module.exports = router;