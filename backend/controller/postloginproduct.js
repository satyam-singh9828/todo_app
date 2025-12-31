import User from "../model/User.js";
import bcrypt from "bcryptjs" ;
import jwt from "jsonwebtoken" ;
export const postproduct = async(req , res , next ) => {
    const { email , password } = req.body ;
    let user = await User.findOne({email : email });
   console.log("found user" , user ) ;
     if(!user){
        
        const hashedPassword = await bcrypt.hash(password , 12 ) ;
     
    user = new User({
        email ,
        password : hashedPassword ,


    });
    await user.save() ;
     console.log("NEW USER CREATED");
}
else {
     console.log("EXISTING USER FOUND");
    const isMatch = await bcrypt.compare(password , user.password ) ;
    if(!isMatch){
        return res.status(401).json({message : "invalid password "}) ;


    }

}
console.log("USER =", user);
const token = jwt.sign({email : user.email  , id : user._id } , process.env.JWT_SECRET_KEY , {expiresIn : '1h' } ) ;
res.json({token : token }) ;


}
 export const authenticate = (req , res , next ) => {
    const authHeader = req.headers.authorization ;
    console.log(authHeader) ;
    if(!authHeader){
        return res.status(401).json({message : "authorization header missing "}) ;
    }
    const token = authHeader.split(" ")[1] ;
    console.log(token) ;
    jwt.verify(token , process.env.JWT_SECRET_KEY , (err , decoded ) => {
        if(err){
            return res.status(401).json({message : "invalid token "}) ;
        }
        console.log(decoded) ;
        req.user = decoded ;
        next() ;
    }) ;

};
