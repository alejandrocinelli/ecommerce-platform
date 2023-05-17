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
import args from './yargs.js';
import os from 'os';
import cluster from 'cluster';
import { Server as IOServer } from "socket.io";
import { Chat } from "./models/chat.model.js";
import moment from 'moment';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cpu = os.cpus()

if(cluster.isPrimary && args.mode.toUpperCase() ===  "cluster"){
  cpu.map(() => cluster.fork())
  console.log(`Master ${process.pid} is running`)

  cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} died`)
      cluster.fork()
  })
  ;
}
else{

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
 
  done(null, user._id);
});  

passport.deserializeUser((id, done) => {
    User.findById(id).then((data) => {
        done(null, data);
    })
        .catch((err) => { console.error(err); })
}); 

app.use("/", routes)

connectDb();    

 const expressServer = app.listen(args.port, () => {
    console.log(`Server listening port ${args.port}`);
    }); 

const io = new IOServer(expressServer);
 
const time = moment().format('DD MM YYYY HH:mm:ss');

io.on("connection", async (socket) => {
  console.log("New client connected id: " + socket.id);

  socket.emit("server:message", await Chat.find());
 
  socket.on("client:message", async (messageInfo) => {
    
    await Chat.create({ ...messageInfo, time });
    io.emit("server:message", await Chat.find());
});

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
}
);
}
  
