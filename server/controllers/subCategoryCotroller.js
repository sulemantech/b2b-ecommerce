const subCategoryModel = require("../models/subCategoryModel");

const createSubCategory = async (req, res) => {
    try {
      const { name, categoryId } = req.body;
  
      const newSubCategory = await subCategoryModel.create({        
        name,
        categoryId,
      });
  
      res.status(201).json(newSubCategory);
    } catch (error) {
      console.error('Error creating subcategory: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  const getAllSubCategories = async (req, res) => {
    try {
      const allSubCategories = await subCategoryModel.findAll();
      res.status(200).json(allSubCategories);
    } catch (error) {
      console.error('Error getting subcategories:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  module.exports = {
    // Define route for creating a subcategory
    createSubCategory,
    getAllSubCategories,
    post: [
      {
        path: "/api/subcategory/create",
        method: createSubCategory,
      },
    ],
  
    // Define route for getting all subcategories
    get: [
      {
        path: "/api/subcategory/all",
        method: getAllSubCategories,
      },
    ],
  };
  