import { Router } from 'express';
import { PlatformSettingsRepository } from './platform-settings.repository';
import { PlatformSettingsService } from './platform-settings.service';
import { PlatformSettingsController } from './platform-settings.controller';
import { Role } from '@zagotours/database';

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

  settingsController.getSettings
);

router.put(
  '/',

  settingsController.updateSettings
);

router.patch(
  '/site-name',

  settingsController.updateSiteName
);

router.patch(
  '/contact-email',

  settingsController.updateContactEmail
);

router.patch(
  '/maintenance/enable',

  settingsController.enableMaintenance
);

router.patch(
  '/maintenance/disable',

  settingsController.disableMaintenance
);

router.post(
  '/cache/clear',

  settingsController.clearCache
);

export { router as platformSettingsRoutes };
