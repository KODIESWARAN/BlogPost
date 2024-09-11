const express = require("express");
const router =  express.Router();
const Category = require("../models/Category");
const post = require("../models/Post");
const { json } = require("body-parser");





//Get all 

router.get('/', async (req, res) => {
    try {
        const posts =  await post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }
})

//Get a single post
router.get('/:id' , async (req , res ) => {
    try {
        const posts = await post.findById(req.params.id);
        if (!posts) {
            return res.status(404).json({message :"post not found"});
            
        }
        res.json(posts);
    } catch (error) {
        
        res.status(404).json({message : error.message})
       
        
    }
})

// create a new post

router.post('/',  async (req , res ) =>{
    const posts = new post ({
        title : req.body.title,
        content :req.body.content,
        category : req.body.category,
        author: req.body.author,
        image : req.body.image

    })

    try {
        const newPost = posts.save();
        res.status(201).json(newPost);
        
    } catch (error) {
        res.status(400).json({message : error.message})
    }
})

// update a post

router.put('/:id', async (req,res) => {
    try {
        const posts = await post.findById(req.params.id);
        if (!posts) {
            return res.status(404).json({message :"post not found"})
            
        }

        posts.title = req.body.title || posts.title;
        posts.content = req.body.content || posts.content;
        posts.category = req.body.category || posts.category;
        posts.author = req.body.author || posts.author;
        posts.image = req.body.image || posts.image;
        posts.updatedAt = Date.now();

        const updatedData = await posts.save();
        res.json(updatedData);
        
    } catch (error) {
        res.status(404).json({message : error.message})
       
    }
})
 
// Delete a post

router.delete('/:id' , async (req,res) => {
    try {
        const posts = await post.findById(req.params.id);
        if (!posts) {
            return res.status(404).json({message :"post not found"})
            
        }

        await post.findByIdAndDelete(posts._id)
        res.json({message : "post deleted"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

//fetch post by category id

router.get('/category/:categoryId' ,  async( req, res )  =>{
    try {
        const categoryId = req.params.categoryId;

        //validate
        const categoryexist = await Category.findById(categoryId);
        if (!categoryexist) {
            res.status(400).json({message : 'invalid category id'})
        }

        //fetch post

        const posts  = await post.find({category:categoryId}).populate('category');
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}) 


module.exports = router;
