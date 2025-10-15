# 🚀 Logistics Platform - Production Deployment Guide

This guide provides **complete manual deployment steps** for the Logistics Platform website using modern hosting platforms (no Docker required).

## 📋 Project Overview

- **Frontend**: React.js + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeORM
- **Database**: PostgreSQL
- **Architecture**: Monorepo structure

## 🛠️ Prerequisites

- Node.js 18+ installed locally
- Git installed
- GitHub account with repository
- Domain name (optional but recommended)

## 📁 Project Structure

```
Logistics-website/
├── apps/
│   ├── back-end/          # Express.js API
│   └── front-end/         # React.js Application
├── deployment/
│   └── scripts/
└── DEPLOYMENT.md          # This file
```

---

## 🚀 DEPLOYMENT OPTIONS

### Option 1: Railway (Recommended - Easiest Setup)

**Why Railway?**

- ✅ Free tier with generous limits
- ✅ Built-in PostgreSQL database
- ✅ Automatic deployments from GitHub
- ✅ Simple environment variable management
- ✅ Custom domain support

#### **Complete Railway Deployment Steps**

##### 1. Prepare Your Code

```bash
# Make sure your code is committed and pushed
git add .
git commit -m "Ready for production deployment"
git push origin main
```

##### 2. Create Railway Account & Project

