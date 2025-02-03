
const admincheck=(req,res,next)=>{
    if(req.userrole=='admin'){
        next();
    }
    else{
        res.status(400).send("unauthorized access")
        console.log("unauthorized access");
        
    }
}

export {admincheck}