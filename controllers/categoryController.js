const Category = require('../models/Category');
const Car = require('../models/Cars');
const mongoose = require('mongoose');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const user = req.user.userId;
    const category = new Category({ name,user });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error creating category', error: err.message });
  }
};


const getCategories = async (req, res) => {
  try {
    const userId = req.user.userId;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const categories = await Category.find({ user: userId })
      .skip(skip)
      .limit(limit);

    const totalCategories = await Category.countDocuments({ user: userId });

    res.status(200).json({
      totalCategories,
      currentPage: page,
      totalPages: Math.ceil(totalCategories / limit),
      categories,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories', error: err.message });
  }
};


const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;   const userId = req.user.userId; 
  
    const category = await Category.findOne({ _id: req.params.id, user: userId });
    if (!category) 
    return res.status(404).json({ message: 'Category not found or you are not authorized to update it' });

    category.name = name || category.name;

    await category.save();
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error updating category', error: err.message });
  }
};


const deleteCategory = async (req, res) => {
  try {
    const categoryId = new mongoose.Types.ObjectId(req.params.id);
    const isCategoryInUse = await Car.findOne({ category: categoryId });

    if (isCategoryInUse) {
      return res.status(400).json({ message: 'Cannot delete category, it is linked to one or more cars',status:"invalid" });
    }
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting category', error: err.message });
  }
};


module.exports = { createCategory,getCategories,updateCategory,deleteCategory };
