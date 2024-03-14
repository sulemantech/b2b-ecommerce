const supplierModel = require('../models/supplierModel');

// Controller function to get all suppliers
const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await supplierModel.findAll();
    res.json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to get a specific supplier by ID
const getSupplierById = async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await supplierModel.findByPk(id);
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.json(supplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to create a new supplier
const createSupplier = async (req, res) => {
  const { supplier_name, contact_info, contact_person, website, description } = req.body;
  try {
    const newSupplier = await supplierModel.create({
      supplier_name,
      contact_info,
      contact_person,
      website,
      description,
    });
    res.status(201).json(newSupplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  get: [
    {
      path: '/api/suppliers/all',
      method: getAllSuppliers,
    },
    {
      path: '/api/suppliers/:id',
      method: getSupplierById,
    },
  ],
  post: [
    {
      path: '/api/suppliers/',
      method: createSupplier,
    },
  ],
  
  };
  
