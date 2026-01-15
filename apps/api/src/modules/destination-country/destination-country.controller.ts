import { Response } from 'express';
import { DestinationCountryService } from './destination-country.service';
import { ResponseUtil } from 'src/shared/utils/responseUtils';
import {
  ReqBody,
  ReqParams,
  ReqParamsBody,
  ReqQuery,
  TypedRequest,
} from 'src/shared/types/express.types';
import { UuidParam } from 'src/common/validation/common.validation';
import { asyncHandler } from 'src/shared/middleware/async-handler.middleware';

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
    }
  );

  getById = asyncHandler(async (req: ReqParams<UuidParam>, res: Response) => {
    const country = await this.countryService.getById(req.params.id);
    return ResponseUtil.success(res, country);
  });

  create = asyncHandler(async (req: ReqBody<any>, res: Response) => {
    const country = await this.countryService.create(req.body);
    return ResponseUtil.success(res, country, 'Country created', 201);
  });

  update = asyncHandler(
    async (req: ReqParamsBody<UuidParam, any>, res: Response) => {
      const country = await this.countryService.update(req.params.id, req.body);
      return ResponseUtil.success(res, country, 'Country updated');
    }
  );

  toggleActive = asyncHandler(
    async (
      req: ReqParamsBody<UuidParam, { isActive: boolean }>,
      res: Response
    ) => {
      const { isActive } = req.body;

      if (typeof isActive !== 'boolean') {
        return ResponseUtil.error(res, 'isActive is required', 400);
      }

      await this.countryService.toggleActive(req.params.id, isActive);
      return ResponseUtil.success(
        res,
        null,
        `Country ${isActive ? 'activated' : 'deactivated'}`
      );
    }
  );

  delete = asyncHandler(async (req: ReqParams<UuidParam>, res: Response) => {
    await this.countryService.delete(req.params.id);
    return ResponseUtil.success(res, null, 'Country deleted');
  });
}
