

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createStory, getStories } = require('../controllers/storyController');
const sanitizeHtml = require('sanitize-html');
const { validateInput } = require('../middleware/inputValidation');
const protect = require('../middleware/authMiddleware');
router.post(
  '/generate-story',
  [
    body('prompt').customSanitizer(value => sanitizeHtml(value)), 
    validateInput,
  ],
  protect,
  createStory
  
);

router.get('/get',protect, getStories);

module.exports = router;
