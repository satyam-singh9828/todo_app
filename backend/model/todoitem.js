import mongoose from "mongoose" ;
const todoitemSchema =  new mongoose.Schema(
  {
   task : { type : String , required : true },
   date : { type: Date  , required : true  } ,
   completed : { type : Boolean  , default : false 

    },
     userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
   
  }
) ; 


//model 
export default mongoose.model('todolist', todoitemSchema );
