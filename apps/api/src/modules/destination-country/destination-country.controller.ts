import { Request, Response, NextFunction } from 'express';
import { DestinationCountryService } from './destination-country.service';
import { ResponseUtil } from 'src/shared/utils/response';

export class DestinationCountryController {
  constructor(private countryService: DestinationCountryService) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { active } = req.query;

      const countries =
        active === 'true'
          ? await this.countryService.getActiveCountries()
          : await this.countryService.getAllCountries();

      return ResponseUtil.success(res, countries);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const country = await this.countryService.getById(id);
      return ResponseUtil.success(res, country);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const country = await this.countryService.createCountry(req.body);
      return ResponseUtil.success(res, country, 'Country created', 201);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const country = await this.countryService.updateCountry(id, req.body);
      return ResponseUtil.success(res, country, 'Country updated');
    } catch (error) {
      next(error);
    }
  };

  toggleActive = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { isActive } = req.body;
      await this.countryService.toggleActive(id, isActive);
      return ResponseUtil.success(
        res,
        null,
        `Country ${isActive ? 'activated' : 'deactivated'}`
      );
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.countryService.deleteCountry(id);
      return ResponseUtil.success(res, null, 'Country deleted');
    } catch (error) {
      next(error);
    }
  };
}
