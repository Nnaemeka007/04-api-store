import mongoose from 'mongoose'
import * as dotenv from "dotenv"
import express,{Express,Request,Response} from 'express'
import { notFound as notFoundMiddleware } from "./middleware/notFound"
import { errorHandlerMiddleware } from "./middleware/error-handler"
import { router as ProductsRouter} from './routes/products'

dotenv.config()
const app:Express=express()
const port=process.env.PORT

// express middleware
app.use(express.json())

// routes
app.get('/',(req:Request,res:Response)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')  
})

app.use('/api/v1/products',ProductsRouter)

// router middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


// connect to mongoDB
async function start(){
    if(!process.env.DATABASE_URL){
        throw new Error('cannot read env variable')
        process.exit(1)
    }
  try {
      await mongoose.connect(process.env.DATABASE_URL)
     
      console.log('connected to DB...')
      app.listen(port,()=>{
    console.log(`server is hosting on ${port}.... `)
})
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
start()