const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');
const authorSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
})
const Author = mongoose.model('Author', authorSchema);

Author.signup = async(name, email, password)=>{
    
    if(!name || !email || !password){
        throw Error('All details are Required');
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not Valid');
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong');
    }

    const exists = await Author.findOne({email});

    if(exists){
        throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);

    const author = await Author.create({
        name,
        email, 
        password: hash
    })
    return author;
}

Author.login = async(email, password)=>{
    
    if(!email || !password){
        throw Error('All details are Required');
    }

    const author = await Author.findOne({email});

    if(!author){
        throw Error('Incorrect Email or Password');
    }

    const match = await bcrypt.compare(password, author.password);

    if(!match){
        throw Error('Incorrect Email or Password');
    }else{
        return author;
    }
}
module.exports = Author;