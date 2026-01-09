const express = require('express');
// import functions
const { getUsers, createUser, updateUser, deleteUser, loginUser } = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Public route - Login
router.post('/login', loginUser);

// Protected routes - Admin only
router.use(authenticate); // All routes below require authentication

// Combination - Get all users and Create user (Admin only)
router.route('/')
  .get(authorize('admin'), getUsers)
  .post(authorize('admin'), createUser);

// Update and Delete user (Admin only)
router.route('/:id')
  .put(authorize('admin'), updateUser)
  .delete(authorize('admin'), deleteUser);

module.exports = router;