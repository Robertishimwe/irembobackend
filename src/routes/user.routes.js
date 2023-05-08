import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import AdminFunctions from '../controllers/adminFunc.controller'
import upload from '../helper/multer';
import verify from '../middleware/verify';
import AuthValidation from '../validations/auth.Validation'

const router = Router();

router.post('/create', AuthValidation.verifyUserData, UsersController.createUserController);
router.patch('/update',upload.array('images', 1),verify, UsersController.updateUserContriller);
router.get('/get/all', AdminFunctions.listOfUsers);
router.get('/search/:searchString', AdminFunctions.generalUserSearch);

export default router;
