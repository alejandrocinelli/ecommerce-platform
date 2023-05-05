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
        const { title, thumbnail, price } = req.body;
       
        const titleExits = await Product.findOne({ title });
        if (titleExits) {
            return res.status(400).json({ error: "Product title already exists" });
        }
        if(!title || !thumbnail || !price){
            return res.status(400).json({ error: "Missing required fields" });
        }
        const product = await daoProduct.create(req.body);
    
        res.render("chargeCorrect", { product });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
 }

export const productController = {
    createProduct,
}    