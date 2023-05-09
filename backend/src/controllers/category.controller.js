import { Product } from "../models/product.model.js";

const getCategoryMen = async (req, res) => {
    try {
        const products = await Product.find({ category: 'men' }).lean(); 
        res.render("loginOk", { products: products });
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
      }
}

const getCategoryWomen = async (req, res) => {
    try {
        const products = await Product.find({ category: 'woman' }).lean(); 
        res.render("loginOk", { products: products });
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
      }
}

const getCategoryKids = async (req, res) => {
    try {
        const products = await Product.find({ category: 'kids' }).lean(); 
        res.render("loginOk", { products: products });
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
      }
}

export const categoryController = { getCategoryMen , getCategoryWomen , getCategoryKids};