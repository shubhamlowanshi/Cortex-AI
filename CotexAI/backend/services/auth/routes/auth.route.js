import express from 'express'
import { login, Logout, updateUserPayment } from '../controllers/auth.controller.js';

const router=express.Router();

router.post('/login',login)
router.get('/logout',Logout)
router.post('/update-plan',updateUserPayment)

export default router;
