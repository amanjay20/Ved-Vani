import { Router } from "express"
import { login, loginOrSignup, LoginUser } from "../Controllers/userController.js"
import authenticateToken from "../Middlewares/JWTtoken.js"

const router = Router()


router.post("/sign-up" , loginOrSignup)

router.post("/login" , login)

router.post("/getuser", authenticateToken, LoginUser);




export default router