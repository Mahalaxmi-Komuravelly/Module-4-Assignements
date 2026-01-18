export const loggerMiddleware = (req,res,next) => {
    let data = `[${new Date().toISOString().replace("T"," ").slice(0,19)}] ${req.method} ${req.url}\n`
    console.log(data);
    next();
}