import  express from "express"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import router from "./routes/billing.route.js";
dotenv.config();

const port= process.env.PORT
const app=express();
app.use(express.json())
app.use(cookieParser());
app.use('/',router)
app.get('/',(req,res)=>{
    res.json({message:"hello from billing"})
})



app.listen(port,()=>{
    console.log(`billing stared at ${port}`)
    connectDb()
})