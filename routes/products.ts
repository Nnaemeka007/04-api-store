import express from "express";
import { getAllProductsStatic,getAllProducts } from "../controller/products";


export const router=express.Router()

router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductsStatic)