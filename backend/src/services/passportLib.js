import bcrypt from "bcrypt"; 
import LocalStrategy from 'passport-local';
import { User } from "../models/user.model.js";
import UserDaoFactory from "../daos/userDaoFactory.js";
import { Carts } from "../models/car.model.js";
import moment from "moment";
import {mailService} from "../services/nodemail.js";

const daoUser = UserDaoFactory.getDao(process.env.db);

const time = moment().format("DD/MM/YYYY HH:mm:ss");

const hashPasword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };

  const validPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
  }; 
  
    const loginStrategy = new LocalStrategy( 
        async (username, password, done) => {
            try {
                const user = await User.findOne({ username });
                if(!user || !validPassword(password, user.password)){
                    return done(null, false, {message: 'Invalid username or password'});
                 }
                    return done(null, user);
            } catch (error) {
                done (error);
            }
    
        }) 

        const registerStrategy = new LocalStrategy( { passReqToCallback: true },
           
            async (req, username, password, done) => {
                                
                try {
                   
                    const existUser = await User.findOne({username});
                   
                    if(existUser){ 
                        console.log("El usuario ya existe")
                        return done(null, false, {message: 'El usuario ya existe'})
                    }
                    
                    const newUser = { 
                        username,
                        password: hashPasword(password),
                        email: req.body.email,
                        phono : req.body.phono
        
                    }
                   
                    const createdUser = await daoUser.create(newUser);
                    // creo el carrito
                    await Carts.create({ username, products: [] , email: req.body.email, time });
                    // envio el mail al admin para avisarle que se registro un nuevo usuario
                     mailService.sendMail(newUser.username, newUser.email);
                    
                     req.user = createdUser;
                                   
                    return done(null, createdUser);
                }  
                catch (error) {
                    
                    done("Error al registrar el usuario o usuario ya existente", null) 
                }
        
        })
        // me parece que al final no lo use 
        
        const adminUserStategy = new LocalStrategy( { passReqToCallback: true },
            async (req, username, password, done) => {

                try {
                    const existUser = await User.findOne({username});
                    if(existUser){ 
                        return done(null, false, {message: username})
                    }
                } catch (error) {
                    
                }
            }
        )

export const passportStrategy = { loginStrategy , registerStrategy , adminUserStategy };