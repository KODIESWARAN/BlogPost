const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
   title: {
    type:String,
    required:true,
    unique:false
   },
   slug: {
    type:String,
    required:true,
    unique:false
   },
    description: {
        type:String,
    required:true,

    }
   
},{
    timestamps:true
})


module.exports= mongoose.model('Category', categorySchema);