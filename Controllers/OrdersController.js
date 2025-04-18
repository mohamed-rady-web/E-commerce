const Order = require('../Models/Ordersmodel');
const Product = require('../Models/Productsmodel');
const Cart = require('../Models/CartModel');
const mongoose =require('mongoose')
const Checkout =require('../Models/CheckoutModel');

exports.AddToCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity = 1 } = req.body;
        const userId = req.user.id;

        console.log("Received:", { userId, productId, quantity });

        // 1. Find product by custom productId field
        const product = await Product.findOne({ productId });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // 2. Check if item already in cart
        const existingCartItem = await Cart.findOne({ userId, productId });
        if (existingCartItem) {
            // Update quantity
            const updatedQuantity = existingCartItem.quantity + Number(quantity);
            await Cart.updateOne(
                { userId, productId },
                { quantity: updatedQuantity }
            );
        } else {
            // 3. Create new cart item
            await Cart.create({
                userId,
                productId: product.productId, // Make sure this exists
                quantity: Number(quantity),
                productname: product.name,
                productPrice: product.price,
                productImage: product.imageUrl_1
            });
        }

        return res.status(200).json({ message: "Added to cart successfully" });

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


exports.Cart = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(403).json({ message: "Access denied" });
        }
        const userId = req.user.id;
        const cartItems = await Cart.find({ userId }); // Query cart items by userId
       

        // Map through the cart items and return the necessary details
        const cartDetails = cartItems.map(item => ({
            productName: item.productname,
            CartItemId:item.cartItemId,
            price: item.productPrice,
            image: item.productImage,
            quantity: item.quantity,
        }));

        res.status(200).json(cartDetails); // Return the cart details in the response
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

exports.RemoveFromCart = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        if (!req.user) {
            return res.status(403).json({ message: "Access denied" });
        }
        const userId = req.user.id; 
        const cartItem = await Cart.findOneAndDelete(cartItemId);
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        res.status(200).json({ message: "Product removed from cart", cartItem });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
exports.CreateOrder = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(403).json({ message: "Access denied" });
        }

        const userId = req.user.id;
        const { cartItemIds } = req.body;

        if (!Array.isArray(cartItemIds) || cartItemIds.length === 0) {
            return res.status(400).json({ message: "No cart items selected" });
        }


        const cartItems = await Cart.find({ 
            userId,
            cartItemId: { $in: cartItemIds.map(Number) } 
        });
            console.log(cartItems)
        if (cartItems.length === 0) {
            return res.status(404).json({ message: "No matching cart items found" });
        }

        let totalPrice = 0;
        const productsArray = [];

        for (const item of cartItems) {
            const product = await Product.findOne({ productId: item.productId });

            if (!product || product.stockQuantity < item.quantity) {
                return res.status(400).json({ message: `Product ${product?.name || "unknown"} is out of stock or unavailable` });
            }

            product.quantityinorder += item.quantity;
            product.stockQuantity -= item.quantity;
            await product.save();
            
            totalPrice += product.price * item.quantity;

            productsArray.push({
                productId: product.productId,
                name:product.name,
                price: product.price,
                image:product.imageUrl_1,
                quantity: item.quantity
            });
        }

        const order = new Order({
            userId,
            products:productsArray,
            totalPrice,
            status: 'pending'
        });

        await order.save();
        res.status(200).json({
            message: "Order placed successfully",
            userId:userId,
            products:productsArray,
            totalPrice:order.totalPrice,
            orderId:order.orderId
            
        });
        await Cart.deleteMany({ cartItemId: { $in: cartItemIds }, userId });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.Checkout = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(403).json({ message: "Access denied" });
      }
        const {username}= req.user.name
      const userId = req.user.id;
      const { orderId } = req.params;
      const {phonenumber}=req.body;
  
      const order = await Order.findOne({ orderId: parseInt(orderId), userId });
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      if (order.Checkedout) {
        return res.status(400).json({ message: "Order is already checked out" });
      }
  
      const checkoutRecords = [];
  
      for (const item of order.products) {
        const checkout = new Checkout({
            username:username,
            phonenumber:phonenumber,
            productId: item.productId,
            orderId: order.orderId,
            totalPrice:order.totalPrice,
            checkoutDate: new Date(), 
                DeleverDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
                Orderstatus: "Coming to you", 
        });
  
        await checkout.save();
        checkoutRecords.push(checkout);
      }
      
      order.Checkedout = true;
      order.status ="coming to you"
      await order.save();
  
      res.status(200).json({
        message: "Checkout completed successfully",
        data:phonenumber,
        checkouts: checkoutRecords,
      });
  
    } catch (error) {
      console.error("Error during checkout:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  



exports.Allorders = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(403).json({ message: "Access denied" });
        }
        const userId = req.user.id; 
        const orders = await Order.find({ userId });
        res.status(200).json({ orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

exports.OrderDetails = async (req, res) => {
    try {
        const {orderId } = req.params;
        if (!req.user) {
            return res.status(403).json({ message: "Access denied" });
        }
        const userId = req.user.id; 
        const order = await Order.findOne({orderId});
        if (!order || order.userId.toString() !== userId) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ order });
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

exports.CancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        if (!req.user) {
            return res.status(403).json({ message: "Access denied" });
        }
        const userId = req.user.id; 
        const order = await Order.findOneAndDelete({orderId});
        if (!order || order.userId.toString() !== userId) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order cancelled successfully", order });
    } catch (error) {
        console.error("Error cancelling order:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
