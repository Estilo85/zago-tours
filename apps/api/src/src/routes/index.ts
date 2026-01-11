import { Router } from 'express';
import { adventureRoutes } from 'src/modules/adventure/adventure.routes';
import { authRoutes } from 'src/modules/auth/auth.routes';
import { callbackRequestRoutes } from 'src/modules/callback-request/callback-request.routes';
import { postRoutes } from 'src/modules/community/post/post.routes';
import { contractRoutes } from 'src/modules/contract/contract.routes';
import { destinationCountryRoutes } from 'src/modules/destination-country/destination-country.routes';
import { eventRoutes } from 'src/modules/event/event.routes';
import { galleryRoutes } from 'src/modules/gallery/gallery.routes';
import { generalInquiryRoutes } from 'src/modules/general-enquiry/general-inquiry.routes';
import { platformSettingsRoutes } from 'src/modules/platform-settings/platform-settings.routes';
import { reviewRoutes } from 'src/modules/review/review.routes';
import { tripPlanningCallRoutes } from 'src/modules/trip-planning-call/trip-planning-call.routes';
import { tripRequestRoutes } from 'src/modules/trip-request/trip-request.routes';
import { userRoutes } from 'src/modules/user/user.routes';

const router: Router = Router();

// // Auth & User
router.use('/api/auth', authRoutes);
router.use('/api/users', userRoutes);

// // Adventures
router.use('/api/adventures', adventureRoutes);
router.use('/api/gallery', galleryRoutes);

// // Reviews
router.use('/api/reviews', reviewRoutes);

// // Community
router.use('/api/posts', postRoutes);

// // Events & Requests
router.use('/api/events', eventRoutes);
router.use('/api/trip-requests', tripRequestRoutes);
router.use('/api/callback-requests', callbackRequestRoutes);
router.use('/api/general-inquiries', generalInquiryRoutes);

// // Calls & Contracts
router.use('/api/trip-planning-calls', tripPlanningCallRoutes);
router.use('/api/contracts', contractRoutes);

// // Settings
router.use('/api/platform-settings', platformSettingsRoutes);
router.use('/api/destination-countries', destinationCountryRoutes);

export default router;
