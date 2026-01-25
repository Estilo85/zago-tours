import { Response } from 'express';
import { DestinationCountryService } from './destination-country.service';
import { ResponseUtil } from 'src/shared/utils/responseUtils';
import {
  ReqBody,
  ReqParams,
  ReqParamsBody,
  ReqQuery,
} from 'src/shared/types/express.types';
import { UuidParam } from 'src/common/validation/common.validation';
import { asyncHandler } from 'src/shared/middleware/async-handler.middleware';
import { BulkCreateDestinationCountriesDto } from '@zagotours/types';

export class DestinationCountryController {
  constructor(private countryService: DestinationCountryService) {}

  getAll = asyncHandler(
    async (req: ReqQuery<{ active?: string }>, res: Response) => {
      const { active } = req.query;

      const countries =
        active === 'true'
          ? await this.countryService.getActiveCountries()
          : await this.countryService.getAllCountries();

      return ResponseUtil.success(res, countries);
    },
  );

  getById = asyncHandler(async (req: ReqParams<UuidParam>, res: Response) => {
    const country = await this.countryService.getById(req.params.id);
    return ResponseUtil.success(res, country);
  });

  create = asyncHandler(async (req: ReqBody<any>, res: Response) => {
    const country = await this.countryService.create(req.body);
    return ResponseUtil.success(res, country, 'Country created', 201);
  });

  createBulk = asyncHandler(
    async (req: ReqBody<BulkCreateDestinationCountriesDto>, res: Response) => {
      const { countries } = req.body;

      if (!countries || !Array.isArray(countries)) {
        return ResponseUtil.error(res, 'countries array is required', 400);
      }

      if (countries.length === 0) {
        return ResponseUtil.error(res, 'At least one country is required', 400);
      }

      await this.countryService.createBulk(countries);

      return ResponseUtil.success(
        res,
        { count: countries.length },
        `${countries.length} countries created successfully`,
        201,
      );
    },
  );

  update = asyncHandler(
    async (req: ReqParamsBody<UuidParam, any>, res: Response) => {
      const country = await this.countryService.update(req.params.id, req.body);
      return ResponseUtil.success(res, country, 'Country updated');
    },
  );

  toggleActive = asyncHandler(
    async (req: ReqParams<UuidParam>, res: Response) => {
      const country = await this.countryService.getById(req.params.id);

      const newStatus = !country.isActive;

      await this.countryService.toggleActive(req.params.id, newStatus);

      return ResponseUtil.success(
        res,
        { isActive: newStatus },
        `Country ${newStatus ? 'activated' : 'deactivated'}`,
      );
    },
  );

  delete = asyncHandler(async (req: ReqParams<UuidParam>, res: Response) => {
    await this.countryService.delete(req.params.id);
    return ResponseUtil.success(res, null, 'Country deleted');
  });
}
