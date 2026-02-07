import jwt from "jsonwebtoken"
export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(400).json({ message: "Token missing" })
        }
        
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(500).json({ message: "Invalid or expired token" });
    }
}

export const authorizedRoles = (...allowedRoles) => {
    return (req,res,next) => {
        if(!req.user || !allowedRoles.includes(req.user.role)){
            return res.status(403).json({message:"You are not authorized to access this resource"})
        }
        next();
    }
    
}