const router=require('express').Router()
const authController=require('../controller/authContriller')
const userBlogsController=require('../controller/userBlogsController')
const adminCotroller=require('../controller/adminCotroller')
const sessioncheck=require('../middleware/session')



router.get('/dashboard/:mssg',sessioncheck,adminCotroller.allblog)
router.get('/alluser/:mssg',sessioncheck,adminCotroller.alluser)
router.get('/updatealluser/:id/:status',sessioncheck,adminCotroller.updatealluser)
router.get('/updateallblog/:id/:status',sessioncheck,adminCotroller.updateallblog)




module.exports=router