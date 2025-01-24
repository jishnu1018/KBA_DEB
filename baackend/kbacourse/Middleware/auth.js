
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const auth=(req,res,next)=>{
    const cookie=req.headers.cookie;
    console.log(cookie);
    const [name,token]=cookie.trim().split("=");
    console.log(name);
    console.log(token);
    if(name=='cookietoken'){
       const verified= jwt.verify(token,process.env.SECRET_KEY)
       console.log(verified);
       req.username=verified.UserName;
       req.userrole=verified.UserRole;
       next();
        res.status(200).send("ok")
    }
    else{
        res.status(401).send("unautharized access")
    }
}
export {auth};