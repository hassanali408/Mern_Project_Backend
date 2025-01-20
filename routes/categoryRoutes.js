// routes/categoryRoutes.js
const express = require('express');
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/categoryController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', protect, createCategory);
router.get('/get', protect, getCategories);
router.put('/update/:id', protect, updateCategory);
router.delete('/delete/:id', protect, deleteCategory);

module.exports = router;
