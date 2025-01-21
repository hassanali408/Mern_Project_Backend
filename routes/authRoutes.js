const express = require('express');
const { signup, login, logout, validateToken } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout',logout);
router.post('/validate',validateToken)

module.exports = router;
