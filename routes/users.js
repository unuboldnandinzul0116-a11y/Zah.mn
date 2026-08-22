import express from 'express';
import { protect } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import User from '../models/User.js';

const router = express.Router();

// Get user profile
router.get('/:userId', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId).select('-password');

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.json({ success: true, user });
}));

// Get current user profile (protected)
router.get('/me/profile', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');

  res.json({ success: true, user });
}));

// Update profile (protected)
router.put('/me/update', protect, asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, bio, location, avatar } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { firstName, lastName, phone, bio, location, avatar, updatedAt: new Date() },
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    message: 'Profile updated successfully!',
    user
  });
}));

// Get user dashboard (protected)
router.get('/me/dashboard', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  // Get user stats
  const stats = {
    user,
    totalPosts: user.postsCount,
    rating: user.rating,
    reviews: user.reviewsCount
  };

  res.json({ success: true, stats });
}));

export default router;
