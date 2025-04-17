
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import productsRoutes from "./routes/product.route.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(express.json());//allows us to parse/accept json data from the client in the request body

app.use("/api/products",productsRoutes);

app.listen(PORT,() =>{
    
    console.log("Server started at http://localhost:"+PORT);//debugging purpose
 
});
//ZzmH9rL3mQKEg46x
