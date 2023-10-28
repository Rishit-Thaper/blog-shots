const express = require('express');
const router = express.Router();
const {
    getBlogs,
    postBlog,
    updateBlog,
    deleteBlog,
    getSingleBlogs,
    getByCategory,
    getBySearch
} = require('../controllers/blogController');

router.use((req,res,next )=> {
    console.log(req.path, req.method);
    next();
})

//Get all blogs
router.get('/', getBlogs);

//Get by Category
router.get('/categories/:category', getByCategory);

//Get by Search
router.get('/query/:query', getBySearch)

//GET Single-Blog
router.get('/:id', getSingleBlogs)

//POST Blog
router.post('/addshots',postBlog);

//Delete Blog
router.delete('/delete/:id',deleteBlog);

//UPDATE Blog
router.put('/update/:id',updateBlog);

module.exports = router;