
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
 
    get: [
      {
        path: '/api/categories/all',
        method: getAllCategories,
      },
      {
        path: '/api/categories/:categoryId',
        method: getCategoryById,
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


        /**
          * @swagger
          * /api/categories/all:
          *  get:
          *   tags:
          *  - categoryController
          

          */
          
app.get('/api/categories/all',async (req, res) => {
 // #swagger.tags = ['categoryController']
  {
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
}
})


        /**
          * @swagger
          * /api/categories/:categoryId:
          *  get:
          *   tags:
          *  - categoryController
          

          */
          
app.get('/api/categories/:categoryId',async (req, res) => {
 // #swagger.tags = ['categoryController']
  {
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
}
})


        /**
          * @swagger
          * /api/categories/:
          *  post:
          *   tags:
          *  - categoryController
          

          */
          
app.post('/api/categories/',async (req, res) => {
 // #swagger.tags = ['categoryController']
  {
  try {
    const { name } = req.body;
    const category = await categoryModel.create({ name });
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating category' });
  }
}
})


        /**
          * @swagger
          * /api/categories/:categoryId:
          *  put:
          *   tags:
          *  - categoryController
          

          */
          
app.put('/api/categories/:categoryId',async (req, res) => {
 // #swagger.tags = ['categoryController']
  {
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
}
})


        /**
          * @swagger
          * /api/categories/:categoryId:
          *  delete:
          *   tags:
          *  - categoryController
          

          */
          
app.delete('/api/categories/:categoryId',async (req, res) => {
 // #swagger.tags = ['categoryController']
  {
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
}
})
