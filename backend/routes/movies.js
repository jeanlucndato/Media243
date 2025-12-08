const express = require('express');
const {
    getAllMovies,
    getMovie
} = require('../controllers/movieController');

const router = express.Router();

// Public movie routes
router.get('/', getAllMovies);
router.get('/:id', getMovie);

module.exports = router;
