
import todolist from "../model/todoitem.js";

export const  posttodoitem = async (req , res , next ) => {
   
    const {task , date , completed} = req.body;
    console.log(req.user) ;
    const userId = req.user.id ;
    const todo = new todolist({
        task : task ,
        date : date ,
        completed : completed ,
        userId  ,


    });
    const item = await todo.save() ;
    res.json(item) ;
    console.log(item) ;

}
export const gettodoitem = async( req , res , next ) => {
     if(!req.user){
      return res.status(401).json({message:"user not authorized"});
   }
    
    const items = await todolist.find({
        userId : req.user.id, 
    }) ;
    res.json(items);
    



}
export const deletetodoitem = async (req , res , next ) => {
   
       const item = req.params.id ;
       const items = await  todolist.findOneAndDelete({ _id : item , userId : req.user.id } ) ;
       res.json(items) ;


}
export const updatedtodoitem = async (req , res , next ) => {
    const item = req.params.id ;
    const updateditem = await todolist.findByIdAndUpdate( item , req.body);
    res.json(updateditem) ;
    
}