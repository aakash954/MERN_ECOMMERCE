import express from 'express'
import {register} from '../Controllers/user.js';
import {login} from '../Controllers/user.js';
import {users} from '../Controllers/user.js';
import {profile} from '../Controllers/user.js';
import { Authenticated } from '../Middlewares/auth.js';


const router = express.Router();

//register User
router.post('/register',register) // /api/user/register
//login User
router.post('/login',login) // /api/user/login
//get all users
router.get('/all',users) // /api/user/users
//get user profile
router.get('/profile',Authenticated, profile) 

export default router
