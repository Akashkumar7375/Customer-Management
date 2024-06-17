const router=require('express').Router()
const authController=require('../controller/authContriller')
const sessioncheck=require('../middleware/session')
const userBlogsController=require('../controller/userBlogsController')
const upload=require('../middleware/multer')
const subscriptionChack=require('../middleware/sub')



router.get('/blogs',sessioncheck,userBlogsController.allblogs)
router.get('/myblogs/:mssg',sessioncheck,userBlogsController.myblogs)
router.get('/addblogs',sessioncheck,userBlogsController.showblogsform)
router.post('/addblogs',upload.single('img'),userBlogsController.blogform)
router.get('/updateblog/:id',sessioncheck,userBlogsController.updateformshow)
router.post('/updateblog/:id',upload.single('img'),userBlogsController.updateblog)
router.get('/deleteblog/:id',sessioncheck,userBlogsController.delete)
router.get('/profile/:mssg',sessioncheck,authController.profile)
router.post('/profile/:id',authController.profileform)










module.exports=router