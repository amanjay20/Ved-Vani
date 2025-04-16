import express, { response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import { Server } from "socket.io";
import http from "http";
import cors from "cors"

import { connectDB } from "./Models/dbConnection.js";


import UserRouter from "./Routes/userRouter.js"
import BannerRouter from './Routes/bannerRouter.js'
import CategoryRouter from './Routes/categoryRouter.js'
import ProductRouter from './Routes/productRouter.js'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000
// Increase JSON payload limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(
    cors()
  );
connectDB();
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/user' , UserRouter)
app.use('/api/banner' , BannerRouter)
app.use("/api/category" , CategoryRouter)
app.use("/api/product" , ProductRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
