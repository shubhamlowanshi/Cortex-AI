import mongoose from "mongoose"

const conversationSchema =new mongoose.Schema({
 
    title:{
        type:String,
        default:"New chat"
    },
    userId:{
        type:String
    }

},{timeStamps:true})

const Conversation= mongoose.model("Conversation",conversationSchema)
export default Conversation