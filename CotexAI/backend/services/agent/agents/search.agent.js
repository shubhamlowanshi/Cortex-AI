import { searchtool } from "../config/tavily.js"

export const searchtAgent=async(state)=>{
    try{
        const results=await searchtool.invoke({
            query:state.prompt
        })
        console.log(results)
        return {
            ...state,
            searchResults:results ,
            images:results.images
        }
            
    }
    catch(error){
        console.error("searchtAgent failed:", error)
        return{
            ...state,
            searchResults:[],
            images:[]

        }

    }
    
}