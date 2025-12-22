
import todolist from "../model/todoitem.js";

export const  posttodoitem = async (req , res , next ) => {
   
    const {task , date , completed} = req.body;
    const todo = new todolist({
        task : task ,
        date : date ,
        completed : completed ,
        userId : req.session.user._id ,


    });
    const item = await todo.save() ;
    res.json(item) ;
    console.log(item) ;

}
export const gettodoitem = async( req , res , next ) => {
     
    const items = await todolist.find({
        userId : req.session.user._id 
    }) ;
    res.json(items);
    



}
export const deletetodoitem = async (req , res , next ) => {
   
       const item = req.params.id ;
       const items = await  todolist.findOneAndDelete({ _id : item , userId : req.session.user._id } ) ;
       res.json(items) ;


}
export const updatedtodoitem = async (req , res , next ) => {
    const item = req.params.id ;
    const updateditem = await todolist.findByIdAndUpdate( item , req.body);
    res.json(updateditem) ;
    
}
