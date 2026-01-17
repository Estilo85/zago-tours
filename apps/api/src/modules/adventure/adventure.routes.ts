import { Router } from 'express';
import { AdventureRepository } from './adventure.repository';
import { AdventureService } from './adventure.service';
import { AdventureController } from './adventure.controller';
import { validateRequest } from 'src/shared/middleware/validation.middleware';
import { commonValidation } from 'src/common/validation/common.validation';
import { upload } from 'src/config/multer.config';
import {
  bulkCreateAdventureSchema,
  createAdventureSchema,
} from './adventure.validation';

const router: Router = Router();
const controller = new AdventureController(
  new AdventureService(new AdventureRepository())
);

router.get('/', controller.getAll);
router.post(
  '/',
  upload.single('media'),
  validateRequest({ body: createAdventureSchema }),
  controller.create
);
router.post(
  '/bulk',
  validateRequest({ body: bulkCreateAdventureSchema }),
  controller.createBulk
);

router
  .route('/:id')
  .all(validateRequest({ params: commonValidation.uuidParam }))
  .get(controller.getById)
  .patch(upload.single('media'), controller.update)
  .delete(controller.delete);

router.post(
  '/:id/toggle-like',
  validateRequest({ params: commonValidation.uuidParam }),
  controller.toggleLike
);

export { router as adventureRoutes };
