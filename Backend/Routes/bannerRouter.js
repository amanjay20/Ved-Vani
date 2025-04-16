import { Router } from "express";
import { addBanner, deleteBanner, getBanner } from "../Controllers/bannerController.js";
const router = Router();


router.post("/addbanner", addBanner);

router.delete("/:id", deleteBanner)

router.get("/allBanner", getBanner);

export default router