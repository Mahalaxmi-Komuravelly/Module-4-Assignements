import express from "express"
import { readData,writeData } from "./orders.routes.js";
export const ProductRoutes = express.Router();

ProductRoutes.get("/",(req,res)=>{
    const data = readData();
    if(!data){
        return res.status(500).json({message:"Data Unavailable"})
    }
    res.status(200).json({message:"All Products List",products:data.products})
})

ProductRoutes.post("/",(req,res)=>{
    const data = readData();
    if(!data){
        return res.status(500).json({message:"Data Unavailable"})
    }
    const {name, price, stock} = req.body || {}
    if(!name || !price ||!stock) {
        return res.status(400).json({message:"All fields required"})
    }
    const newProduct = {
        id:data.products.length + 1,
        name,
        price,
        stock
    }
    data.products.push(newProduct);
    writeData(data)
    res.status(201).json({message:"Product created",products:data.products})
})


