import express from "express"
import { createConversation,getConversation,getMessage,saveMessage, updatedConversation, } from "../controller/chat.controller.js"
const router =express.Router()


router.get('/create-conversation',createConversation)
router.get('/get-conversation',getConversation)
router.post('/update-conversation',updatedConversation)
router.post('/save-message',saveMessage)
router.get('/get-messages/:conversationId',getMessage)

export default router