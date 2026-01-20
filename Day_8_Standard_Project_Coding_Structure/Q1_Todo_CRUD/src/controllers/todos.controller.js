import {readData, writeData} from "../models/todo.models.js"
export const getTodos = (req,res)=>{
    const data = readData();
    if(!data){
        return res.status(500).json({message:"Data Unavailable"})
    }
    res.status(200).json({message:"All Todos List",todos:data.todos})
}

export const createTodos = (req,res)=>{
    const data = readData();
    if(!data){
        return res.status(500).json({message:"Data Unavailable"})
    }
    const newTodo = {
        id:Date.now(),
        title:req.body.title,
        status:false
    }
    data.todos.push(newTodo);
    writeData(data)
    res.status(201).json({message:"Todo created",todos:data.todos})
}

export const getTodoByID = (req,res)=>{
    const data = readData();
    if(!data){
        return res.status(500).json({message:"Data Unavailable"})
    }
    const id = Number(req.params.todoId);
    const todo = data.todos.find((t)=>t.id === id)
    if(!todo){
         return res.status(404).json({message:"Todo not found"})
    }
    res.status(200).json({message:"Todo found",todo})
}

export const updateTodoByID = (req,res) =>{
    const data = readData();
    if(!data){
        return res.status(500).json({message:"Data Unavailable"})
    }
    const id = Number(req.params.todoId);
    const todo = data.todos.find((t)=>t.id === id);
    if(!todo){
         return res.status(404).json({message:"Todo not found"})
    }
    const {title,status} = req.body || {}
    if(!title || typeof status !== "boolean"){
        return res.status(400).json({message:"All fields required"})
    }
    todo.title = title;
    todo.status = status;
    writeData(data);
    res.status(200).json({message:"Todo updated",todos:data.todos})
}

export const deleteTodo = (req,res) => {
    const data = readData();
    if(!data){
        return res.status(500).json({message:"Data Unavailable"})
    }
    const id = Number(req.params.todoId);
    const originalLength = data.todos.length;
    data.todos = data.todos.filter((t)=>t.id !== id);
    if(originalLength === data.todos.length){
        return res.status(404).json({message:"Todo not found for deletion"})
    }
    writeData(data);
    res.status(200).json({message:"Todo deleted",todos:data.todos})
}