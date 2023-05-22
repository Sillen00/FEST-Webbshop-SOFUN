import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    categoryIDs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Category',  
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    imageID: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stockLevel: {
        type: Number,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    isArchived: {
        type: Boolean,
        default: false,
    },
});

export type Product = mongoose.InferSchemaType<typeof productSchema>;
export const ProductModel = mongoose.model<Product>('Product', productSchema);
