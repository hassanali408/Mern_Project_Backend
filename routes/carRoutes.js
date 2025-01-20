const express = require('express');
const { createCar, getCars, updateCar, deleteCar } = require('../controllers/carController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', protect, createCar);
router.get('/get', protect, getCars);
router.put('/update/:id', protect, updateCar);
router.delete('/delete/:id', protect, deleteCar);

module.exports = router;
