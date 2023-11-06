const express = require('express');
const router = express.Router();
const Blog = require('../models/blogModel');
const mongoose = require("mongoose");
const multer  = require("multer");
const path = require("path")

const storage = multer.diskStorage({
    destination:function(req,file, cb){
        cb(null, "./uploads");
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + "_"+ Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage: storage}).single("image");


router.use((req,res,next )=> {
    console.log(req.path, req.method);
    next();
})

//Get all blogs
router.get('/', async(req, res) =>{

    const blogs = await Blog.find();
    res.status(200).json(blogs);
});

//Get by Category
router.get('/categories/:category', async(req,res)=>{
    const {category} = req.params;

    const categoryBlogs = await Blog.find({category: category});

    if(!categoryBlogs){
        res.status.json("No blogs in this category");
        return;
    }

    res.status(200).json(categoryBlogs);
});

//Get by Search
router.get('/query/:query', async(req,res)=>{
    const {query} = req.params;

    const regexQuery = new RegExp(query, 'i');
    
    const queryBlogs = await Blog.find({
        "$or":[
            {"title":{$regex: regexQuery}},
            {"author":{$regex: regexQuery}},
            {"category":{$regex: regexQuery}},
        ]
    });

    if(!queryBlogs){
        res.status.json("No result");
        return;
    }

    res.status(200).json(queryBlogs);
})

//GET Single-Blog
router.get('/:id', async(req,res)=>{
    
    try{
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(400).json(`No blog with this ${id}`);
        }
        
        const singleBlog = await Blog.findById(id);
        
        if(!singleBlog) {
            res.status(400).json("No such blog");
            return;
        }
        
        res.status(200).json(singleBlog);
    }
    catch(error){
        console.log(error);
        res.status(400).json(error);
    }
    
}
)

//POST Blog
router.post('/addshots',upload,async(req,res) =>{

    const {title, body, category, author} = req.body;
    const imageName = req.file.filename;

    console.log(title);
    console.log(body);
    console.log(category);
    console.log(author);
    console.log(imageName);

    try{
        const newBlog = await Blog.create({
            title, 
            body, 
            category, 
            author, 
            image: imageName
        });
        res.status(200).json(newBlog);
    }catch(error){
        res.status(400).json(error);
    }
});

//Delete Blog
router.delete('/delete/:id',async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json(`No blog with this ${id}`);
    }
    const deletedBlog = await Blog.findByIdAndDelete({_id: id})

    if(!deletedBlog){
        res.status(400).json("No such blog")
        return;
    }

    res.status(200).json("Blog Deleted");
});

//UPDATE Blog
router.put('/update/:id',async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json(`No blog with this ${id}`);
    }
    const updatedBlog = await Blog.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if(!updatedBlog){
        res.status(400).json("No such blog")
        return;
    }

    res.status(200).json(updatedBlog);
});

module.exports = router;