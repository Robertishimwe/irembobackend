import { Router } from 'express';
import verify from '../middleware/verify';
import authControler from '../controllers/auth.controller';
import AuthValidation from '../validations/auth.Validation'

const router = Router();

router.post('/login', AuthValidation.loginDataValidation, authControler.normalLogin);
router.post('/login-with-token', authControler.loginWithToken);
router.post('/login-with-email', authControler.loginWithEmail);
router.post('/reset-password', authControler.resetPassword);
router.post('/forgot-password', authControler.forgotPassword);
router.post('/logout',verify, authControler.logoutUser);

export default router;
