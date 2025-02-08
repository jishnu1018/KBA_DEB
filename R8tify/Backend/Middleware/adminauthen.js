import jwt from 'jsonwebtoken'

const adminauthen=(req,res,next)=>{
    const cookie=req.headers.cookie
    console.log(cookie);
    if(!cookie){
        res.status(400).send("Login to add a review")
        console.log("Login to add a review");
    }
    else{
        const [name,token]=cookie.trim().split("=");
        console.log(name);
        console.log(token);
        if(name=='TokenCookiee'){
            const verified=jwt.verify(token,process.env.SECRET_KEY1)
            console.log(verified);
            req.email=verified.Email
            req.password=verified.Password;
            next();
        }
        
        
    }
}

export {adminauthen}