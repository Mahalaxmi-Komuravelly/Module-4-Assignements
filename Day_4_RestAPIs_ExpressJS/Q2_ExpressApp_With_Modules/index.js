import express from "express";
import { readData } from "./read.js";

import dns from "dns";
import os from "os";
const app=express();

const PORT = 8080;
app.get("/test",(req,res)=>{
    res.send("Test route is working!");
})

app.get("/readfile",(req,res)=>{
    try {
        const readFileData = readData();
        return res.send(readFileData);
    } catch (error) {
        return res.status(500).send("File not found");
    }
    
    
})

app.get("/systemdetails",(req,res)=>{
    const systemDetails = {
        platform : os.platform(),
        totalMemory : (os.totalmem()/1024**3).toFixed(0) + " GB",
        freeMemory : (os.freemem()/1024**3).toFixed(0) + " GB",
        cpuModel : os.cpus()[0].model,
        cpuCoreCount : os.cpus().length
    }
    res.send(systemDetails);
})

app.get("/getip",(req,res)=>{
        dns.lookup("masaischoo.com",{all:true},(err,addressess)=>{
        if(err) {
            return res.status(500).send({error:"DNS lookup failed"})
        }
        res.json(
            {
                hostname:"masaischool.com",
                ipAddress:addressess
            });
    })
    
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})