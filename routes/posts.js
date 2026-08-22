import express from 'express';
import { protect, optional } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import Post from '../models/Post.js';
import User from '../models/User.js';

const router = express.Router();

// Get all posts with filtering
router.get('/', optional, asyncHandler(async (req, res) => {
  const { category, search, sortBy, page = 1, limit = 20, location } = req.query;

  let query = { status: 'Active' };

  if (category && category !== 'All') {
    query.category = category;
  }

  if (location) {
    query.location = { $regex: location, $options: 'i' };
  }

  if (search) {
    query.$text = { $search: search };
  }

  const skip = (page - 1) * limit;
  const sortObj = sortBy === 'price-low' ? { price: 1 } : sortBy === 'price-high' ? { price: -1 } : { createdAt: -1 };

  const posts = await Post.find(query)
    .populate('author', 'username avatar firstName lastName rating reviewsCount')
    .sort(sortObj)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Post.countDocuments(query);

  res.json({
    success: true,
    posts,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    }
  });
}));

// Get single post
router.get('/:id', optional, asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $inc: { views: 1 } },
    { new: true }
  ).populate('author', 'username avatar firstName lastName email phone rating reviewsCount bio');

  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }

  res.json({ success: true, post });
}));

// Create post (protected)
router.post('/', protect, asyncHandler(async (req, res) => {
  const { title, description, category, subCategory, price, currency, location, district, condition, tags } = req.body;

  if (!title || !description || !category || !price || !location) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const user = await User.findById(req.user.id);

  const post = new Post({
    title,
    description,
    category,
    subCategory,
    price,
    currency,
    location,
    district,
    condition,
    tags: tags?.split(',') || [],
    author: req.user.id,
    authorName: `${user.firstName} ${user.lastName}`,
    authorPhone: user.phone
  });

  await post.save();
  user.postsCount += 1;
  await user.save();

  res.status(201).json({
    success: true,
    message: 'Post created successfully!',
    post
  });
}));

// Update post (protected)
router.put('/:id', protect, asyncHandler(async (req, res) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }

  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Not authorized' });
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

  res.json({
    success: true,
    message: 'Post updated successfully!',
    post
  });
}));

// Delete post (protected)
router.delete('/:id', protect, asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }

  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Not authorized' });
  }

  await Post.findByIdAndDelete(req.params.id);

  const user = await User.findById(req.user.id);
  user.postsCount = Math.max(0, user.postsCount - 1);
  await user.save();

  res.json({
    success: true,
    message: 'Post deleted successfully!'
  });
}));

// Get user's posts
router.get('/user/:userId', asyncHandler(async (req, res) => {
  const posts = await Post.find({ author: req.params.userId, status: 'Active' })
    .sort({ createdAt: -1 });

  res.json({ success: true, posts });
}));

// Add to favorites
router.post('/:id/favorite', protect, asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }

  if (post.favorites.includes(req.user.id)) {
    post.favorites = post.favorites.filter(id => id.toString() !== req.user.id);
  } else {
    post.favorites.push(req.user.id);
  }

  await post.save();

  res.json({
    success: true,
    message: post.favorites.includes(req.user.id) ? 'Added to favorites' : 'Removed from favorites',
    isFavorited: post.favorites.includes(req.user.id)
  });
}));

export default router;
