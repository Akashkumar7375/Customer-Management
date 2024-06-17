const subscription=function(req,res,next){
    if(req.session.sub!='free'){
        next()
    }else{
        res.send("phle subscrip kre ke aao jao")
    }
    
}


module.exports=subscription