1. Visit [railway.app](https://railway.app)
2. Sign up with your **GitHub account**
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your **"Logistics-website"** repository

##### 3. Deploy PostgreSQL Database

1. In your Railway project dashboard, click **"+ New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway automatically creates database with these variables:
   - `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`
   - `DATABASE_URL`

##### 4. Deploy Backend Service

1. Click **"+ New"** → **"GitHub Repo"**
2. Select your repository again
3. Railway will detect multiple services, select or configure:
   - **Service Name**: `logistics-backend`
   - **Root Directory**: `apps/back-end`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

##### 5. Configure Backend Environment Variables

Go to Backend Service → **Variables** tab, add these:

```env
NODE_ENV=production
PORT=$PORT
FRONTEND_URL=https://your-frontend-name.railway.app
DB_HOST=$PGHOST
DB_PORT=$PGPORT
DB_USERNAME=$PGUSER
DB_PASSWORD=$PGPASSWORD
DB_NAME=$PGDATABASE
DATABASE_URL=$DATABASE_URL
JWT_SECRET=your-very-secure-jwt-secret-at-least-32-characters-long-make-it-random
SESSION_SECRET=your-secure-session-secret-also-very-long-and-random
DB_SSL=true
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
LOG_LEVEL=error
```

##### 6. Deploy Frontend Service

1. Click **"+ New"** → **"GitHub Repo"**
2. Select your repository again
3. Configure:
   - **Service Name**: `logistics-frontend`
   - **Root Directory**: `apps/front-end`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npx serve -s build -l $PORT`

##### 7. Configure Frontend Environment Variables

Go to Frontend Service → **Variables** tab, add these:

```env
REACT_APP_API_BASE_URL=https://your-backend-name.railway.app/api
REACT_APP_MAPBOX_TOKEN=pk.eyJ1IjoiaXNtYWVpbC1zaGFqYXIiLCJhIjoiY202ODlsdjNtMDl6ZDJqc2RoOGl3eHp6bCJ9.cLGG1N6svL5MVckGUvqcig
NODE_ENV=production
GENERATE_SOURCEMAP=false
```

##### 8. Update Cross-Service URLs

1. After both services deploy, note their URLs:
   - Backend: `https://logistics-backend-production-xxx.up.railway.app`
   - Frontend: `https://logistics-frontend-production-xxx.up.railway.app`
2. **Update backend** `FRONTEND_URL` with the frontend URL
3. **Update frontend** `REACT_APP_API_BASE_URL` with backend URL + `/api`
4. **Wait for automatic redeployment**

##### 9. Test Your Deployment

- Visit your frontend URL
- Test contact form submission
- Test quote request functionality
- Check browser console for errors
- Visit `/api/health` endpoint on backend

---

### Option 2: Vercel (Frontend) + Railway (Backend)

**Best for**: Optimal frontend performance with Vercel's global CDN

#### **Step 1: Deploy Backend to Railway**

Follow Railway steps 1-5 above for backend and database only.

#### **Step 2: Deploy Frontend to Vercel**

##### 1. Create Vercel Account

1. Visit [vercel.com](https://vercel.com)
2. Sign up with your **GitHub account**

##### 2. Import Project

1. Click **"New Project"**
2. **"Import Git Repository"**
3. Select your **"Logistics-website"** repository

##### 3. Configure Build Settings

```
Framework Preset: Create React App
Root Directory: apps/front-end
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

##### 4. Add Environment Variables

```env
REACT_APP_API_BASE_URL=https://your-backend.railway.app/api
REACT_APP_MAPBOX_TOKEN=pk.eyJ1IjoiaXNtYWVpbC1zaGFqYXIiLCJhIjoiY202ODlsdjNtMDl6ZDJqc2RoOGl3eHp6bCJ9.cLGG1N6svL5MVckGUvqcig
NODE_ENV=production
GENERATE_SOURCEMAP=false
```

##### 5. Deploy & Update Backend

1. Deploy on Vercel
2. Note your Vercel URL: `https://logistics-website.vercel.app`
3. Update Railway backend `FRONTEND_URL` with your Vercel URL

---

### Option 3: Render (Alternative Full-Stack)

#### **Step 1: Create Database**

1. Visit [render.com](https://render.com) and sign up
2. Click **"New"** → **"PostgreSQL"**
3. Choose **Free tier**
4. Note connection details from dashboard

#### **Step 2: Deploy Backend**

1. Click **"New"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:

   - **Root Directory**: `apps/back-end`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node.js

4. Add environment variables:

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:port/database
FRONTEND_URL=https://your-frontend.onrender.com
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
LOG_LEVEL=error
```

#### **Step 3: Deploy Frontend**

1. Click **"New"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure:

   - **Root Directory**: `apps/front-end`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

4. Add environment variables:

```env
REACT_APP_API_BASE_URL=https://your-backend.onrender.com/api
REACT_APP_MAPBOX_TOKEN=pk.eyJ1IjoiaXNtYWVpbC1zaGFqYXIiLCJhIjoiY202ODlsdjNtMDl6ZDJqc2RoOGl3eHp6bCJ9.cLGG1N6svL5MVckGUvqcig
NODE_ENV=production
```

---

### Option 4: DigitalOcean App Platform

#### **Complete Setup**

1. Visit [DigitalOcean Apps](https://cloud.digitalocean.com/apps)
2. Create account and **"Create App"**
3. Connect GitHub repository
4. Configure **two components**:

**Backend Component:**

```
Type: Web Service
Source Directory: apps/back-end
Build Command: npm install && npm run build
Run Command: npm start
Environment Variables: [same as above options]
```

**Frontend Component:**

```
Type: Static Site
Source Directory: apps/front-end
Build Command: npm install && npm run build
Output Directory: build
Environment Variables: [same as frontend above]
```

5. Add **managed PostgreSQL database**
6. Connect database to backend component

---

## 🔧 PRE-DEPLOYMENT PREPARATION

### **1. Backend Package.json Check**

Ensure `apps/back-end/package.json` has these scripts:

```json
{
	"scripts": {
		"start": "node dist/index.js",
		"build": "tsc",
		"dev": "ts-node-dev --respawn --transpile-only src/index.ts"
	}
}
```

### **2. Frontend Package.json Check**

Ensure `apps/front-end/package.json` has these scripts:

```json
{
	"scripts": {
		"start": "react-scripts start",
		"build": "react-scripts build",
		"test": "react-scripts test"
	}
}
```

### **3. Environment Files Setup**

**Backend** (`apps/back-end/.env.production`):

```env
NODE_ENV=production
PORT=3001
FRONTEND_URL=[will-be-set-during-deployment]
DB_HOST=[will-be-provided-by-platform]
DB_PORT=5432
DB_USERNAME=[will-be-provided-by-platform]
DB_PASSWORD=[will-be-provided-by-platform]
DB_NAME=[will-be-provided-by-platform]
JWT_SECRET=[generate-32-plus-character-secret]
SESSION_SECRET=[generate-32-plus-character-secret]
DB_SSL=true
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
LOG_LEVEL=error
```

**Frontend** (`apps/front-end/.env.production`):

```env
REACT_APP_API_BASE_URL=[will-be-set-during-deployment]
REACT_APP_MAPBOX_TOKEN=pk.eyJ1IjoiaXNtYWVpbC1zaGFqYXIiLCJhIjoiY202ODlsdjNtMDl6ZDJqc2RoOGl3eHp6bCJ9.cLGG1N6svL5MVckGUvqcig
NODE_ENV=production
GENERATE_SOURCEMAP=false
```

---

## 🧪 LOCAL TESTING BEFORE DEPLOYMENT

### **Test Backend**

```bash
cd apps/back-end
npm install
npm run build
npm start
# Should see: "🚀 Server is running on port 3001"
```

### **Test Frontend**

```bash
cd apps/front-end
npm install
npm run build
npx serve -s build -l 3000
# Should open in browser successfully
```

---

## ✅ POST-DEPLOYMENT VERIFICATION

### **1. Health Checks**

- **Backend Health**: `https://your-backend-url/api/health`
  - Should return: `{"status":"OK","message":"Logistics Backend API is running"}`
- **Frontend Load**: `https://your-frontend-url`
  - Should load without console errors

### **2. Functionality Tests**

- [ ] Contact form submission works
- [ ] Quote request form works
- [ ] All pages load correctly
- [ ] Mobile responsive design works
- [ ] Map integration works (if used)

### **3. Performance Checks**

- [ ] Page load time < 3 seconds
- [ ] API response time < 1 second
- [ ] No JavaScript errors in console
- [ ] All images and assets load

---

## 🔐 SECURITY CONFIGURATION

### **Environment Variables Security**

- [ ] Strong JWT secrets (32+ characters)
- [ ] Strong session secrets (32+ characters)
- [ ] Database passwords are secure
- [ ] No secrets in code or Git history

### **Application Security**

- [ ] HTTPS enabled on both services
- [ ] CORS configured for production domains only
- [ ] Rate limiting enabled
- [ ] Security headers configured (helmet.js)

---

## 🌐 CUSTOM DOMAIN SETUP (Optional)

### **1. Purchase Domain**

Recommended registrars:

- Namecheap
- GoDaddy
- Cloudflare
- Google Domains

### **2. Configure DNS**

```
Type: CNAME
Name: www
Value: your-app.railway.app (or platform URL)

Type: A
Name: @
Value: [Check platform documentation for IP]
```

### **3. Add to Platform**

- **Railway**: Settings → Domains → Add Custom Domain
- **Vercel**: Project Settings → Domains
- **Render**: Settings → Custom Domains

---

## 🐛 TROUBLESHOOTING GUIDE

### **Common Issues & Solutions**

#### **Build Failures**

```bash
# Check Node.js version (should be 18+)
node --version

# Clear npm cache
npm cache clean --force

# Check for missing dependencies
npm audit fix
```

#### **Database Connection Issues**

- Verify database URL format
- Check if SSL is required (`DB_SSL=true`)
- Ensure database is running and accessible

#### **CORS Errors**

- Check `FRONTEND_URL` in backend environment
- Verify URLs match exactly (https vs http)
- Ensure no trailing slashes

#### **Environment Variable Issues**

- Variable names are case-sensitive
- Restart services after changes
- Check platform-specific variable formats

### **Debug Commands**

```bash
# Test API endpoint
curl https://your-backend-url/api/health

# Check if frontend build works locally
cd apps/front-end && npm run build

# Verify environment variables are loaded
# Check platform logs/dashboard
```

---

## 📊 MONITORING & MAINTENANCE

### **Application Monitoring**

- **Health Endpoint**: `/api/health` returns app status
- **Error Logging**: Check platform logs for errors
- **Performance**: Monitor response times
- **Database**: Monitor connection pool and queries

### **Backup Strategy**

- **Railway**: Automatic database backups
- **Render**: Configure backup schedule in dashboard
- **Manual**: Set up weekly database dumps

### **Update Process**

1. Test changes locally
2. Push to GitHub main branch
3. Platform auto-deploys from GitHub
4. Verify deployment successful
5. Run post-deployment tests

---

## 🚀 QUICK DEPLOYMENT SUMMARY

### **Fastest Route (Railway):**

1. **Sign up**: [railway.app](https://railway.app) with GitHub
2. **Create project** from your repository
3. **Add PostgreSQL** database
4. **Deploy backend** service (apps/back-end)
5. **Deploy frontend** service (apps/front-end)
6. **Configure environment variables**
7. **Test functionality**

**Total Time**: ~15-30 minutes
**Cost**: Free tier available

---

## 🆘 GETTING HELP

If you encounter issues:

1. **Check this documentation** first
2. **Review platform logs** in dashboard
3. **Test locally** to isolate issues
4. **Verify environment variables** are correct
5. **Check platform status pages** for outages
6. **Use platform support** forums/documentation

---

## 📞 QUICK REFERENCE LINKS

- [Railway Documentation](https://docs.railway.app)
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [DigitalOcean Apps](https://docs.digitalocean.com/products/app-platform)

**Your Logistics Platform website will be live and production-ready! 🎉**

---

### **Need the deployment script?**

Run: `bash deployment/scripts/deploy.sh` for interactive deployment guide

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

Your Logistics Platform website will be live and production-ready! 🎉

---

**Quick Links:**

- [Railway](https://railway.app) - Backend & Database
- [Vercel](https://vercel.com) - Frontend
- [Render](https://render.com) - Alternative full-stack
- [DigitalOcean](https://www.digitalocean.com/products/app-platform) - Alternative platform
