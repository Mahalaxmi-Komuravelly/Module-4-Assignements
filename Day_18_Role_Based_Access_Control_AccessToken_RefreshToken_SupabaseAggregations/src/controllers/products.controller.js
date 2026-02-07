import supabase from "../configs/supabase.config.js";

export const getProducts = async (req, res) => {
    try {
        const { data, error } = await supabase.from("products").select();
        if (error) {
            return res.status(500).json({ message: error.message })
        }
        res.status(200).json({
            message: "Products list",
            data
        })
    } catch (error) {
        return res.status(500).json({ message: "error occured while fetching products", error: error.message })
    }
}

export const getAverageOrderValue = async (req,res) => {
    try {
        const {data,error} = await supabase.rpc("get_avg_order_value");
    if(error){
        return res.status(500).json({message:"something went wrong"})
    }
    return res.status(200).json({message:"Average Order value fectched successfully",averageOrderValue:data})

    } catch (error) {
        return res.status(500).json({message:"Error occured while fetching average order value",error:error.message})
    }
}

export const getTotalRevenue = async (req,res) => {
    try {
        const {data,error} = await supabase.rpc("get_total_revenue");
        if(error){
        return res.status(500).json({message:error.message})
    }
    return res.status(200).json({message:"Total Revenue fectched successfully",totalRevenue:data})

    } catch (error) {
              return res.status(500).json({message:"Error occured while fetching total revenue",error:error.message})
  
    }
}


export const getAmountSpentPerUser = async (req,res) => {
    try {
        const {data,error} = await supabase.rpc("get_amount_spent_per_user");
        if(error){
        return res.status(500).json({message:error.message})
    }
    return res.status(200).json({message:"Total amount spent by user fectched successfully",totalAmount:data})

    } catch (error) {
              return res.status(500).json({message:"Error occured while fetching total amount spent by user",error:error.message})
  
    }
}


export const getOrdersCountPerUser = async (req,res) => {
    try {
        const {data,error} = await supabase.rpc("get_orders_count_per_user");
        if(error){
        return res.status(500).json({message:error.message})
    }
    return res.status(200).json({message:"Orders count per user fectched successfully",OrdersCount:data})

    } catch (error) {
              return res.status(500).json({message:"Error occured while fetching orders count per user",error:error.message})
  
    }
}