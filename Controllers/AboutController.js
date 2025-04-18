const About= require('../Models/UsModel');
exports.AddToUs = async (req, res) => {
    try {
        console.log(req.user);
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied" });
        } else {
            const {AboutUs,name,email ,Image, Position, linKedIn, Facebook, Instagram } = req.body;
            const newAdmin = await About.create({AboutUs ,name, email, Image, Position, linKedIn, Facebook, Instagram });
            res.status(200).json({ message: 'Admin added successfully', newAdmin });
        }
    } catch (error) {
        console.error("Error adding admin:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
exports.Us=async (req,res) =>{
    try {
            const admins = await About.find();
            res.status(200).json({ admins });
        
    } catch (error) {
        console.error("Error fetching admins:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}