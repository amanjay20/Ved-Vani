import { Router } from "express";
import { addCategory, deleteCategory, getCategories, updateCategory } from "../Controllers/categoryController.js";
import { addSubCategory, allSubCategory } from "../Controllers/subCategoryController.js";


const router = Router()

router.post("/addCategory", addCategory);

router.get("/allCategory", getCategories);


// Update Category Route
router.put("/categories/:id", updateCategory);


// Delete Category Route
router.delete("/categories/:id", deleteCategory);


router.post("/addSubCategory", addSubCategory);

router.get("/allsubCategory" , allSubCategory)




export default router

