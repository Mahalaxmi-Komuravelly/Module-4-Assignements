import supabase from "../configs/supabse.config.js";

export const addTodo = async (req, res) => {
    try {
        const { title, description, user_id } = req.body;
        if (!title || !user_id) {
            return res.status(400).json({ message: "Title and User id are required" })
        }
        const { data: existing, error: userError } = await supabase.from("users").select().eq("id", user_id).maybeSingle();
        if (userError) {
            return res.status(500).json({ message: userError.message })
        }
        if (!existing) {
            return res.status(404).json({ message: "User not found" })
        }
        const { data, error } = await supabase.from("todos").insert([{ title, description, user_id }]).select().single();
        if (error) {
            return res.status(500).json({ message: "Something went wrong while adding todo", error: error.message })
        }
        res.status(201).json({ message: "Todo added successfully", todo: data })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

export const getTodosByUserID = async (req, res) => {
    try {
        const { userId } = req.params;
        const {data,error} = await supabase.from("todos").select().eq("user_id", userId); 
        if (error) {
            return res.status(500).json({ message: "Failed to fetch todos!", error: error.message })
        }
        res.status(200).json({ message: "Todo found", todos: data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const { title, description, is_completed } = req.body;
        const { data: existing, error: todoError } = await supabase.from("todos").select().eq("id", todoId).maybeSingle();
        if (todoError) {
            return res.status(500).json({ message: todoError.message })
        }
        if (!existing) {
             return res.status(404).json({ message: "Todo not found" })
        }
        const { data, error } = await supabase.from("todos").update([{ title, description, is_completed }]).eq("id", todoId).select().single();
        if (error) {
            return res.status(500).json({ message: "Failed to update todo", error: error.message })
        }
        res.status(200).json({ message: "Todo updated successfully", todo: data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const { data, error } = await supabase.from("todos").delete().eq("id", todoId).select().maybeSingle();
        if (error) {
            return res.status(500).json({ message: "Failed to delete todo!", error: error.message })
        }
        if (!data) {
            return res.status(404).json({ message: "Todo not found" })
        }
        res.status(200).json({ message: "Todo deleted successfully", todo: data })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

