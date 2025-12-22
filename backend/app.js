import express from "express" ;

import bodyParser from "body-parser" ;
import cors from "cors" ;
import itemrouter from "./router/itemrouter.js" ;
import mongoose from  "mongoose" ;
import dotenv from "dotenv";
import session from "express-session" ;

dotenv.config(); // ✅ Load .env file



const body = bodyParser.urlencoded() ;
const app = express() ; 






app.use(cors({
     origin: ["http://localhost:5173", 
    "https://todosatya.netlify.app/" ],
  credentials: true
}) ) ;

app.use(express.json()) ;
app.use(body) ;
app.use(
    session ({
        secret :"mysecret" ,
        resave : false ,
        saveUninitialized : false ,

    })
)

app.use( "/todos" , itemrouter) ;





app.use((req , res ,next ) => {
    res.status(404).json({message : "route not found "});
})
const url = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@product.gbmwwiy.mongodb.net/?appName=${process.env.MONGO_DB_DATABASE}`;
mongoose.connect(url).then( () => {
    app.listen(3000 , () => {
    console.log("server is listening on port 3000");    }) ;

})
