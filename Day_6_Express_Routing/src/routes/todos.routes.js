import express from "express";
import fs from "fs";
export const TodosRouter = express.Router();


function readData() {
    try {
        const data = fs.readFileSync("./db.json", "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.log("Error while reading data from db.json file",error)
    }
}
function writeData(data){
 fs.writeFileSync("./db.json",JSON.stringify(data,null,2))
}

// Get todos

TodosRouter.get("/", (req, res) => {
    const data = readData();
    if(!data){
        return res.status(500).json({message:"Data Unavailable"})
    }
    res.status(200).json(
        {
            message:"Todos List",
            todos:data.todos
        })
})

// Create todos ( POST )

TodosRouter.post("/add",(req,res)=>{
    const data = readData();
    if(!data){
        res.status(500).json({message:"Data Unavailable"})
    }
    const {title} = req.body || {};
    if(!title){
        return res.status(400).json({message:"All fields required"})
    }
    const newTodo = {
        id:Date.now(),
        title,
        status:false
    }
    data.todos.push(newTodo);
    writeData(data);
    res.status(201).json(
        {
            message:"Todo created",
            todos:data.todos
        })
})

// Get Todo by ID

TodosRouter.get("/:todoId",(req,res)=>{
    const data = readData();
    if(!data){
        return res.status(500).json({message:"Data Unavailable"})
    }
    const id = Number(req.params.todoId);
    const todo = data.todos.find((t)=>t.id === id)
    if(!todo){
        return res.status(400).json({message:"Todo not found"})
    }
    res.status(200).json({message:"Todo found",todo})
})

// Update Todo

TodosRouter.put("/update/:todoId",(req,res)=>{
    const data = readData();
    if(!data){
        return res.status(500).json({meassage:"Data Unavailable"})
    }
    const id = Number(req.params.todoId)
    const todo = data.todos.find((t)=>t.id === id);
    const {title} = req.body || {}
    if(!title){
        return res.status(400).json({message:"All fields required"})
    }
    todo.title = req.body.title;
    todo.status = req.body.status;
    writeData(data);
    res.status(200).json({message:"Todo updated",todos:data.todos})
})

// Delete Todo

TodosRouter.delete("/delete/:todoId",(req,res)=>{
    const data = readData();
    if(!data){
        return res.status(500).json({message:"Data Unavailable"})
    }
    const id = Number(req.params.todoId);
    const originalLength = data.todos.length;
    data.todos = data.todos.filter((t)=>t.id !== id)
    if(originalLength === data.todos.length){
        return res.status(400).json({message:"Todo not found"})
    }
    writeData(data);
    res.status(200).json({message:"Todo deleted",todos:data.todos})
})