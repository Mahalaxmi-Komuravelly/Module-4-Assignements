export const validateTodo = (req, res, next) => {
    const {title} = req.body || {};
    if (!title || typeof title !== "string") {
        return res.status(400).json({
            "error": "Invalid request body. Only 'title' is allowed"
        })
    }
    const keys = Object.keys(req.body)
    if(keys.length !==1 || keys[0]!=="title"){
        return res.status(400).json({
            "error": "Invalid request body. Only 'title' is allowed"
        })
    }
    next();
}