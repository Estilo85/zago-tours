import { Router } from 'express';
import { ContractRepository } from './contract.repository';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { Role } from '@zagotours/database';
import { upload } from 'src/config/multer.config';

const router: Router = Router();

// Initialize dependencies
const contractRepository = new ContractRepository();
const contractService = new ContractService(contractRepository);
const contractController = new ContractController(contractService);

// User routes
router.post('/', upload.single('media'), contractController.create);
router.get('/my-contracts', contractController.getMyContracts);
router.get('/:id', contractController.getById);
router.patch('/:id/sign', contractController.sign);

// Admin routes
router.get('/', contractController.getAll);

router.get('/pending/list', contractController.getPending);

router.delete('/:id', contractController.delete);

export { router as contractRoutes };
