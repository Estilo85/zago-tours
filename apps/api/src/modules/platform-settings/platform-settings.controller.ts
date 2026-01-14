import { Response } from 'express';
import { PlatformSettingsService } from './platform-settings.service';
import { ResponseUtil } from 'src/shared/utils/response';
import { asyncHandler } from 'src/shared/middleware/async-handler.middleware';
import { ReqBody, TypedRequest } from 'src/shared/types/express.types';

interface UpdateSettingsDTO {
  siteName?: string;
  contactEmail?: string;
  maintenance?: boolean;
}

interface SiteNameDTO {
  siteName: string;
}

interface ContactEmailDTO {
  contactEmail: string;
}

export class PlatformSettingsController {
  constructor(private readonly settingsService: PlatformSettingsService) {}

  getSettings = asyncHandler(async (req: TypedRequest, res: Response) => {
    const settings = await this.settingsService.getSettings();
    return ResponseUtil.success(res, settings);
  });

  updateSettings = asyncHandler(
    async (req: ReqBody<UpdateSettingsDTO>, res: Response) => {
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
    }
  );

  enableMaintenance = asyncHandler(async (req: TypedRequest, res: Response) => {
    const settings = await this.settingsService.enableMaintenance();
    return ResponseUtil.success(res, settings, 'Maintenance mode enabled');
  });

  disableMaintenance = asyncHandler(
    async (req: TypedRequest, res: Response) => {
      const settings = await this.settingsService.disableMaintenance();
      return ResponseUtil.success(res, settings, 'Maintenance mode disabled');
    }
  );

  updateSiteName = asyncHandler(
    async (req: ReqBody<SiteNameDTO>, res: Response) => {
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
    }
  );

  updateContactEmail = asyncHandler(
    async (req: ReqBody<ContactEmailDTO>, res: Response) => {
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
    }
  );

  checkMaintenance = asyncHandler(async (req: TypedRequest, res: Response) => {
    const isMaintenanceMode = await this.settingsService.isMaintenanceMode();
    return ResponseUtil.success(res, { maintenance: isMaintenanceMode });
  });

  clearCache = asyncHandler(async (req: TypedRequest, res: Response) => {
    this.settingsService.clearCache();
    return ResponseUtil.success(res, null, 'Cache cleared successfully');
  });
}
