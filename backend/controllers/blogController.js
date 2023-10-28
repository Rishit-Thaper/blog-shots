const Blog = require('../models/blogModel');
const mongoose = require("mongoose");

const getBlogs = async(req, res) =>{

    const blogs = await Blog.find();
    res.status(200).json(blogs);
}

const getSingleBlogs = async(req,res)=>{
    
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

const postBlog = async(req,res) =>{

    const {title, body, category, author} = req.body;
    console.log(title);
    console.log(body);
    console.log(category);
    console.log(author);

    try{
        const newBlog = await Blog.create({title, body, category, author});
        res.status(200).json(newBlog);
    }catch(error){
        res.status(400).json(error);
    }
}

const updateBlog = async(req,res)=>{
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
}

const deleteBlog = async(req,res)=>{
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
}

const getByCategory = async(req,res)=>{
    const {category} = req.params;

    const categoryBlogs = await Blog.find({category: category});

    if(!categoryBlogs){
        res.status.json("No blogs in this category");
        return;
    }

    res.status(200).json(categoryBlogs);
}

const getBySearch = async(req,res)=>{
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
}

module.exports = {
    getBlogs,
    postBlog,
    updateBlog,
    deleteBlog,
    getSingleBlogs,
    getByCategory,
    getBySearch
}