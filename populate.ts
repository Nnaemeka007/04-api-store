
import "dotenv/config"
import mongoose from "mongoose"
import { Product } from "./models/product"
import jsonProducts from "./products.json"

async function start(): Promise<void> {
  
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is missing from .env")
    process.exit(1)
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL)
    await Product.deleteMany({})
    await Product.create(jsonProducts)
    console.log("Successful!!")
  } catch (error) {
    console.error(error)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

start()