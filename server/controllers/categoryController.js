const categoryModel = require('../models/categoryModel');
const productModel = require('../models/productModel');

const getAllCategories = async (req, res) => {
  try {
    const categoryList = await categoryModel.findAll({
      include: [
        {
          model: productModel,
          attributes: ['id', 'name', 'price'],
        },
      ],
    });
    res.status(200).json(categoryList);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCategoryWithSubcategories = async (req, res) => {
 
  try {
    const id = req.params.id;
    console.log("iddddddddddddd", req.params.id);
    
    const subcategories = await categoryModel.findAll({
      // Condition for main categories
      attributes: ['id', 'name'],
      include: [
        // { model: categoryModel,  },
        { 
          model: categoryModel,
          as: 'subcategories',
          where: { parentId: id },
          include: [
            {
              model: categoryModel,
              as: 'subcategories',
              
              
            }
          ]
        }
      ]
    });
    
    res.json(subcategories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error in categoryController' });
  }
  
  }

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await categoryModel.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const products = await category.getProducts();

    res.status(200).json(products);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await categoryModel.create({ name });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating category' });
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const { name } = req.body;

    const category = await categoryModel.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.name = name;
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await categoryModel.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const deletedCategoryDetails = {
      id: category.id,
      name: category.name,
    };

    await category.destroy();

    res.status(200).json({
      message: 'Category deleted successfully',
      deletedCategory: deletedCategoryDetails,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,

  getCategoryWithSubcategories,
 
    get: [
      {
        path: '/api/categories/all',
        method: getAllCategories,
      },
      {
        path: '/api/categories/:categoryId',
        method: getCategoryById,
      },
      {
        path: '/api/categories/subCategories/all/:id',
        method: getCategoryWithSubcategories,
      },
    ],
    post: [
      {
        path: '/api/categories/',
        method: createCategory,
      },
    ],
    put: [
      {
        path: '/api/categories/:categoryId',
        method: updateCategoryById,
      },
    ],
    delete: [
      {
        path: '/api/categories/:categoryId',
        method: deleteCategoryById,
      },
    ],
  
};
