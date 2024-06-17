const mongoose=require('mongoose')



const authShema=mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    createPost:{
        type:Date,
        default:new Date().toString()
    },
    status:{
        type:String,
        default:'Suspended',
        required:true
    },
    sub:{
        type:String,
        default:'free',
        required:true
    }

})

module.exports=mongoose.model('authTable',authShema)