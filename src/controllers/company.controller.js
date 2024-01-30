// src/controllers/productController.js
const Company = require('../companies/company.entity');

const getCompany = async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addCompany = async (req, res) => {
    const { companyName, email, address, encryptedPassword } = req.body;
    try {
        const company = new Company({ companyName, email, address, encryptedPassword });
        const savedCompany = await company.save();
        res.status(201).json(savedCompany);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getCompany,
    addCompany,
};