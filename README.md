# SocialSync 🚀

An AI-powered social media management and scheduling platform that helps you compose, schedule, and automate posts across multiple social channels (X/Twitter, LinkedIn, Facebook, Instagram).

---

## ✨ Features

- **🤖 AI Content Composer**: Generate high-engaging posts in custom tones (Professional, Casual, Funny, etc.) using Google Gemini AI.
- **📅 Post Scheduler**: Schedule posts with date, time, and media attachments. Keep track of what is *Upcoming*, *Published*, and *Failed*.
- **🔗 Multiple Account Integration**: Connect and manage multiple social media profiles in isolated, secure workspaces.
- **📊 Real-time Dashboard**: Overview stats of your social presence including scheduled counts, published posts, connected accounts, and a live recent activity feed.
- **🔒 Secure Authentication**: Robust security using JWT stored in HTTP-Only cookies, protecting your session from XSS attacks.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** & **Vite** (TypeScript)
- **TailwindCSS v4** (Modern utilities & styling)
- **Lucide React** (Icon library)
- **Axios** (API requests with credentials enabled)

### Backend
- **Node.js** & **Express** (TypeScript)
- **MongoDB** & **Mongoose** (Database)
- **JWT (JsonWebTokens)** & **Cookie Parser** (Auth session management)
- **Google Gen AI (Gemini SDK)** (Content generation)
- **Cloudinary** (Media storage)

---

## ⚙️ Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/aryan-pratik/Social-Sync.git
cd Social-Sync
```

### 2. Configure Backend Environment Variables
Create a `.env` file inside the `server/` directory:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ZERNIO_API_KEY=your_zernio_api_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 3. Configure Frontend Environment Variables
Create a `.env` file inside the `client/` directory:
```env
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Install Dependencies & Start Services

#### Run Backend Server:
```bash
cd server
npm install
npm run server
```

#### Run Frontend Client:
```bash
cd ../client
npm install
npm run dev
```

---

## 🌐 Production Deployment

### Backend (Render / Railway)
- **Root Directory:** `server`
- **Build Command:** `npm install`
- **Start Command:** `npm run server`
- **Environment Variables:** Copy all variables from your server `.env` file. Ensure `NODE_ENV` is set to `production` and `CLIENT_URL` is set to your live Netlify URL.

### Frontend (Netlify)
- **Base Directory:** `client`
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Environment Variables:** Set `VITE_API_BASE_URL` to your deployed backend URL.

---

## 📄 License
This project is licensed under the MIT License.
