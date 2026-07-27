import mongoose from "mongoose";

const connectDb=async()=>{
    try{
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("mongoDb is connected")
    }
    catch(error){
      console.log(`mongodb error ${error}`)
    }
}
export default connectDb