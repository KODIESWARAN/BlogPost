const express = require("express");
const router =  express.Router();
const { json } = require("body-parser");
const Category = require("../models/Category");


//Get all 

router.get('/', async (req, res) => {
    try {
        const category =  await Category.find();
        res.json(category);
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }
})


//Get a single post
router.get('/:id' , async (req , res ) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({message :"post not found"});
            
        }
        res.json(category);
    } catch (error) {
        
        res.status(404).json({message : error.message})
       
        
    }
})


// create a new post

router.post('/',  async (req , res ) =>{
    const category = new Category ({
        title : req.body.title,
        slug : req.body.slug,
        description : req.body.description

    })

    try {
        const newCategory = category.save();
        res.status(201).json(newCategory);
        
    } catch (error) {
        res.status(400).json({message : error.message})
    }
})



// update a post

router.put('/:id', async (req,res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({message :"post not found"})
            
        }

        category.title = req.body.title || category.title;
        category.slug =  req.body.slug  || category.slug;
        category.description = req.body.description || category.description;
       
        category.updatedAt = Date.now();

        const updatedCategory = await category.save();
        res.json(updatedCategory);
        
    } catch (error) {
        res.status(404).json({message : error.message})
       
    }
})

 
// Delete a post

router.delete('/:id' , async (req,res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({message :"Category not found"})
            
        }

        await Category.findByIdAndDelete(category._id)
        res.json({message : "Category deleted"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})


module.exports = router;