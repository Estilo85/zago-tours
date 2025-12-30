import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
// Import other routes...

const router: Router = Router();

router.use('/auth', authRoutes);
// router.use('/adventures', adventureRoutes);
// router.use('/community', communityRoutes);
// router.use('/events', eventRoutes);
// etc...

export default router;
