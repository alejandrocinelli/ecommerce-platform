import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    title: { type: String },
    thumbnail: { type: String },
    price: { type: Number },
},
 {timestamps: true,}
);

export const Product = mongoose.model("product", productSchema);