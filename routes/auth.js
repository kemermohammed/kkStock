// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.get('/verify-email', authController.verifyEmail);
router.post('/login', authController.login);
router.put('/:id', authController.updateUser);
router.delete('/:id', authController.deleteUser);
router.get('/', authController.getAllUsers);
router.get('/:id', authController.getSingleUser);

module.exports = router;
