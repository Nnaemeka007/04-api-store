import { Request,Response,NextFunction,ErrorRequestHandler } from "express"


export const errorHandlerMiddleware:ErrorRequestHandler=(err:Error,req:Request,res:Response,next:NextFunction)=>{
    console.log(err)
 return res.status(500).json({msg:'Something went wrong,pls try again!!!'})
}