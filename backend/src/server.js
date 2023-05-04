import express from 'express';
import { fileURLToPath } from "url";
import path , { dirname, join } from "path";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import connectDb from './config/db.js';
import routes from './routes/index.js';
import { passportStrategy } from './services/passportLib.js';
import session from 'express-session';
import passport from 'passport';
import {User} from "./models/user.model.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.engine(
    "hbs",
    engine({
      extname: ".hbs",
      defaultLayout: "main.hbs",
    })
  );
  app.set("view engine", ".hbs");

  app.use(session({
    secret: 'secret',
    resave: true,
    rolling: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  
})) 

app.use(passport.initialize()); // inicializamos passport
app.use(passport.session());

passport.use("login", passportStrategy.loginStrategy);
passport.use("register", passportStrategy.registerStrategy);

passport.serializeUser((user, done) => {
  //console.log(user);
  done(null, user._id);
});  
/* 
passport.deserializeUser((user_id, done) => {
    User.findById(user_id)
  
    });*/ 

passport.deserializeUser((id, done) => {
    User.findById(id).then((data) => {
        done(null, data);
    })
        .catch((err) => { console.error(err); })
}); 

app.use("/", routes)

connectDb();    

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
    }); 

