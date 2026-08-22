import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    maxlength: 100
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: 5000
  },
  category: {
    type: String,
    required: true,
    enum: ['Real Estate', 'Vehicles', 'Electronics', 'Furniture', 'Clothing', 'Services', 'Jobs', 'Other']
  },
  subCategory: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  currency: {
    type: String,
    enum: ['MNT', 'USD', 'CNY'],
    default: 'MNT'
  },
  images: [{
    url: String,
    public_id: String
  }],
  location: {
    type: String,
    required: true
  },
  district: String,
  condition: {
    type: String,
    enum: ['New', 'Like New', 'Used', 'Refurbished'],
    default: 'Used'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorName: String,
  authorPhone: String,
  views: {
    type: Number,
    default: 0
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['Active', 'Sold', 'Expired', 'Inactive'],
    default: 'Active'
  },
  featured: {
    type: Boolean,
    default: false
  },
  bump: {
    type: Date,
    default: null
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  }
});

// Index for better search performance
postSchema.index({ title: 'text', description: 'text', tags: 'text' });
postSchema.index({ category: 1, status: 1 });
postSchema.index({ author: 1 });
postSchema.index({ createdAt: -1 });

// Auto-expire posts
postSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Post', postSchema);
