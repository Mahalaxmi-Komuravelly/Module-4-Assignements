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