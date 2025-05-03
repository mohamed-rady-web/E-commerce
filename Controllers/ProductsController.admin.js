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

        const {productId} = req.body; 


        const { offerPercent, offerPrice, offerImage, startDate, endDate } = req.body;

        const product = await Productsmodel.findOne(
            {productId:productId});

        if (!product) {
            return res.status(404).json({ message: "Product not found" });

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
        res.status(200).json({ message: "Product added to flash sale", Offerproduct});

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
  
      const { productId } = req.body;
      const  updateddata  = req.body;
      Object.keys( updateddata ).forEach(
        (key) =>  updateddata [key] === undefined && delete  updateddata [key]
    );
  
      const product = await Productsmodel.findOneAndUpdate(
         {productId:productId},
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
            const {productId}=req.body;
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
        const {productId}=req.body;
        const deleteProduct= await Productsmodel.findOneAndDelete({productId:productId})
       return res.status(201).json({Massege:"Product deleted sucsesfully"})
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
exports.deleteFromFlashSales =async (req,res) => {
    try{
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied" });}
        const {offerId}= req.body;
        const deleteOffer= await Offers.findOneAndDelete({offerId:offerId})
        res.status(201).json("the offer deleted succesfully")
        const product = await Productsmodel.findOneAndUpdate(
            {productId:deleteOffer.productId},
            {$set:{isInFlashSale:false}},
            {new:true}
        )
    }catch{
        console.error("Error Deleting  offers:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
exports.slider = async (req,res) => {
    try{
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied" });}
            const {Image,Title,Logo,Description,ButtonText,ButtonLink}= req.body
        const sliderprod = await Slider.create(req.body);
        res.status(201).json({ message: "Slider created successfully" });
    }catch(error){
        console.error("Error Creating slider:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
