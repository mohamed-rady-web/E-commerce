const Order = require('../Models/Ordersmodel');
exports.ChangeOrderStatus = async (req, res) => {
    try {
        

        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied" });
        }
        const { orderId } = req.body;
        const { status } = req.body;
        const order = await Order.findOneAndUpdate({orderId:orderId}, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order status updated successfully", order });
        const orders = await Order.findOne({orderId:orderId})
    if (order.status === "delivered"||order.status === "canceled") {
        const deleteOrder= await Order.findOneAndDelete({orderId:orderId})
        return res.status(404).json({ message: "Order Deliverd or canceld" });
    }

    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
exports.SeeAll = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied" });
        }
        const orders = await Order.find();
        res.status(200).json({ orders });
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
exports.SearchOrder = async (req, res) => {
    try {
         if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied" });
        }
        const { orderId } = req.body;
       
        const order = await Order.findOne({orderId:orderId});
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ order });
        
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
