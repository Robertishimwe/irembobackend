import { Router } from 'express';
import adminFunctions from '../controllers/adminFunc.controller'

const router = Router();

router.post('/approve-and-verify', adminFunctions.approveOrRejectDocumentAndVerifyUser);

export default router;
