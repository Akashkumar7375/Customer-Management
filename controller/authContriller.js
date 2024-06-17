
const authTable=require('../models/auth')
const bcrypt=require('bcrypt')
const nodemailer=require('nodemailer')
const jwt=require('jsonwebtoken')


let message=null
exports.showCreatepage=(req,res)=>{
    res.render('auth/signup.ejs',{message})

}
exports.Createaccount=async(req,res)=>{

    const{FirstName,LastName,email,pass,gender,mobile}=req.body
const emailCheck=await authTable.findOne({email:email})
const mobileCheck=await authTable.findOne({mobile:mobile})
if(emailCheck==null&&mobileCheck==null){
    const cpass=await bcrypt.hash(pass,10)
    const authData=new authTable({firstName:FirstName,lastName:LastName,email:email,mobile:mobile,password:cpass,gender:gender})
    authData.save()
   
  //  console.log(authData)

   const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "rohitkumawatt304@gmail.com",
      pass: "gtdlqqwmvnguzwus",
    },
  });
console.log('connected to smtp server')
  await transporter.sendMail({
    from: "rohitkumawatt304@gmail.com", // sender address
    to:email, // list of receiversed to smtp server
    subject:'Email Validation link!', // Subject line
    html:`<a href=http://localhost:5000/emailverify/${authData.id}>Click is verfiy link</a>`, // plain text body
   
  });
  message='Account has been cerated.Email verifaction link has been sent to your Email Id'
}
else{
   message='already registered with us !!!'
}


res.render('auth/signup.ejs',{message})

}
exports.statusUpdate=async(req,res)=>{
    const id=req.params.id
    await authTable.findByIdAndUpdate(id,{status:'Active'})
    res.render('auth/emailverify.ejs')
}

exports.Showlogin=(req,res)=>{
  res.render('auth/login.ejs',{message:''})
}
exports.login=async(req,res)=>{
  let message=null
   const{us,pass}=req.body
   const logincheck=await authTable.findOne({email:us})
   if(logincheck!=null){
    let comperpass=await bcrypt.compare(pass,logincheck.password)
    if(comperpass){
      if(logincheck.status=='Active'){
         req.session.isAuth=true
         req.session.username=us
         req.session.sub=logincheck.sub
         if(logincheck.email=='admin@gmail.com'){
          res.redirect('/admin/alluser/jj')
         }else{
          res.redirect('/user/blogs')
         }
        
      }else{
        message='Your email is not verfied,please check your email for verfiy link'
        res.render('auth/login.ejs',{message})
        
      }

    }else{
      message='Wrong password Details'
      res.render('auth/login.ejs',{message})
   }
    

   }else{
    res.render('auth/login.ejs',{message})
    message='Wrong User Details'
   }

      
   
}

exports.forgotformPage=(req,res)=>{
  res.render('auth/forgoutform.ejs',{message:''})
}

exports.forgotform=async(req,res)=>{
  let message=null
 const{email}=req.body
 const emailCheck=await authTable.findOne({email:email})
 if(emailCheck!=null){
   let payload={username:emailCheck.email}
 const token= jwt.sign(payload,process.env.KEY,{expiresIn:'10m'})
//  console.log(token)
 const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "rohitkumawatt304@gmail.com",
    pass: "gtdlqqwmvnguzwus",
  },
});
console.log('connected to smtp server')
await transporter.sendMail({
  from: "rohitkumawatt304@gmail.com", // sender address
  to:email, // list of receiversed to smtp server
  subject:'Forgot Password Link !!', // Subject line
  html:`<a href=http://localhost:8000/changpass/${emailCheck.id}/${token}>Change the Password</a>`, // plain text body
 
});
message='forgot change password link has been sent to your registered  Email Id'
 }else{
  message='email not resitered with us !! '
 }
 res.render('auth/forgoutform.ejs',{message})
}

exports.changepassformshow=(req,res)=>{
  const token=req.params.token
  if(token){
    let message=null
    jwt.verify(token,process.env.KEY,(error,user)=>{
      if(error){
       message='Forgot password link is a Experired'
       res.render('auth/showmessageforgot.ejs',{message})
      // console.log(error.message)
      }else{
        res.render('auth/Changepassform.ejs',{message:''})
        // console.log(user)
      }
    })
  }
 
}


exports.changepassform=async(req,res)=>{
  let message=null
  const id=req.params.id
const{pass,cpass}= req.body
    if(pass==cpass){
      const npass=await bcrypt.hash(pass,10)
          await authTable.findByIdAndUpdate(id,{password:npass})
          res.render('auth/forgotmessage.ejs')
    }else{
      message='Password Not Matched'
      res.render('auth/Changepassform.ejs',{message})
    }
   
}

exports.logout=(req,res)=>{
  req.session.destroy()
  res.redirect('/')
}
exports.changepass=(req,res)=>{
  const username=req.session.username
  const message=req.params.mssg
  res.render('auth/changecurrentpass.ejs',{username,message})
}
exports.changepassword=async(req,res)=>{
  
  const{cpass,npass,copass}=req.body
  if(npass==copass){
    const userData=await authTable.findOne({email:req.session.username})
    const comperpass= await bcrypt.compare(cpass,userData.password)
if(comperpass){
const newpass=await bcrypt.hash(npass,10)
await authTable.findByIdAndUpdate(userData.id,{password:newpass})
req.session.destroy()
  res.render('auth/forgotmessage.ejs')
}else{
  res.redirect('/changecpass/current password not matched')
}

  }else{
    res.redirect('/changecpass/password not matched')
  }
   
}

exports.profile=async(req,res)=>{
  const message=req.params.mssg
  const username=req.session.username
  const data=await authTable.findOne({email:username})
  res.render('user/profileform.ejs',{username,data,message})
}

exports.profileform=async(req,res)=>{
  const{fname,lname,mobile,gender}=req.body
 const id=req.params.id
  await authTable.findByIdAndUpdate(id,{firstName:fname,lastName:lname,mobile:mobile,gender:gender})

  res.redirect('/user/profile/Successfully update')
}
