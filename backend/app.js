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
  origin: ['https://todosatya.netlify.app', 
           'http://localhost:5173'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // methods you use
  credentials: true, // if you need cookies/auth headers
}));


app.use(express.json()) ;
app.use(body) ;
app.use(session({
  secret: 'your-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,    // must be true on HTTPS (Render)
    sameSite: 'none', // allow cross-site
  }
}));
app.use( "/todos" , itemrouter) ;





app.use((req , res ,next ) => {
    res.status(404).json({message : "route not found "});
})
const url = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@product.gbmwwiy.mongodb.net/?appName=${process.env.MONGO_DB_DATABASE}`;
const PORT = process.env.PORT || 3000 ; 
mongoose.connect(url).then( () => {
    app.listen(PORT, () => {
    console.log("server is listening on port 3000");    }) ;

})
