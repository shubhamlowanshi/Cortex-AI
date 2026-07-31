import React from "react"
import api from "../utils/axios"

async function sendMessage(payload) {
  try {
    const { data } = await api.post("/api/agent/chat", payload)
    console.log(data)
    return data
  }
  catch (error) {
    console.error("Backend error response:", error.response?.data)   // 👈 this is the key line
    console.error("Status:", error.response?.status)
    return null
  }
}
export default sendMessage