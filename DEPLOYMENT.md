# 🚀 Shahen Logistics - Production Deployment Guide

This guide will walk you through deploying the Shahen Logistics website manually using modern hosting platforms.

## 📋 Project Overview

- **Frontend**: React.js application
- **Backend**: Node.js with TypeScript and Express
- **Database**: PostgreSQL
- **Architecture**: Monorepo structure

## 🛠️ Prerequisites

- Node.js 18+ installed locally
- Git installed
- Accounts on hosting platforms (Railway, Vercel, etc.)
- Domain name (optional but recommended)

## 📁 Project Structure

```
Shahen-website/
├── apps/
│   ├── back-end/          # Express.js API
│   └── front-end/         # React.js Application
├── deployment/
│   └── scripts/
└── DEPLOYMENT.md          # This file
```

## 🚀 Deployment Options

### Option 1: Railway (Recommended for Backend) + Vercel (Frontend)

#### **Step 1: Database Setup on Railway**

1. Go to [Railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Create a new project
4. Add PostgreSQL database:
   - Click "Deploy from template"
   - Search for "PostgreSQL"
   - Click deploy
5. Note down database credentials from Variables tab:
   - `DATABASE_URL`
   - `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`

#### **Step 2: Backend Deployment on Railway**

1. In the same Railway project, click "New Service"
2. Connect your GitHub repository
3. Select the `apps/back-end` directory as root
4. Set environment variables in Railway dashboard:

```env
NODE_ENV=production
PORT=3001
DB_HOST=[from railway db]
DB_PORT=5432
DB_USERNAME=[from railway db]
DB_PASSWORD=[from railway db]
DB_NAME=[from railway db]
FRONTEND_URL=https://yourdomain.vercel.app
JWT_SECRET=your-super-secure-jwt-secret-min-32-chars
SESSION_SECRET=your-super-secure-session-secret
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
LOG_LEVEL=error
```

5. Railway will automatically deploy when you push to main branch
6. Note your backend URL: `https://yourapp-production-xxxx.up.railway.app`

#### **Step 3: Frontend Deployment on Vercel**

1. Go to [Vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Import your repository
4. Set Root Directory to `apps/front-end`
5. Set environment variables:

```env
REACT_APP_API_BASE_URL=https://yourapp-production-xxxx.up.railway.app/api
REACT_APP_MAPBOX_TOKEN=pk.eyJ1IjoiaXNtYWVpbC1zaGFqYXIiLCJhIjoiY202ODlsdjNtMDl6ZDJqc2RoOGl3eHp6bCJ9.cLGG1N6svL5MVckGUvqcig
NODE_ENV=production
GENERATE_SOURCEMAP=false
```

6. Deploy and note your frontend URL: `https://yourapp.vercel.app`

### Option 2: Render (Full Stack)

#### **Step 1: Database Setup**

1. Go to [Render.com](https://render.com)
2. Create PostgreSQL database
3. Note connection details

#### **Step 2: Backend Service**

1. Create new Web Service
2. Connect GitHub repo
3. Set:
   - **Root Directory**: `apps/back-end`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Add environment variables (same as Railway above)

#### **Step 3: Frontend Service**

1. Create new Static Site
2. Connect GitHub repo
3. Set:
   - **Root Directory**: `apps/front-end`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

### Option 3: DigitalOcean App Platform

#### **Step 1: Create App**

1. Go to DigitalOcean Apps
2. Create new app from GitHub
3. Add two components:
   - Web Service (backend): `apps/back-end`
   - Static Site (frontend): `apps/front-end`

#### **Step 2: Database**

1. Add managed PostgreSQL database
2. Connect to backend service

## 🔧 Pre-Deployment Setup

### **1. Update Backend Environment**

Update `apps/back-end/.env.production`:

```env
NODE_ENV=production
PORT=3001
FRONTEND_URL=[your-frontend-url]
DB_HOST=[your-db-host]
DB_PORT=5432
DB_USERNAME=[your-db-user]
DB_PASSWORD=[your-db-password]
DB_NAME=[your-db-name]
JWT_SECRET=[generate-strong-secret]
SESSION_SECRET=[generate-strong-secret]
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
LOG_LEVEL=error
```

### **2. Update Frontend Environment**

Update `apps/front-end/.env.production`:

```env
REACT_APP_API_BASE_URL=[your-backend-url]/api
REACT_APP_MAPBOX_TOKEN=pk.eyJ1IjoiaXNtYWVpbC1zaGFqYXIiLCJhIjoiY202ODlsdjNtMDl6ZDJqc2RoOGl3eHp6bCJ9.cLGG1N6svL5MVckGUvqcig
NODE_ENV=production
GENERATE_SOURCEMAP=false
```

### **3. Ensure Build Scripts**

Verify these scripts exist in `package.json` files:

**Backend** (`apps/back-end/package.json`):

```json
{
	"scripts": {
		"build": "tsc",
		"start": "node dist/index.js",
		"dev": "ts-node-dev --respawn --transpile-only src/index.ts"
	}
}
```

**Frontend** (`apps/front-end/package.json`):

```json
{
	"scripts": {
		"start": "react-scripts start",
		"build": "react-scripts build",
		"test": "react-scripts test"
	}
}
```

## 🔍 Verification Steps

### **1. Test Locally Before Deployment**

```bash
# Test backend
cd apps/back-end
npm install
npm run build
npm start

# Test frontend (in new terminal)
cd apps/front-end
npm install
npm run build
npx serve -s build
```

### **2. Post-Deployment Checks**

1. **Backend Health Check**: Visit `https://your-backend-url/api/health`
2. **Frontend Load**: Visit `https://your-frontend-url`
3. **API Connection**: Check browser console for errors
4. **Database**: Verify data persistence

## 🛡️ Security Checklist

- [ ] Use strong, unique JWT secrets (32+ characters)
- [ ] Enable HTTPS on both frontend and backend
- [ ] Set proper CORS origins
- [ ] Configure rate limiting
- [ ] Use environment variables for all secrets
- [ ] Enable security headers (already configured)

## 🔄 CI/CD Setup (Optional)

### **GitHub Actions for Auto-Deploy**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        uses: railway-deploy@v1
        with:
          railway-token: ${{ secrets.RAILWAY_TOKEN }}
          service: backend

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 📊 Monitoring & Maintenance

### **Logging**

- **Railway**: Built-in logs in dashboard
- **Vercel**: Function logs available in dashboard
- **Render**: Logs in service dashboard

### **Database Backups**

- **Railway**: Automatic backups included
- **Render**: Configure backup schedule
- **DigitalOcean**: Automated backups available

### **Performance Monitoring**

1. Set up error tracking (Sentry)
2. Monitor API response times
3. Check database performance
4. Monitor frontend Core Web Vitals

## 🐛 Troubleshooting

### **Common Issues**

1. **CORS Errors**: Check `FRONTEND_URL` in backend env
2. **API 404**: Verify `REACT_APP_API_BASE_URL` in frontend
3. **Database Connection**: Check database URL format
4. **Build Failures**: Verify all dependencies in package.json

### **Debug Commands**

```bash
# Check backend logs
# (Platform specific - see platform documentation)

# Test API locally
curl https://your-backend-url/api/health

# Check frontend build
cd apps/front-end && npm run build
```

## 🆘 Support

If you encounter issues:

1. Check platform-specific documentation
2. Verify environment variables
3. Check application logs
4. Test locally first
5. Ensure database is accessible

## 📞 Quick Deployment Summary

1. **Choose Platform**: Railway + Vercel (recommended)
2. **Setup Database**: PostgreSQL on chosen platform
3. **Deploy Backend**: Set env vars and deploy
4. **Deploy Frontend**: Set API URL and deploy
5. **Test**: Verify all endpoints work
6. **Domain**: Point custom domain (optional)
7. **Monitor**: Set up logging and monitoring

Your Shahen Logistics website will be live and production-ready! 🎉

---

**Quick Links:**

- [Railway](https://railway.app) - Backend & Database
- [Vercel](https://vercel.com) - Frontend
- [Render](https://render.com) - Alternative full-stack
- [DigitalOcean](https://www.digitalocean.com/products/app-platform) - Alternative platform
