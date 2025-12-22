import express from "express" ; 
import { posttodoitem  , gettodoitem  , deletetodoitem , updatedtodoitem } from "../controller/posttodoitem.js";
import { postproduct } from "../controller/postloginproduct.js";    

const itemrouter = express.Router() ;
itemrouter.post( "/" , posttodoitem);
itemrouter.get("/" , gettodoitem) ;
itemrouter.delete("/:id" , deletetodoitem ) ;
itemrouter.patch("/:id" , updatedtodoitem ) ;
itemrouter.post("/login" , postproduct) ;
export default  itemrouter ;


