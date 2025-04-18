const ContactUs = require('../Models/ContactModeL');
const ReportModel = require('../Models/ReportModel');
const sendEmail = require('../Models/SendEmail');
exports.UsContact = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(403).json({ message: "Access denied" });
        }
        if (!req.user.role === 'admin') {
            return res.status(403).json({ message: "Access denied" });
        }
        const { name, email, phoneNumber, message } = req.body;
        const newContact = new ContactUs({ name, email, phoneNumber, message });
        await newContact.save();
        res.status(200).json({ message: 'Contact information saved successfully' });
    } catch (error) {
        console.error("Error saving contact information:", error);
        res.status(500).json({ message: "Something went wrong" });
    }

}
exports.Report = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(403).json({ message: "Access denied" });
        }
        const { name, email, PhoneNumber, Report } = req.body;
        const newReport = new ReportModel({ name, email, PhoneNumber, Report });
        await newReport.save();
        res.status(200).json({ message: 'Report information saved successfully' });
    } catch (error) {
        console.error("Error saving report information:", error);
        res.status(500).json({ message: "Something went wrong" });
    }

}
exports.RespondToReport = async (req, res) => {
    try {
        const { reportId } = req.params;
        const { message } = req.body;

        const report = await ReportModel.findById(reportId)

        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }

        const emailText = `Hello ${report.name},\n\nRegarding your report:\n"${report.Report}"\n\nAdmin Response:\n${message}`;

        await sendEmail(report.email, "Response to Your Report", emailText);

        res.status(200).json({ message: "Response sent successfully" });
        report.findByIdAndDelete(reportId)
    } catch (error) {
        console.error("Error responding to report:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.DeleteReport = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied" });
        }
        const { reportId } = req.params;
        const report = await Report.findByIdAndDelete(reportId);
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        res.status(200).json({ message: "Report deleted successfully" });
    } catch (error) {
        console.error("Error deleting report:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
exports.GetContact = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(403).json({ message: "Access denied" });
        }
        const contacts = await ContactUs.find();
        res.status(200).json({ contacts });
    } catch (error) {
        console.error("Error fetching contact information:", error);
        res.status(500).json({ message: "Something went wrong" });
    }

}
exports.SeeAllRep= async (req,res) => {
    try{
        const reports = await ReportModel.find().sort({createdAt:-1});
        res.status(200).json({reports});
    }catch(error){
        console.error("Error fetching reports:", error);
        res.status(400).json("somthing went wrong")
        
    }
    
}