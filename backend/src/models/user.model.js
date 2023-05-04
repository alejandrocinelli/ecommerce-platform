import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: true 
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    phono: {
        type: String,
        required: true,
        trim: true
       
    },

    admin:{
        type: Boolean,
        default: false
    }, 
},
 {timestamps: true,}
);
 
export const User = mongoose.model('user', userSchema);