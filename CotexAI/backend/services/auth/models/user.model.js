import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    firebaseUid:{
        type:String,
        unique:true
    },
    name:String,
    email:String,
    avatar:String,
    plan:{
        type:String,
        defualt:"free"
    },
    credits:{
        type:Number,
        defualt:100
    },
    totalCredits:{
        type:String,
        defualt:100
        
    },
    planExpiresAt:Date

},{timestamps:true})

const User=mongoose.model("User",userSchema)
export default User 