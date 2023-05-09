import ProductDaoFactory from "../daos/productDaoFactory.js";
import { Product } from "../models/product.model.js";

import dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const daoProduct = ProductDaoFactory.getDao(process.env.db);

const createProduct = async (req, res) => {
    try {
        const { title, thumbnail, price, category } = req.body;
       
        const titleExits = await Product.findOne({ title });
        if (titleExits) {
            return res.status(400).json({ error: "Product title already exists" });
        }
        if(!title || !thumbnail || !price || !category){
            return res.status(400).json({ error: "Missing required fields" });
        }
        const product = await daoProduct.create(req.body);
    
        res.render("chargeCorrect", { product });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
 }

 const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await daoProduct.delete(id);
        
        res.render("deleteCorrect", { product });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const getProductsId = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await daoProduct.getById(id);       
        res.render("updateProducts", { product : product.title, id: product._id ,
             price : product.price , category : product.category , thumbnail : product.thumbnail });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, thumbnail, price, category } = req.body;
        const product = await daoProduct.update(id, { title, thumbnail, price, category });
        res.render("chargeCorrect", { product });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const productController = {
    createProduct, deleteProduct , getProductsId , updateProduct
}    