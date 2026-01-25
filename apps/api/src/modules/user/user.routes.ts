import { Router } from 'express';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Role } from '@zagotours/database';
import { authenticate } from 'src/shared/middleware/authentication.middleware';
import { requireRole } from 'src/shared/middleware/role-guard';

const router: Router = Router();

// Initialize dependencies
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// ============================================
// USER PROFILE ROUTES (Authenticated Users)
// ============================================

/**
 * @route   GET /api/users/profile
 * @desc    Get current user's profile with stats
 * @access  Private
 */
router.get('/profile', authenticate, userController.getProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Update current user's profile
 * @access  Private
 */
router.put('/profile', authenticate, userController.updateProfile);

/**
 * @route   GET /api/users/referrals
 * @desc    Get current user's referral stats
 * @access  Private
 */
router.get('/referrals', authenticate, userController.getReferralStats);

// ============================================
// ADMIN ROUTES (Admin & Super Admin Only)
// ============================================

/**
 * @route   GET /api/users
 * @desc    Get all users with pagination and filters
 * @access  Admin
 * @query   page, limit, role, status, search
 */
router.get('/', authenticate, userController.getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Admin
 */
router.get('/:id', authenticate, userController.getUserById);

/**
 * @route   PATCH /api/users/:id/status
 * @desc    Update user status
 * @access  Admin
 */
router.patch('/:id/status', authenticate, userController.updateUserStatus);

/**
 * @route   PATCH /api/users/safety-ambassador
 * @desc    Promote/demote user to/from safety ambassador
 * @access  Admin
 */
router.patch(
  '/:id/safety-ambassador',
  authenticate,
  userController.promoteSafetyAmbassador,
);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user (soft by default, hard if ?hard=true)
 * @access  Admin
 * @query   hard (optional)
 */
router.delete('/:id', authenticate, userController.deleteUser);

export { router as userRoutes };
