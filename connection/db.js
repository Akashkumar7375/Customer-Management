
const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/1130kcms').then(()=>{
  console.log()
}).catch((error)=>{
 console.log(error.message)
})





