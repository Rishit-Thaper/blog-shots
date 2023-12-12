const jwt = require('jsonwebtoken')
const Author  =require('../models/authorModel')

const requireAuth = async(req, res, next) =>{

    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({error:'Authorization Token required'});
    }    
    const token = authorization.split(' ')[1]

    try{
        const{_id} = jwt.verify(token, process.env.SECRET)

        req.user = await Author.findOne({_id}).select('_id');
        next()

    }catch(error){
        console.log(error);
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Authorization token has expired' });
        }
        return res.status(401).json({ error: 'Request is not authorized' });
    }
}

module.exports = requireAuth