const express = require('express');
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  buyProduct,
  sellProduct,
} = require('../controllers/productController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// CRUD routes
router.post('/', authenticate, authorizeAdmin, createProduct);
router.get('/',  getProducts);
router.put('/:id', authenticate, authorizeAdmin, updateProduct);
router.delete('/:id', authenticate, authorizeAdmin, deleteProduct);

// Buy and Sell routes
router.post('/:id/buy', authenticate, authorizeAdmin, buyProduct); 
router.post('/:id/sell', authenticate, authorizeAdmin, sellProduct); // Requires admin authorization

module.exports = router;
