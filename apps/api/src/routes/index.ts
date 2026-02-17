import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { userRoutes } from '../modules/user/user.routes';
import { adventureRoutes } from '../modules/adventure/adventure.routes';
import { adventureGalleryRoutes } from '../modules/adventure-gallery/gallery.routes';
import { reviewRoutes } from '../modules/review/review.routes';
import { postRoutes } from '../modules/community/post/post.routes';
import { eventRoutes } from '../modules/event/event.routes';
import { tripRequestRoutes } from '../modules/trip-request/trip-request.routes';
import { callbackRequestRoutes } from '../modules/callback-request/callback-request.routes';
import { generalInquiryRoutes } from '../modules/general-enquiry/general-inquiry.routes';
import { tripPlanningCallRoutes } from '../modules/trip-planning-call/trip-planning-call.routes';
import { contractRoutes } from '../modules/contract/contract.routes';
import { platformSettingsRoutes } from '../modules/platform-settings/platform-settings.routes';
import { destinationCountryRoutes } from '../modules/destination-country/destination-country.routes';
import { itineraryRoutes } from 'src/modules/itinerary/itinerary.routes';
import { dashboardRoute } from 'src/modules/dashboard/dashboard.routes';
import { newsletterRoutes } from 'src/modules/newsletter/newsletter.routes';

const router: Router = Router();
const adventureRouter: Router = Router();

adventureRouter.use(itineraryRoutes);
adventureRouter.use(adventureGalleryRoutes);
adventureRouter.use(adventureRoutes);

// // Auth & User
router.use('/api/auth', authRoutes);
router.use('/api/users', userRoutes);

// // Adventures
router.use('/api/adventures', adventureRouter);
// // Reviews
router.use('/api/reviews', reviewRoutes);
router.use('/api/newsletter', newsletterRoutes);

// // Community
router.use('/api/posts', postRoutes);

// // Events & Requests
router.use('/api/events', eventRoutes);
router.use('/api/trip-requests', tripRequestRoutes);
router.use('/api/callback-requests', callbackRequestRoutes);
router.use('/api/inquiries', generalInquiryRoutes);

// // Calls & Contracts
router.use('/api/trip-planning-calls', tripPlanningCallRoutes);
router.use('/api/contracts', contractRoutes);

// // Settings
router.use('/api/platform-settings', platformSettingsRoutes);
router.use('/api/destination-countries', destinationCountryRoutes);

//Statistics
router.use('/api/dashboard', dashboardRoute);

export default router;
