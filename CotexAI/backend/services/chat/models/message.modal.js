import mongoose from "mongoose"


const artifactSchema  = new mongoose.Schema({
    id : Number,
    type:String,
    title:String,
    // files:[fileSchema],

},
{_id:false})

const messageSchema = new mongoose.Schema({

    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation"
    },
    role:{
         type:String,
         enum:["user","assistant"]
    },
    content:{
        type:String,

    },
    images: {
        type: [String],
        default: []
    }

},  { timestamps: true }) 

const Message = mongoose.model("Message", messageSchema)
export default Message