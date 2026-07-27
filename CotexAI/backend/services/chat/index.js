import express from "express"
import dotenv from "dotenv"
import connectDb from "../chat/config/db.js";
import router from "./route/chat.routes.js";
dotenv.config();
const port = process.env.PORT
const app = express();
app.use(express.json())


app.use('/', router)






app.get('/', (req, res) => {
    res.json({ message: "hello from chat" })
})



app.listen(port, () => {
    console.log(`chat stared at ${port}`)
    connectDb()
})