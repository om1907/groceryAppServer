import express from 'express';
import { userLoginController, userRegisterController } from '../controllers/userController.js';

const router = express.Router();


router.route('/user/login').post(userLoginController);
router.route('/user/register').post(userRegisterController);


export default router;