const adminCheck=(req,res,next)=>{
    if(req.email=='ji2003jishnu@gmail.com'){
        next();
    }
    else{
        res.status(403).json({msg:"You are not allowed"})
    }
}

export {adminCheck};