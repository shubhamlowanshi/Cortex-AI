import express from 'express'
import { login, Logout } from '../controllers/auth.controller.js';

const router=express.Router();

router.post('/login',login)
router.get('/logout',Logout)

export default router;
