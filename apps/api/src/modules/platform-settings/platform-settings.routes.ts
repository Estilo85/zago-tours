import { Router } from 'express';
import { PlatformSettingsRepository } from './platform-settings.repository';
import { PlatformSettingsService } from './platform-settings.service';
import { PlatformSettingsController } from './platform-settings.controller';
import { Role } from '@zagotours/database';
import { authenticate } from 'src/shared/middleware/authentication.middleware';
import { authorizeRoles } from 'src/shared/middleware/authorization.middleware';

const router: Router = Router();

// Initialize dependencies
const settingsRepository = new PlatformSettingsRepository();
const settingsService = new PlatformSettingsService(settingsRepository);
const settingsController = new PlatformSettingsController(settingsService);

router.get('/public', settingsController.getSettings);
router.get('/maintenance-check', settingsController.checkMaintenance);

// Admin-only routes
router.get(
  '/',
  authenticate,
  authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
  settingsController.getSettings,
);

router.put(
  '/',
  authenticate,
  authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
  settingsController.updateSettings,
);

router.patch(
  '/site-name',
  authenticate,
  authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
  settingsController.updateSiteName,
);

router.patch(
  '/contact-email',
  authenticate,
  authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
  settingsController.updateContactEmail,
);

router.patch(
  '/maintenance/enable',
  authenticate,
  authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
  settingsController.enableMaintenance,
);

router.patch(
  '/maintenance/disable',
  authenticate,
  authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
  settingsController.disableMaintenance,
);

router.post(
  '/cache/clear',
  authenticate,
  authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
  settingsController.clearCache,
);

export { router as platformSettingsRoutes };
