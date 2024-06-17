const blogTable=require('../models/blogs')
const authTable=require('../models/auth')





exports.allblog=async(req,res)=>{
    const message=req.params.mssg
    const username=req.session.username
    const data=await blogTable.find().sort({postedDate:-1})
    const tdata= await blogTable.find().count()
   const tpublished= await blogTable.find({status:'published'}).count()
   const tunpublished= await blogTable.find({status:'unpublished'}).count()
    res.render('admin/dashboard.ejs',{username,data,message,tdata,tpublished,tunpublished})
}

exports.alluser=async(req,res)=>{
    const message=req.params.mssg
    const username=req.session.username
    const data= await authTable.find().sort({createPost:-1})
   const tdata= await authTable.find().count()
   const tactive= await authTable.find({status:'Active'}).count()
   const tsuspend= await authTable.find({status:'Suspended'}).count()
    res.render('admin/alluser.ejs',{username,data,message,tdata,tactive,tsuspend})
}
exports.updatealluser=async(req,res)=>{
    const username=req.session.username
    const status=req.params.status
   const id=req.params.id
  
 let newstatus=null
    if(status=='Active' ){
        newstatus='Suspended'
    }else{
       newstatus='Active'
    }

    await authTable.findByIdAndUpdate(id,{status:newstatus})

    res.redirect('/admin/alluser/Successfully Update')
    
}
exports.updateallblog=async(req,res)=>{
    const username=req.session.username
    const status=req.params.status
   const id=req.params.id
  
 let newstatus=null
    if(status=='published'){
        newstatus='unpublished'
    }else{
       newstatus='published'
    }

    await blogTable.findByIdAndUpdate(id,{status:newstatus})

    res.redirect('/admin/dashboard/Successfully Update')
    
}