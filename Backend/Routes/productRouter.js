import { Router } from "express";
import { createProducts, getProducts } from "../Controllers/productController.js";

const router = Router()

router.post("/createProduct" , createProducts)


router.get("/allProduct" , getProducts)



export default router