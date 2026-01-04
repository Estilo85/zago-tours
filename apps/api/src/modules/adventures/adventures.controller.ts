import { Request, Response } from 'express';
import { adventureService } from './adventures.service';

export class AdventureController {
  async getAllAdventures(req: Request, res: Response) {
    try {
      const filters = {
        location: req.query.location as string,
        level: req.query.level as any,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 20,
      };

      const result = await adventureService.searchAdventures(filters);

      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
      });
    }
  }

  async createAdventure(req: Request, res: Response) {
    try {
      const adventure = await adventureService.create(req.body);

      res.status(201).json({
        success: true,
        data: adventure,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
      });
    }
  }
}
