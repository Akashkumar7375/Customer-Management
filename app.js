const express=require('express')
const app=express()
app.use(express.urlencoded({extended:false}))
require('dotenv').config()
require('./connection/db')
const session=require('express-session')
const adminRouter=require('./router/adminRouter')
const userRouter=require('./router/userRouter')
const authRouter=require('./router/auth')
const jwt=require('jsonwebtoken')




app.use(session({
    secret:process.env.KEY,
    resave:false,
    saveUninitialized:false
}))
app.use(authRouter)
app.use('/user',userRouter)
app.use('/admin',adminRouter)
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT} `)
})