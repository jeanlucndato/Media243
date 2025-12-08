const express = require('express');
const {
    signup,
    login,
    verifyToken,
    adminSignup
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/admin/signup', adminSignup);

// Protected routes
router.get('/verify-token', protect, verifyToken);

module.exports = router;
