const express = require('express');
const {
    getAllCategories
} = require('../controllers/categoryController');

const router = express.Router();

// Public category routes
router.get('/', getAllCategories);

module.exports = router;
