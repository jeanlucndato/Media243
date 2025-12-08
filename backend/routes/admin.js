const express = require('express');
const { protect, restrictToAdmin } = require('../middleware/auth');
const {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    getStats
} = require('../controllers/adminController');
const {
    createMovie,
    updateMovie,
    deleteMovie,
    getAllMoviesAdmin
} = require('../controllers/movieController');
const {
    getAllCategoriesAdmin,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');

const router = express.Router();

// All routes require authentication and admin role
router.use(protect);
router.use(restrictToAdmin);

// Statistics
router.get('/stats', getStats);

// User management
router.get('/users', getAllUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Movie management
router.get('/movies', getAllMoviesAdmin);
router.post('/movies', createMovie);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);

// Category management
router.get('/categories', getAllCategoriesAdmin);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

module.exports = router;
