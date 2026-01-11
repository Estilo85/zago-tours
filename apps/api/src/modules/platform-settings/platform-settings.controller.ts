import { Request, Response, NextFunction } from 'express';
import { PlatformSettingsService } from './platform-settings.service';
import { ResponseUtil } from 'src/shared/utils/response';

export class PlatformSettingsController {
  constructor(private readonly settingsService: PlatformSettingsService) {}

  getSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const settings = await this.settingsService.getSettings();
      return ResponseUtil.success(res, settings);
    } catch (error) {
      next(error);
    }
  };

  updateSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { siteName, contactEmail, maintenance } = req.body;

      const data: any = {};

      if (siteName !== undefined) data.siteName = siteName;
      if (contactEmail !== undefined) data.contactEmail = contactEmail;
      if (maintenance !== undefined) data.maintenance = maintenance;

      const settings = await this.settingsService.updateSettings(data);
      return ResponseUtil.success(
        res,
        settings,
        'Settings updated successfully'
      );
    } catch (error) {
      if (error instanceof Error) {
        return ResponseUtil.error(res, error.message, 400);
      }
      next(error);
    }
  };

  enableMaintenance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const settings = await this.settingsService.enableMaintenance();
      return ResponseUtil.success(res, settings, 'Maintenance mode enabled');
    } catch (error) {
      next(error);
    }
  };

  disableMaintenance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const settings = await this.settingsService.disableMaintenance();
      return ResponseUtil.success(res, settings, 'Maintenance mode disabled');
    } catch (error) {
      next(error);
    }
  };

  updateSiteName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { siteName } = req.body;

      if (!siteName) {
        return ResponseUtil.error(res, 'Site name is required', 400);
      }

      const settings = await this.settingsService.updateSiteName(siteName);
      return ResponseUtil.success(
        res,
        settings,
        'Site name updated successfully'
      );
    } catch (error) {
      if (error instanceof Error) {
        return ResponseUtil.error(res, error.message, 400);
      }
      next(error);
    }
  };

  updateContactEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { contactEmail } = req.body;

      if (!contactEmail) {
        return ResponseUtil.error(res, 'Contact email is required', 400);
      }

      const settings =
        await this.settingsService.updateContactEmail(contactEmail);
      return ResponseUtil.success(
        res,
        settings,
        'Contact email updated successfully'
      );
    } catch (error) {
      if (error instanceof Error) {
        return ResponseUtil.error(res, error.message, 400);
      }
      next(error);
    }
  };

  checkMaintenance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const isMaintenanceMode = await this.settingsService.isMaintenanceMode();
      return ResponseUtil.success(res, { maintenance: isMaintenanceMode });
    } catch (error) {
      next(error);
    }
  };

  clearCache = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.settingsService.clearCache();
      return ResponseUtil.success(res, null, 'Cache cleared successfully');
    } catch (error) {
      next(error);
    }
  };
}
