const Product = require('../models/product');



// Buy a product
exports.buyProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
      return res.status(400).json({ success: false, message: "Quantity must be greater than zero." });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // if (product.quantity < quantity) {
    //   return res.status(400).json({ success: false, message: "Insufficient stock available" });
    // }

    product.quantity += quantity;
    await product.save();

    res.status(200).json({ success: true, message: `${quantity} unit(s) bought successfully`, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Sell a product
exports.sellProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
      return res.status(400).json({ success: false, message: "Quantity must be greater than zero." });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    product.quantity -= quantity;
    await product.save();

    res.status(200).json({ success: true, message: `${quantity} unit(s) sold successfully`, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, quantity, price } = req.body;

    const newProduct = await Product.create({ name, quantity, price });
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, quantity, price },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
