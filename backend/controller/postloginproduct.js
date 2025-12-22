import User from "../model/User.js";
import bcrypt from "bcryptjs" ;
export const postproduct = async(req , res , next ) => {
    const { email , password } = req.body ;
    let user = await User.findOne({email : email });
   let  firstTime = false ;
     if(!user){
        firstTime = true ;
        const hashedPassword = await bcrypt.hash(password , 12 ) ;
     
    user = new User({
        email ,
        password : hashedPassword ,


    });
    await user.save() ;
     console.log("NEW USER CREATED");
}
else {
     console.log("EXISTING USER FOUND")
    const isMatch = await bcrypt.compare(password , user.password ) ;
    if(!isMatch){
        return res.status(401).json({message : "invalid password "}) ;

    }

}
req.session.isLoggedIn = true ;
req.session.user = user ;
await req.session.save() ;
res.status(200).json({
    message: "login successful" ,
  
    firstTime : firstTime ,

});
}