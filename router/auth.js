const router=require('express').Router()
const registerTable=require('../models/auth')
const authController=require('../controller/authContriller')
const userBlogsController=require('../controller/userBlogsController')
const sessionCheck=require('../middleware/session')




router.get('/',authController.Showlogin)
router.post('/',authController.login)
router.get('/createAccount',authController.showCreatepage)
router.post('/createAccount',authController.Createaccount)
router.get('/emailverify/:id',authController.statusUpdate)
router.get('/forgot/',authController.forgotformPage)
router.post('/forgot/',authController.forgotform)
router.get('/changpass/:id/:token',authController.changepassformshow)
router.post('/changpass/:id',authController.changepassform)
router.get('/logout',authController.logout)
router.get('/changecpass/:mssg',sessionCheck,authController.changepass)
router.post('/changecpass/:mssg',authController.changepassword)






module.exports=router