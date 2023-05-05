import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import AdminFunctions from '../controllers/adminFunc.controller'

const router = Router();

router.post('/create', UsersController.createUserController);
router.get('/get/all', AdminFunctions.listOfUsers);
router.get('/search/:searchString', AdminFunctions.generalUserSearch);

export default router;
