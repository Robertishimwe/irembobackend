import { Router } from 'express';
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import docsRoutes from "./docs.routes";
import adminRoutes from "./admin.routes"

const router = Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/docs', docsRoutes);
router.use('/admin', adminRoutes);

export default router;
