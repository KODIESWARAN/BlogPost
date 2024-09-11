const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    title:{ type : String , required :true},
    content :{ type :String, required:true},
    category:{type :mongoose.Schema.Types.ObjectId, required:true },
    author:{type :String, required:true},
    image : {type :String},
    createAt: {type : Date, default: Date.now},
    updatedAt: {type : Date,default: Date.now}
})


module.exports= mongoose.model('Post', postSchema);