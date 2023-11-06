require('dotenv').config();
const express = require('express');
const router = express.Router();
const Author = require('../models/authorModel');
const mongoose = require("mongoose");
const jwt =  require('jsonwebtoken');

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"});
}

router.post('/login', async(req,res)=>{
    const {email, password} = req.body;


    try{
        const author = await Author.login(email, password);
        const token = createToken(author._id);

        res.status(200).json({author, token});
    }catch(error){
        res.status(400).json({error: error.message})
    }

})

router.post('/signup', async(req,res)=>{

    const {name, email, password} = req.body;


    try{
        const author = await Author.signup(name, email, password);
        
        const token = createToken(author._id);

        res.status(200).json({name, email, token});
    }catch(error){
        res.status(400).json({error: error.message});
    }

})
module.exports = router;
