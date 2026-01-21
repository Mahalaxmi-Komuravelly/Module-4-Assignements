import express from "express"
import fs from "fs"
export const OrdersRoutes = express.Router();

export function readData() {
    try {
        const data = fs.readFileSync("./db.json", "utf-8")
        return JSON.parse(data)
    } catch (error) {
        console.log("Error while reading the file", error)
    }
}

export function writeData(data) {
    fs.writeFileSync("./db.json", JSON.stringify(data, null, 2))
}

// create order

OrdersRoutes.get("/",(req,res)=>{
    const data = readData();
    if(!data){
        return res.status(500).json({message:"Data Unavailable"})
    }
    res.status(200).json({message:"All Orders List",orders:data.orders})
})

OrdersRoutes.post("/",(req,res)=>{
    const data = readData();
    if(!data){
        return res.status(500).json({message:"Data Unavailable"})
    }
    const {productId,quantity} = req.body || {}
    if(!productId || !quantity){
        return res.status(404).json({message:"ProductId and quantity are required"})
    }
    const product = data.products.find((p)=>p.id === productId);
    if(!product){
        return res.status(404).json({message:"Product Not found"})
    }
    if(product.stock === 0){
        return res.status(400).json({message:"Insufficient stock"})
    }
    if(quantity > product.stock){
        return res.status(400).json({message:"Quantity is more than product stock"})
    }
    const totalAmount = product.price * quantity
    const newOrder = {
        id:data.orders.length + 1,
        productId,
        quantity,
        totalAmount,
        status:"placed",
        createdAt:new Date().toISOString().slice(0,10)
    }
    product.stock -= quantity;
    data.orders.push(newOrder);
    writeData(data);
    res.status(201).json({message:"Order cretaed",order:newOrder})
})