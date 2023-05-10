import CartDaoFactory from "../daos/cartDaoFactory.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

import dotenv from 'dotenv';

dotenv.config();

const daoCart = CartDaoFactory.getDao(process.env.db);

const findCartById = async (req , res, next) => {
    try {
        const {user} = req.session.passport;
       
        const findUserNameById = await User.findById(user);
        const userNameFind = findUserNameById.username;
        
        const cart = await daoCart.getByFilter({username: userNameFind,});
        //aca deberiamos renderizar el carrito por su id 
        res.json(cart);

    } catch (error) {
        next(error);
    }    
}

const addToCart = async (req, res, next) => {
    try {
        const {user} = req.session.passport;
        const findUserNameById = await User.findById(user);
        const userNameFind = findUserNameById.username;
        const {id} = req.params;
        const cart = await daoCart.getByFilter({username: userNameFind,});
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({error: 'Product not found'});
        }
        if(cart.products.includes(product._id)){ 
            cart.products.quantity += 1;} else {    
                cart.products.push(product);
            }
        await daoCart.update(cart._id, cart);
        res.json(cart);
    } catch (error) {
        next(error);
    }
}

export const cartController = { findCartById , addToCart };