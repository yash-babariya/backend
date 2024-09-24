import Product from '../models/productModel.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1, updatedAt: -1, __v: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, inStock, images } = req.body;
        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            inStock,
            images
        });
        res.status(201).json({ product: newProduct, message: 'Product created successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, inStock, images } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, category, inStock, images },
            { new: true }
        );
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (deletedProduct) {
            res.json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error deleting product', error: error.message });
    }
};