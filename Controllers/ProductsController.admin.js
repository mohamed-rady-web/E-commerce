const Product =require('../Models/Productsmodel')
const Offers=require('../Models/OffersModel');
const Productsmodel = require('../Models/Productsmodel');
const Slider = require ('../Models/SliderModel')
const categoryMap = {
    "phone": "Phone",
    "pc-laptop": "Pc/Laptop",
    "tablet": "Tablet",
    "accessories": "Accessories",
    "mens-fashion": "Mens Fashion",
    "womens-fashion": "Womens Fashion",
    "kids-toys": "Kids/Toys",
    "electronics": "Electronics",
    "medcine": "Medcine",
    "sports-outdoor": "Sports&Outdoor",
    "health-beauty": "Health&Beauty",
    "pets": "Pets"
};
exports.AddToFlashSale = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied" });
        }

        const {productId} = req.params; // ✅


        const { offerPercent, offerPrice, offerImage, startDate, endDate } = req.body;

        const product = await Productsmodel.findOne(
            { productId:productId });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });

        }
        if(product.isInFlashSale === true){ 
            return res.status(400).json({ message: "Product is already in flash sales" });
        }
        const Offerproduct = await Offers.create({
            productId:productId,
            offerPercent: offerPercent,
            offerPrice: offerPrice,
            offerImage: offerImage,
            startDate: startDate,
            endDate:endDate,
            discraption:"the best offer you can see "
        })
       const status =await Productsmodel.findOneAndUpdate({productId},
        {$set:{isInFlashSale:true}}, {new:true});
        res.status(200).json({ message: "Product added to flash sale", Offerproduct:{Percent:Offerproduct.offerPercent,Image:Offerproduct.offerImage,discription:product.description,price:Offerproduct.offerPrice,endDate:Offerproduct.endDate} });

    } catch (error) {
        console.error("Error adding product to flash sale:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

exports.addProduct = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied" });
        }
        const newproduct = req.body;
        const product = await Productsmodel.create(newproduct)
        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

exports.UpdateProduct = async (req, res) => {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied" });
      }
  
      const { productId } = req.params;
      const  updateddata  = req.body;
      Object.keys( updateddata ).forEach(
        (key) =>  updateddata [key] === undefined && delete  updateddata [key]
    );
  
      const product = await Productsmodel.findOneAndUpdate(
        { productId:productId },
        {
          $set: {  ...updateddata }
        },
        { new: true }
      );
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({ message: "Product updated successfully", product });
  
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
exports.ChangePrice = async (req,res) =>{
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied" })};
            const {productId}=req.params;
            const {price}=req.body;
            
            const updatedPrice= await Productsmodel.findOneAndUpdate(
                {productId:productId},
                {$set:{price:price}},
                {new:true}
            )
            res.status(201).json({Massege:"Price Updated Succsesfully",data:updatedPrice})
    } catch (error) {
        console.error("Error updating product price:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
exports.DeleteProduct = async (req,res) =>{
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied" });
        } 
        const {productId}=req.params;
        const deleteProduct= await Productsmodel.findOneAndDelete({productId:productId})
       return res.status(201).json({Massege:"Product deleted sucsesfully"})
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
exports.ShowAllProducts = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied" });
        }else {
        const products = await Product.find();
        res.status(200).json({ products });
    }} catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.ShowFlashOffers = async (req, res) => {
    try {
        const offers = await Offers.find().limit(3); // No populate needed
        res.status(200).json({ offers });
    } catch (error) {
        console.error("Error fetching offers:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.deleteFromFlashSales =async (req,res) => {
    try{
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied" });}
        const {offerId}= req.params
        const deleteOffer= await Offers.findOneAndDelete({offerId:offerId})
        res.status(201).json("the offer deleted succesfully")
    }catch{
        console.error("Error Deleting  offers:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
exports.slider = async (req,res) => {
    try{
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied" });}
            const {Image,Title}= req.body
        const sliderprod = await Slider.create(req.body);
        res.status(201).json({ message: "Slider created successfully" });
    }catch(error){
        console.error("Error Creating slider:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
exports.showSliders= async (req,res) => {
    try{
        const sliders = await Slider.find();
        const Images=sliders.map(slider =>slider.Image)
        res.status(200).json({Images});
    }catch(error){
        console.error("Error fatshing sliders:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
