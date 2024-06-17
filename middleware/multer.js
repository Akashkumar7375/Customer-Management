const multer= require('multer')


let Storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads')
    },
    filename:function(req,file,cb){
       cb(null,Date.now()+file.originalname)
    }
})

let uploads=multer({
    storage:Storage,
    limits:{fileSize:1024*1024*4}
})

module.exports=uploads