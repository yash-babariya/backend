import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    images: [{
        url: {
            type: String,
            required: true
        },
        altText: String
    }]
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;