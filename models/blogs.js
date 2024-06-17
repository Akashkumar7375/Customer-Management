const mongoose=require('mongoose')



let blogShema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    img:{
      type:String
    },
    user:{
       type:String,
       required:true 
    },
    postedDate:{
        type:Date,
        required:true,
        default:new Date()
    },
    status:{
        type:String,
        required:true,
        default:'published',
    }


})

module.exports=mongoose.model('blog',blogShema)