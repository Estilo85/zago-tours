import { Router } from 'express';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';

const router: Router = Router();

// Initialize dependencies
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// ===== USER PROFILE ROUTES (Authenticated Users) =====
router.get('/profile', userController.getProfile);
// router.put('/profile', userController.updateProfile);
router.get('/referrals', userController.getReferrals);

// ===== ADMIN ROUTES (Admin Only) =====
router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

export { router as userRoutes };
