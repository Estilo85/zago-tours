import { Request, Response, NextFunction } from 'express';
import { PlatformSettingsService } from 'src/modules/platform-settings/platform-settings.service';
import { PlatformSettingsRepository } from 'src/modules/platform-settings/platform-settings.repository';
import { ResponseUtil } from 'src/shared/utils/response';

const settingsRepo = new PlatformSettingsRepository();
const settingsService = new PlatformSettingsService(settingsRepo);

// Paths that should always be accessible even in maintenance mode
const WHITELIST_PATHS = [
  '/api/platform-settings/public',
  '/api/platform-settings/maintenance-check',
  '/api/platform-settings/maintenance/disable',
  '/api/auth/login', // Allow admin login during maintenance
];

export const maintenanceMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if path is whitelisted
    const isWhitelisted = WHITELIST_PATHS.some((path) =>
      req.path.startsWith(path)
    );
    if (isWhitelisted) {
      return next();
    }

    // Check maintenance mode
    const isMaintenanceMode = await settingsService.isMaintenanceMode();

    if (isMaintenanceMode) {
      // Allow super admins to access during maintenance
      if (req?.role === 'SUPER_ADMIN') {
        return next();
      }

      // Return maintenance message for everyone else
      return ResponseUtil.error(
        res,
        'Site is currently under maintenance. Please try again later.',
        503
      );
    }

    next();
  } catch (error) {
    // If settings check fails, allow request to continue
    // (fail open rather than fail closed)
    next();
  }
};
