import CartDaoFactory from "../daos/cartDaoFactory.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import {Order}  from "../models/order.model.js"
import OrderDto from "../dto/orderDto.js"
import UserDTO from "../dto/userDto.js";
import { mailService } from "../services/nodemail.js";

import moment from "moment";
import dotenv from 'dotenv';

dotenv.config();

const time = moment().format("DD/MM/YYYY HH:mm:ss");

const daoCart = CartDaoFactory.getDao(process.env.db);

const findCartById = async (req , res, next) => {
    try {
        const {user} = req.session.passport;
       
        const findUserNameById = await User.findById(user);
        const userNameFind = findUserNameById.username;
        
        const cart = await daoCart.getByFilter({username: userNameFind,})
        //aca deberiamos renderizar el carrito por su id 
        const products = cart.products; 
       
        res.render('cart', {products});
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
        if (cart.products.some(item => item.title === product.title)) {
            cart.products.find(item => item.title === product.title).quantity++
            
        }
        else {
            cart.products.push(product);
        }

        await daoCart.update(cart._id, cart);
        res.render('chargeCorrectCart', {cart});
    } catch (error) {
        next(error);
    }
}

const decrementQty = async (req, res, next) => {
    try {
        const {user} = req.session.passport;
        const findUserNameById = await User.findById(user);
        const userNameFind = findUserNameById.username;
        const {id} = req.params;
        const product = await Product.findById(id);
        const cart = await daoCart.getByFilter({username: userNameFind,});
     
        // necesito una funcion que se decremente la cantidad de productos en el carrito

    if(!product){
        return res.status(404).json({error: 'Product not found'});
    }

    if (cart.products.some(item => item.title === product.title)) {
        cart.products.find(item => item.title === product.title).quantity--

        // necesito saber si quantity es 0 para eliminar el producto del carrito
        if(cart.products.find(item => item.title === product.title).quantity === 0){
            cart.products = cart.products.filter(item => item.title !== product.title)
            
        }
       
    }

    await daoCart.update(cart._id, cart);
    const products = cart.products;
    res.render('cart', {products});
    
    }
    catch (error) {
        next(error);
    }
}

const increaseQty = async (req, res, next) => {
    try {
        const {user} = req.session.passport;
        const findUserNameById = await User.findById(user);
        const userNameFind = findUserNameById.username;
        const {id} = req.params;
        const product = await Product.findById(id);
        const cart = await daoCart.getByFilter({username: userNameFind,});
     

    if(!product){
        return res.status(404).json({error: 'Product not found'});
    }

    if (cart.products.some(item => item.title === product.title)) {
        cart.products.find(item => item.title === product.title).quantity++
    }

    await daoCart.update(cart._id, cart);
    const products = cart.products;
    res.render('cart', {products});
    
    }
    catch (error) {
        next(error);
    }

}

const emptyCart = async (req, res, next) => {
    try {
        const {user} = req.session.passport;
        const findUserNameById = await User.findById(user);
        const userNameFind = findUserNameById.username;
        const cart = await daoCart.getByFilter({username: userNameFind,});
        cart.products = [];
        await daoCart.update(cart._id, cart);
        res.render('cart', {cart});
    } catch (error) {
        next(error);
    }
}

const finishCart = async (req, res, next) => {
    try {
        const {user} = req.session.passport;
        const findUserNameById = await User.findById(user);
        const userNameFind = findUserNameById.username;
        const cart = await daoCart.getByFilter({username: userNameFind,});
                
        const OrdernsLength  = await Order.find() 

        const orderSend = {
            user : userNameFind,
            products : cart.products ,
            orderNumber : OrdernsLength.length + 1,
            dateTime : time, 
            status: "generada",
            customerEmail : findUserNameById.email
        }
                
        const sendOrder = await Order.create(orderSend)
        
        const userDto = new UserDTO(userNameFind,findUserNameById.email,findUserNameById.phono, )
        const orderDto = new OrderDto(orderSend.products , orderSend.orderNumber)
        
        const sendInfoFront = {
            user : userDto,
            order: orderDto
        }
        
     
       // mandamos el mail con la info del usuario y la orden
       mailService.sendMailCartPurchased(sendInfoFront)
       
        // falta borrar el carrito 
       /* cart.products = [];
        await daoCart.update(cart._id, cart);
       */
      
        res.render("finishCart",{sendInfoFront});
    } catch (error) {
        next(error);
    }
}

export const cartController = { findCartById , addToCart, decrementQty, 
    increaseQty , emptyCart , finishCart};