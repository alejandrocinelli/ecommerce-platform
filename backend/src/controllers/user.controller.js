import UserDaoFactory from "../daos/userDaoFactory.js";
import { User } from "../models/user.model.js";
import UserDTO from "../dto/userDto.js";
import dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const daoUser = UserDaoFactory.getDao(process.env.db);
/*
const createUser = async (req, res) => {


  try {
    
    const { username, password, email, phono } = req.body;
    
    const phonoExits = await User.findOne({ phono });
    const userExists = await User.findOne({ email });

    if (userExists || phonoExits) {
      return res.status(400).json({ error: "User e-mail or phono already exists" });
    }
    
    const user = await daoUser.create(req.body);

    

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}*/

const findAllUsers = async (req, res) => {
    try {
        const users = await daoUser.getAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const getLogin = async (req, res) => {
  
  if (req.isAuthenticated()) {
    const user = req.user;
    
    const userDto = new UserDTO(user.username, user.email, user.phono);
    // mailService.sendMail(user.email, user.username  )
    return res.render("loginOk", { user: userDto });
  }
  
  res.sendFile(join(__dirname, '../../views/login.html'));

}

const loginFailed = async (req, res) => {
  res.render("login-error")
}

const getRegister = async (req, res) => {

  if(req.isAuthenticated()){
    const user = req.session.user ; 
    const userDto = new UserDTO(user.username, user.email, user.phono);
    return res.render("loginOk", { user: userDto });
  }
  res.sendFile(join(__dirname, "../../views/register.html"));
}

const registerFailed = async (req, res) => {
  //const errorMessage = req.flash("error")[0]; // obtenemos el primer mensaje de error
    res.render("signup-error", { message: errorMessage });
  //res.render("signup-error");
}

const logout = async (req, res) => {
  req.logout(() => { 
    return res.sendFile(join(__dirname, "../../views/index2.html"));
})
}

const getAdmin = async (req, res) => {
    
  try {
    
    if(req.isAuthenticated()){
      const user = req.user;
      //faltaria hacer un no tenes permisos para entrar aca
      if(user.admin === false){ return res.render('signup-error')}
      //aca tendriamos que llamar al modelo de productos y traer los productos
      return res.render("adminProducts", { username : user.username});
    }

  } catch (error) {
    console.log(error)
  }
}

export const userController = {  findAllUsers ,
  getLogin , getRegister , logout , 
  getAdmin , loginFailed , registerFailed};