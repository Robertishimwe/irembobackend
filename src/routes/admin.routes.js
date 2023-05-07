import { Router } from 'express';
import adminFunctions from '../controllers/adminFunc.controller'
import DocsController from '../controllers/docs.controller';

const router = Router();

router.post('/approve-and-verify', adminFunctions.approveOrRejectDocumentAndVerifyUser);
router.get('/all-pending-request', DocsController.getAllPendingVerification)

export default router;
