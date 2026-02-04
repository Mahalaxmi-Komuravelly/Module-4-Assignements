import supabase from "../config/supabase.js";

export const createTodo = async (req, res) => {
    try {
        const { title, completed} = req.body || {};
        const userId = req.user.userId;
        if (!title ) {
            return res.status(400).json({ message: "title is required" })
        }
        if (completed!==undefined && typeof completed !== "boolean") {
            return res.status(400).json({ message: "completed status should be either true or false" })
        }
        const todo = {
            title,
            completed : completed ?? false,
            user_id:userId
        }
        const { data, error } = await supabase.from("todos").insert(todo).select().single();
        if (error) {
            return res.status(500).json({ message: error.message })
        }
        res.status(201).json({ message: "Todo created successfully", todo: data });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getTodos = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { data, error } = await supabase.from("todos").select().eq("user_id",userId);
        if (error) {
            return res.status(500).json({ message: error.message })
        }
        res.status(200).json({ message: "Todos data", todos: data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const { data: todo, error: todoError } = await supabase.from("todos").select().eq("id", id).eq("user_id",userId).maybeSingle();
        if (todoError) {
            return res.status(500).json({ message: todoError.message })
        }
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" })
        }
        const { title, completed } = req.body || {};
        if(title === undefined && completed === undefined){
            return res.status(400).json({message:"No fields provided for update"})
        }
        let updates = {};
        if (title!==undefined) updates.title = title;
        if (typeof completed === "boolean") updates.completed = completed;
        
        const { data, error } = await supabase.from("todos").update(updates).eq("id", id).eq("user_id",userId).select();
        if (error) {
            return res.status(500).json({ message: error.message })
        }
        res.status(200).json({ message: "Todo updated", todo: data })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server error",error:error.message })
    }
}

export const deleteTodo = async (req,res) => {
    try {
        const {id} = req.params;
        const userId = req.user.userId;
        const {data:existing,error:todoError} = await supabase.from("todos").select().eq("id",id).eq("user_id",userId).maybeSingle();
        if(!existing){
            return res.status(404).json({ message: "Todo not found" })
        }
        
        const {error} = await supabase.from("todos").delete().eq("id",id).eq("user_id",userId);
        if(error){
            return res.status(500).json({message:"error occured while deleting todo",error:error.message})
        }
        res.status(200).json({ message: "Todo deleted successfully"})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}