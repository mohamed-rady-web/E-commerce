const Product =require('../Models/Productsmodel')
const Offers=require('../Models/OffersModel');


const categoryMap = {
    "phone": "Phone",
    "pc-laptop": "Pc/Laptop",
    "tablet": "Tablet",
    "accessories": "Accessories",
    "mens-fashion": "Mens Fashion",
    "womens-fashion": "Womens Fashion",
    "kids-toys": "Kids Fashion",
    "electronics": "Electronics",
    "medcine": "Medcine",
    "sports-outdoor": "Sports&Outdoor",
    "health-beauty": "Health&Beauty",
    "pets": "Pets"
};
exports.RateProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const { rating } = req.body;
        const userId = req.user.id;

        if (!req.user) {
            return res.status(403).json({ message: "Access denied" });
        }

        
        const product = await Product.findOne({productId:productId});
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const alreadyRated = product.ratings.some(r => r.userId.toString() === userId);
        if (alreadyRated) {
            return res.status(400).json({ message: "You have already rated this product" });
        }


        
        const currentTotalRating = product.rating * product.ratingCount;
        const newRateCount = product.ratingCount + 1;
        const newAvgRating = (currentTotalRating + rating) / newRateCount;

        product.ratings.push({ userId, rating });
        product.rating = newAvgRating;
        product.ratingCount= newRateCount;
        await product.save();

        return res.status(200).json({ message: "Product rated successfully", product:{name:product.name,Discraption:product.description,price:product.price,Rate:product.rating,Ratingcount:product.ratingCount} });
    } catch (error) {
        console.error("Error updating product rating:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.ShowProduct = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ 
                success: false,
                message: "Product ID is required" 
            });
        }
        const productId = Number(id);
        if (isNaN(productId)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid Product ID format - must be a number" 
            });
        }
        const product = await Product.findOne({ productId });

        if (!product) {
            return res.status(404).json({ 
                success: false,
                message: "Product not found" 
            });
        }

        res.status(200).json({ 
            success: true,
            data:{name:product.name,description:product.description,rate:product.rate,image1:product.imageUrl_1,image2:product.imageUrl_2,image3:product.imageUrl_3,image4:product.imageUrl_4,image5:product.imageUrl_5,category:product.category}
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error: error.message 
        });
    }
};
exports.IncreamentQuantity = async (req, res) => {
    try { 
        const { productId } = req.body;
        const { quantity = 1 } = req.body;
        if (typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({ 
                success: false,
                message: "Valid positive quantity is required" 
            });
        }
        const numericProductId = Number(productId);
        if (isNaN(numericProductId)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid Product ID format" 
            });
        }
        const currentProduct = await Product.findOne({ productId: numericProductId });
        
        if (!currentProduct) {
            return res.status(404).json({ 
                success: false,
                message: "Product not found" 
            });
        }
        const currentQuantity = currentProduct.quantityinorder || 0; 
        const newQuantity = currentQuantity + quantity;
        const updatedProduct = await Product.findOneAndUpdate(
            { productId: numericProductId },
            { $set: { quantityinorder: newQuantity } },
            { new: true }
        );

        res.status(200).json({ 
            success: true,
            product: updatedProduct,
            operationDetails: {
                newQuantity: newQuantity
            }
        });
    } catch (error) {
        console.error("Error incrementing product quantity:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error: error.message 
        });
    }
};
exports.DecreamentQuantity = async (req, res) => {
    try { 
        const { productId } = req.body;
        const numericProductId = Number(productId);
        if (isNaN(numericProductId)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid Product ID format" 
            });
        }
        const currentProduct = await Product.findOne({ productId: numericProductId });
        
        if (!currentProduct) {
            return res.status(404).json({ 
                success: false,
                message: "Product not found" 
            });
        }
        const currentQuantity = currentProduct.quantityinorder;
        const newQuantity =  currentQuantity - 1;
        if(newQuantity<1){
            return res.status(400).json({massege:"cannot Decrement again"})
        } else{
        const updatedProduct = await Product.findOneAndUpdate(
            { productId: numericProductId },
            { $set: { quantityinorder: newQuantity } },
            { new: true }
        );

        res.status(200).json({ 
            success: true,
            product: updatedProduct,
            operationDetails: {
                newQuantity: newQuantity
            }
        });
    }
    } catch (error) {
        console.error("Error decrementing product quantity:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error: error.message 
        });
    }
};
exports.Catgory = async (req, res) => {
    try {
        const { category } = req.body;
        const actualCategory = categoryMap[category.toLowerCase()];

        if (!actualCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        const products = await Product.find({ category: actualCategory });
        res.status(200).json({ products });

    } catch (error) {
        console.error("Error fetching product by category:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.BestSelling = async (req, res) => {
    try{    
        const products = await Product.find().sort({ quantityinorder: -1 }).limit(8);
        res.status(200).json({ products: {name:products.name,price:products.price,rate:products.rating} });
        } catch (error) {
        console.error("Error fetching best-selling products:", error);
        res.status(500).json({ message: "Something went wrong" });
    
}
}
exports.showRelatedItems = async (req, res) => {
    try {
        const { category, productId } = req.body;

        const relatedProducts = await Product.find({
            category: category,
            productId: { $ne: Number(productId) }
        },{
             name:1,
             imageUrl_6:1,
             price:1,
             _id:0,
        } 
    ).limit(4);

        res.status(200).json({ relatedProducts });

    } catch (error) {
        console.error("Error fetching related products:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

exports.ShowOffers = async (req, res) => {
    try {
        const offers = await Offers.find();
        res.status(200).json({ offers });
    }
    catch (error) {
        console.error("Error fetching offers:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
} 
exports.ShowAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.ShowFlashOffers = async (req, res) => {
    try {
        const offers = await Offers.find().limit(3); 
        res.status(200).json({ offers });
    } catch (error) {
        console.error("Error fetching offers:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.showSliders= async (req,res) => {
    try{
        const sliders = await Slider.find({},{
            _id:0,
            Image:1,
            Title:1,
            Logo:1,
            Description:1,
            ButtonText:1,
            ButtonLink:1,
        }).sort({createdAt:-1}).limit(3);
        res.status(200).json({sliders});
    }catch(error){
        console.error("Error fatshing sliders:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
