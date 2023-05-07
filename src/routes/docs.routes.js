import { Router } from 'express';
import upload from '../helper/multer';
import verify from '../middleware/verify';
import DocsController from '../controllers/docs.controller';

const router = Router();

router.post('/add',upload.array('images', 1),verify, DocsController.addDocController);

export default router;
