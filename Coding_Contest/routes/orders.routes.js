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

OrdersRoutes.get("/", (req, res) => {
    const data = readData();
    if (!data) {
        return res.status(500).json({ message: "Data Unavailable" })
    }
    res.status(200).json({ message: "All Orders List", orders: data.orders })
})

OrdersRoutes.post("/", (req, res) => {
    const data = readData();
    if (!data) {
        return res.status(500).json({ message: "Data Unavailable" })
    }
    const { productId, quantity } = req.body || {}
    if (!productId || !quantity) {
        return res.status(404).json({ message: "ProductId and quantity are required" })
    }
    const product = data.products.find((p) => p.id === productId);
    if (!product) {
        return res.status(404).json({ message: "Product Not found" })
    }
    if (product.stock === 0) {
        return res.status(400).json({ message: "Insufficient stock" })
    }
    if (quantity > product.stock) {
        return res.status(400).json({ message: "Quantity is more than product stock" })
    }
    const totalAmount = product.price * quantity
    const newOrder = {
        id: data.orders.length + 1,
        productId,
        quantity,
        totalAmount,
        status: "placed",
        createdAt: new Date().toISOString().slice(0, 10)
    }
    product.stock -= quantity;
    data.orders.push(newOrder);
    writeData(data);
    res.status(201).json({ message: "Order cretaed", order: newOrder })
})

OrdersRoutes.delete("/:orderId", (req, res) => {
    const data = readData();
    if (!data) {
        return res.status(500).json({ message: "Data Unavailable" })
    }
    const id = Number(req.params.orderId);
    const order = data.orders.find((o) => o.id === id);
    if (!order) {
        return res.status(404).json({ message: "Order Not found" })
    }
    if (order.status === "cancelled") {
        return res.status(400).json({ message: "Order is already cancelled" })
    }
    const currentDate = new Date().toISOString().slice(0, 10);
    const product = data.products.find((p) => p.id === order.productId)
    if (!product) {
        return res.status(404).json({ message: "Product not found" })
    }
    if (order.createdAt !== currentDate) {
        return res.status(400).json({ message: "The order is cancelled only on the same day" })
    }
    order.status = "cancelled"
    product.stock += order.quantity;
    writeData(data);
    res.status(200).json({ message: "Order status changed to cancelled", order })
})

OrdersRoutes.patch("/change-status/:orderId", (req, res) => {
    const data = readData();
    if (!data) {
        return res.status(500).json({ message: "Data Unavailable" })
    }
    const id = Number(req.params.orderId);
    const order = data.orders.find((o)=>o.id === id);
    if(!order){
        return res.status(404).json({message:"Order not found"})
    }
    const {status} = req.body || {};
    if(!status){
        return res.status(400).json({message:"status required"})
    }
    if(status === "placed"){
        return res.status(400).json({message:"Status is already placed"})
    }
    if(order.status === "cancelled" || order.status === "delivered"){
        return res.status(400).json({message:"Status can't be changed"})
    }
   if (order.status === "shipped" && status !== "delivered") {
        return res.status(400).json({ message: "Invalid status transition" });
    }

    order.status = status;
    writeData(data);

    return res.status(200).json({
        message: "Order status updated successfully",
        order
    });
})