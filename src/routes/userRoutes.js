import express from 'express';
import { userLoginController, userRegisterController } from '../controllers/userController.js';

const router = express.Router();


router.route('/users/login').post(userLoginController);
router.route('/users/register').post(userRegisterController);


export default router;