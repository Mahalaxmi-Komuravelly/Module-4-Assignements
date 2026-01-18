import express from "express"
import fs from "fs"
export const TodosRouter = express.Router()
import { limiter } from "../middleware/rateLimiter.middleware.js"
import { validateTodo } from "../middleware/validateTodo.middleware.js"
const readData = ()=>{
    const data = fs.readFileSync("./db.json","utf-8")
    return JSON.parse(data)
}
const writeData = (data) => {
    fs.writeFileSync("./db.json",JSON.stringify(data,null,2))
}

TodosRouter.get("/",limiter,(req,res)=>{
    const data = readData();
    if(!data){
        return res.status(500).json({message:"Data Unavailable"})
    }
    res.status(200).json({message:"Todos List",todos:data.todos})
})

TodosRouter.post("/add",validateTodo,(req,res)=>{
    const data = readData();
    if(!data){
        return res.status(500).json({message:"Data Unavailable"})
    }
    // const {title} = req.body || {}
    // if(!title){
    //     return res.status(400).json({message:"All details required"})
    // }
    const newTodo = {
        id : Date.now(),
        title:req.body.title,
        status : false
    }
    data.todos.push(newTodo);
    writeData(data);
    res.status(201).json({message:"Todo created",todos:data.todos})
})

TodosRouter.get("/:todoId",(req,res)=>{
    const data = readData();
    if(!data){
        return res.status(500).json({message:"Data Unavailable"})
    }
    const id = Number(req.params.todoId)
    const todo = data.todos.find((t)=>t.id === id);
    if(!todo){
        return res.status(404).json({message:"Todo not found"})
    }
    res.status(200).json({message:"Todo found",todo})
})

TodosRouter.put("/update/:todoId",(req,res)=>{
    const data = readData();
    if(!data){
        return res.status(500).json({message:"Data Unavailable"})
    }
    const id = Number(req.params.todoId);
    const todo = data.todos.find((t)=>t.id === id);
    if(!todo){
        return res.status(404).json({message:"Todo not found"})
    }
    const {title,status} = req.body || {};
    if(!title || typeof status!== "boolean"){
        return res.status(400).json({message:"All fields required for update"})
    }
    todo.title = title
    todo.status = status 
    writeData(data);
    res.status(200).json({message:"Todo updated",todos:data.todos})
})

TodosRouter.delete("/delete/:todoId",(req,res)=>{
    const data = readData();
    if(!data){
        return res.status(500).json({message:"Data Unavailable"})
    }
    const id = Number(req.params.todoId)
    const originalLength = data.todos.length;
    data.todos = data.todos.filter((t)=>t.id !== id);
    if(originalLength === data.todos.length){
        return res.status(400).json({message:"Todo not found for deletion"})
    }
    writeData(data)
    res.status(200).json({message:"Todo deleted",todos:data.todos})
})