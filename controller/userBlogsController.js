const blogsTable=require('../models/blogs')




exports.allblogs=async(req,res)=>{
    const username=req.session.username
    const alldata=await blogsTable.find({status:'published'}).sort({postedDate:-1})
    res.render('user/blog.ejs',{username,alldata})
}
exports.myblogs=async(req,res)=>{
   
    const username=req.session.username
    const message=req.params.mssg
  const data= await blogsTable.find({user:username}).sort({postedDate:-1})
    res.render('user/myblogs.ejs',{username,message,data})
}
exports.showblogsform=(req,res)=>{
    const username=req.session.username
    res.render('user/myblogsform.ejs',{username})
}
exports.blogform=(req,res)=>{
    const username=req.session.username
    
   const{btitle,bdesc}=req.body
   
   if(req.file){
    const filename=req.file.filename
    var newblog=  new blogsTable({title:btitle,desc:bdesc,user:username,img:filename})
    newblog.save()
    
   }else{
    var newblog=  new blogsTable({title:btitle,desc:bdesc,user:username,img:'defaultimg.png'})
    newblog.save()
   }
   res.redirect('/user/myblogs/Successfully blog has been Added')
 }
 exports.updateformshow=async(req,res)=>{
    const username=req.session.username
    const id=req.params.id
    const data=await blogsTable.findById(id)
    res.render('user/updateblog.ejs',{username,data})
}
exports.updateblog=async(req,res)=>{
    const id=req.params.id
    const{btitle,bdesc}=req.body
    if(req.file){
        const filename=req.file.filename
        var data=  await blogsTable.findByIdAndUpdate(id,{title:btitle,desc:bdesc,img:filename})
    }else{
        var data=  await blogsTable.findByIdAndUpdate(id,{title:btitle,desc:bdesc,img:'defaultimg.png'})
    }
    res.redirect('/user/myblogs/successFully blog has been Update')
  
 }

 exports.delete=async(req,res)=>{
    const id=req.params.id
   await blogsTable.findByIdAndDelete(id)
    res.redirect('/user/myblogs/successFully blog has been Deleted')
 }

 
