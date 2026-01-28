export const validateUser = (req,res,next) => {
    const {name,email,password,age} = req.body || {};
    if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, password are required" })
        }
    if(!name.trim()){
       return res.status(400).json({message:"Please enter valid name"}) 
    }
    if(!email.trim().includes('@')){
        return res.status(400).json({message:"Please enter valid email"})
    }
    if(password.trim().length < 8){
        return res.status(400).json({message:"Password should be atleast 8 characters"})
    }
    if(age && (typeof age !== "number" || age<18)){
        return res.status(400).json({message:"Age must be greater than 18"})
    }
    next()
}

export const updateValidUser = (req,res,next) => {
    const {name,email,password,age,role} = req.body || {};
    if(name && !name.trim()){
       return res.status(400).json({message:"Please enter valid name"}) 
    }
    if(email && !email.trim().includes('@')){
        return res.status(400).json({message:"Please enter valid email"})
    }
    if(password && password.trim().length < 8){
        return res.status(400).json({message:"Password should be atleast 8 characters"})
    }
    if(age && (typeof age !== "number" || age<18)){
        return res.status(400).json({message:"Age must be greater than 18"})
    }
    next()
}