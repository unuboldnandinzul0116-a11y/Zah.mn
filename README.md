# 🚀 ZAH - Modern Classified Ads Platform

A sleek, modern, and user-friendly classified ads platform built for Mongolia. Better than Unegui.mn with smooth UI/UX, fast performance, and seamless functionality.

## ✨ Features

### For Users
✅ **Easy Account Creation** - Register in seconds with email verification  
✅ **Create & Manage Posts** - Post unlimited classified ads with images  
✅ **Advanced Search & Filters** - Find exactly what you're looking for  
✅ **User Profiles** - Build reputation with ratings and reviews  
✅ **Favorite Posts** - Save ads for later viewing  
✅ **Mobile Responsive** - Works perfectly on all devices  
✅ **Smooth UI** - Modern, intuitive interface  
✅ **Real-time Updates** - See new posts instantly  

### For Sellers
✅ **Post Management** - Create, edit, delete your ads anytime  
✅ **Analytics** - Track views and engagement on your posts  
✅ **Featured Listings** - Boost visibility with premium options  
✅ **Auto-expiry** - Posts automatically refresh after 30 days  
✅ **Multiple Categories** - Real Estate, Vehicles, Electronics, etc.  

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Multer** - File uploads
- **Cloudinary** - Image storage

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling (responsive, modern)
- **Vanilla JavaScript** - Interactivity
- **RESTful API** - Communication

## 📋 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Cloudinary account (optional, for image uploads)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/unuboldnandinzul0116-a11y/Zah.mn.git
   cd Zah.mn
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Update .env with your credentials**
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/zah
   JWT_SECRET=your_super_secret_key_here
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

5. **Start MongoDB**
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community

   # Or run locally
   mongod
   ```

6. **Start the server**
   ```bash
   npm start
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

7. **Server will run on** `http://localhost:5000`

### Frontend Setup

1. **Open the frontend**
   - Navigate to `http://localhost:5000` in your browser
   - Or open `public/index.html` directly
   - The frontend communicates with the backend API

## 📚 API Documentation

### Authentication Endpoints

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Posts Endpoints

#### Get All Posts
```
GET /api/posts?category=Real Estate&search=apartment&page=1&limit=20
```

#### Get Single Post
```
GET /api/posts/:id
```

#### Create Post (Protected)
```
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Modern Apartment in Sukhbaatar",
  "description": "Beautiful 2-bedroom apartment...",
  "category": "Real Estate",
  "price": 50000000,
  "currency": "MNT",
  "location": "Ulaanbaatar",
  "condition": "New",
  "tags": "apartment,modern,downtown"
}
```

#### Update Post (Protected)
```
PUT /api/posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "price": 48000000
}
```

#### Delete Post (Protected)
```
DELETE /api/posts/:id
Authorization: Bearer <token>
```

#### Add to Favorites (Protected)
```
POST /api/posts/:id/favorite
Authorization: Bearer <token>
```

### User Endpoints

#### Get User Profile
```
GET /api/users/:userId
```

#### Get Current User Profile (Protected)
```
GET /api/users/me/profile
Authorization: Bearer <token>
```

#### Update Profile (Protected)
```
PUT /api/users/me/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Updated",
  "phone": "+976 88123456",
  "bio": "Buyer and seller",
  "location": "Ulaanbaatar",
  "avatar": "https://..."
}
```

## 🎯 Key Improvements Over Unegui.mn

| Feature | Unegui.mn | ZAH |
|---------|-----------|-----|
| **UI/UX** | Outdated | Modern & Smooth ✨ |
| **Mobile** | Poor | Fully Responsive 📱 |
| **Speed** | Slow | Fast ⚡ |
| **Features** | Basic | Advanced Features 🚀 |
| **Search** | Limited | Advanced Filters 🔍 |
| **User Dashboard** | None | Full Dashboard 📊 |
| **Security** | Basic | JWT + Bcrypt 🔒 |
| **Image Upload** | Limited | Cloudinary Integration 📸 |
| **Auto-expire** | Manual | Automatic 🔄 |
| **Reviews** | Basic | Detailed Ratings ⭐ |

## 📱 Usage Flow

### For Buyers
1. **Visit ZAH** → Browse classifieds smoothly
2. **Search & Filter** → Find exactly what you need
3. **View Posts** → See detailed information + seller rating
4. **Save Favorites** → Keep posts for later
5. **Contact Seller** → Reach out directly (feature coming soon)

### For Sellers
1. **Create Account** → Quick registration
2. **Post Ads** → Add title, description, images, price
3. **Manage Posts** → Edit or delete anytime
4. **Track Views** → See how many viewed your post
5. **Get Reviews** → Build your reputation

## 🔒 Security Features

✅ Password hashing with bcryptjs  
✅ JWT token authentication  
✅ Protected routes (only logged-in users can post)  
✅ User verification  
✅ Input validation  
✅ CORS protection  

## 📦 Database Schema

### User Model
```javascript
{
  username, email, password, firstName, lastName,
  phone, avatar, bio, location,
  postsCount, rating, reviewsCount,
  verified, createdAt, updatedAt
}
```

### Post Model
```javascript
{
  title, description, category, subCategory,
  price, currency, images, location, district,
  condition, author, views, favorites, status,
  featured, bump, tags, createdAt, updatedAt, expiresAt
}
```

## 🚀 Deployment

### Deploy to Heroku
```bash
heroku login
heroku create your-app-name
git push heroku main
```

### Deploy to DigitalOcean/AWS
1. Push to GitHub
2. Connect to your hosting service
3. Set environment variables
4. Deploy!

## 📝 Future Features

🎁 Messaging system between buyers & sellers  
🎁 Payment integration (Xacbank, Khan Bank)  
🎁 Video uploads  
🎁 Seller verification badges  
🎁 Wishlist system  
🎁 Price history  
🎁 Admin dashboard  
🎁 Email notifications  
🎁 SMS alerts  

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create your feature branch
3. Commit changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project

## 👨‍💻 Author

**ZAH Development Team**
- GitHub: [@unuboldnandinzul0116-a11y](https://github.com/unuboldnandinzul0116-a11y)
- Email: hello@zah.mn

## 🎉 Getting Started

```bash
# 1. Clone
git clone https://github.com/unuboldnandinzul0116-a11y/Zah.mn.git

# 2. Install
cd Zah.mn
npm install

# 3. Configure
cp .env.example .env
# Edit .env with your settings

# 4. Run
npm start

# 5. Visit
http://localhost:5000
```

---

**Made with ❤️ for Mongolia | Better than Unegui.mn**
