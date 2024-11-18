const {constants}=require("../constant");

const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode ? res.statusCode:500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title:"Validation Faield",
                message: err.message,
                stackTrace:err.stack
            })
            break;
        case constants.NOT_FOUND:
            res.json({
                title:"Not Found",
                message: err.message,
                stackTrace:err.stack
            })
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title:"Unauthorized",
                message: err.message,
                stackTrace:err.stack
            })
            break;
        case constants.FORBIDEN:
            req.json({
                title:"Forbiden",
                message: err.message,
                stackTrace:err.stack
            })
            break;
        case constants.SERVER_ERROR:
            req.json({
                title:"Server error",
                message: err.message,
                stackTrace:err.stack
            })
        default:
            console.log("No Error All Good!");
            break;
    }
}
module.exports=errorHandler;