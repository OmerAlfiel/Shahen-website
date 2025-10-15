# Logistics Website

A full-stack logistics platform built with React (TypeScript) frontend and Node.js/Express backend with PostgreSQL database.

## 🚀 Production Deployment Guide

This guide covers deploying your Logistics website to production using modern hosting platforms.

### Prerequisites

- **Node.js** (version 18 or higher)
- **Git** account with your repository
- **Domain name** (optional but recommended)

---

## 📋 Production Deployment Options

### Option 1: Railway (Recommended - Simple & Free Tier)

**Railway** is perfect for full-stack apps with built-in database support.

#### Step 1: Prepare Your Code

1. **Update Backend Environment** (`apps/back-end/.env.production`):

```env
NODE_ENV=production
PORT=$PORT
FRONTEND_URL=https://your-frontend-url.railway.app
DB_HOST=$PGHOST
DB_PORT=$PGPORT
DB_USERNAME=$PGUSER
DB_PASSWORD=$PGPASSWORD
DB_NAME=$PGDATABASE
DATABASE_URL=$DATABASE_URL
JWT_SECRET=your-very-secure-jwt-secret-at-least-32-characters-long
SESSION_SECRET=your-secure-session-secret-also-very-long
DB_SSL=true
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
LOG_LEVEL=error
```

2. **Update Frontend Environment** (`apps/front-end/.env.production`):

```env
REACT_APP_API_BASE_URL=https://your-backend-url.railway.app/api
REACT_APP_MAPBOX_TOKEN=pk.eyJ1IjoiaXNtYWVpbC1zaGFqYXIiLCJhIjoiY202ODlsdjNtMDl6ZDJqc2RoOGl3eHp6bCJ9.cLGG1N6svL5MVckGUvqcig
NODE_ENV=production
GENERATE_SOURCEMAP=false
```

#### Step 2: Deploy to Railway

1. **Visit [Railway.app](https://railway.app)** and sign up with GitHub
2. **Create New Project** → **Deploy from GitHub repo**
3. **Select your repository**: `Logistics-website`

4. **Deploy Backend**:
   - Click **"+ New"** → **"GitHub Repo"**
   - Select your repo and configure:
     - **Root Directory**: `apps/back-end`
     - **Build Command**: `npm run build`
     - **Start Command**: `npm start`
5. **Add PostgreSQL Database**:

   - In your project dashboard, click **"+ New"** → **"Database"** → **"PostgreSQL"**
   - Railway will automatically provide environment variables

6. **Deploy Frontend**:

   - Click **"+ New"** → **"GitHub Repo"**
   - Select your repo again and configure:
     - **Root Directory**: `apps/front-end`
     - **Build Command**: `npm run build`
     - **Start Command**: `npm start`

7. **Configure Environment Variables**:
   - Go to each service → **Variables** tab
   - Add your production environment variables
   - Update `FRONTEND_URL` and `REACT_APP_API_BASE_URL` with the generated Railway URLs

#### Step 3: Custom Domain (Optional)

- In Railway dashboard → **Settings** → **Domains**
- Add your custom domain
- Update environment variables with your custom URLs

---

### Option 2: Vercel + Railway (Frontend/Backend Split)

**Vercel** for frontend, **Railway** for backend + database.

#### Deploy Backend to Railway:

1. Follow Railway steps above for backend only
2. Note the backend URL (e.g., `https://your-backend.railway.app`)

#### Deploy Frontend to Vercel:

1. **Visit [Vercel.com](https://vercel.com)** and sign up with GitHub
2. **Import Project** → Select your repository
3. **Configure Build**:

   - **Framework Preset**: Create React App
   - **Root Directory**: `apps/front-end`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

4. **Environment Variables**:

   ```env
   REACT_APP_API_BASE_URL=https://your-backend.railway.app/api
   REACT_APP_MAPBOX_TOKEN=pk.eyJ1IjoiaXNtYWVpbC1zaGFqYXIiLCJhIjoiY202ODlsdjNtMDl6ZDJqc2RoOGl3eHp6bCJ9.cLGG1N6svL5MVckGUvqcig
   NODE_ENV=production
   ```

5. **Deploy** and get your Vercel URL
6. **Update Railway backend** `FRONTEND_URL` with your Vercel URL

---

### Option 3: Render (Alternative to Railway)

#### Step 1: Database Setup

1. **Visit [Render.com](https://render.com)** and sign up
2. **Create PostgreSQL Database**:
   - New → **PostgreSQL**
   - Choose free tier
   - Note connection details

#### Step 2: Deploy Backend

1. **New Web Service** → Connect GitHub repo
2. **Configure**:

   - **Root Directory**: `apps/back-end`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node.js

3. **Environment Variables**:
   ```env
   NODE_ENV=production
   DATABASE_URL=[your-render-postgresql-url]
   FRONTEND_URL=https://your-frontend.onrender.com
   JWT_SECRET=your-jwt-secret
   SESSION_SECRET=your-session-secret
   ```

#### Step 3: Deploy Frontend

1. **New Static Site** → Connect GitHub repo
2. **Configure**:

   - **Root Directory**: `apps/front-end`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

3. **Environment Variables**:
   ```env
   REACT_APP_API_BASE_URL=https://your-backend.onrender.com/api
   REACT_APP_MAPBOX_TOKEN=your-mapbox-token
   ```

---

### Option 4: AWS (Advanced - Production Scale)

#### Prerequisites:

- AWS Account
- AWS CLI installed
- Basic AWS knowledge

#### Step 1: Database (AWS RDS)

1. **Create RDS PostgreSQL instance**
2. **Configure security groups** for backend access
3. **Note connection details**

#### Step 2: Backend (AWS Elastic Beanstalk)

1. **Create Elastic Beanstalk application**
2. **Upload backend code** as ZIP
3. **Configure environment variables**
4. **Set up SSL certificate**

#### Step 3: Frontend (AWS S3 + CloudFront)

1. **Build frontend**: `npm run build`
2. **Upload to S3 bucket**
3. **Configure CloudFront distribution**
4. **Set up custom domain**

---

## 🔧 Pre-Deployment Checklist

### 1. **Environment Variables**

- [ ] Update all production URLs
- [ ] Set secure JWT secrets
- [ ] Configure database connections
- [ ] Add Mapbox token

### 2. **Security Updates**

- [ ] Enable CORS for production domains only
- [ ] Set `NODE_ENV=production`
- [ ] Disable source maps (`GENERATE_SOURCEMAP=false`)
- [ ] Use SSL/HTTPS everywhere

### 3. **Performance Optimizations**

- [ ] Enable gzip compression
- [ ] Optimize images and assets
- [ ] Set up CDN (optional)
- [ ] Configure caching headers

### 4. **Testing**

- [ ] Test all API endpoints
- [ ] Verify form submissions
- [ ] Check responsive design
- [ ] Test contact and quote forms

---

## 📊 Monitoring & Maintenance

### Health Checks

Your backend includes a health endpoint: `GET /api/health`

### Logging

- Check platform logs (Railway/Vercel/Render dashboard)
- Monitor error rates and response times
- Set up alerts for critical issues

### Database Backup

- **Railway**: Automatic backups included
- **Render**: Manual backup via dashboard
- **AWS**: Configure automated RDS backups

---

## 🌐 Custom Domain Setup

### 1. **Purchase Domain** (Namecheap, GoDaddy, etc.)

### 2. **Configure DNS**:

```
Type: CNAME
Name: www
Value: your-app.railway.app (or platform URL)

Type: A
Name: @
Value: [Platform IP or use CNAME to www]
```

### 3. **Add to Platform**:

- **Railway**: Settings → Domains → Add Custom Domain
- **Vercel**: Project Settings → Domains
- **Render**: Settings → Custom Domains

### 4. **SSL Certificate**:

Most platforms provide automatic SSL certificates for custom domains.

---

## 🚨 Troubleshooting

### Common Issues:

1. **Build Failures**:

   - Check Node.js version compatibility
   - Verify all dependencies are in `package.json`
   - Check build logs for specific errors

2. **Database Connection**:

   - Verify database URL format
   - Check SSL requirements
   - Ensure firewall allows connections

3. **CORS Errors**:

   - Update `FRONTEND_URL` in backend
   - Check environment variable names
   - Verify URLs match exactly (https vs http)

4. **Environment Variables**:
   - Double-check variable names (case-sensitive)
   - Restart services after changes
   - Use platform-specific variable formats

### Getting Help:

- Check platform documentation
- Use platform support/community forums
- Review deployment logs carefully

---

## 📱 Development vs Production

### Development (Local):

```bash
# Clone repository
git clone <your-repo-url>
cd Logistics-website

# Install dependencies
npm install
cd apps/back-end && npm install
cd ../front-end && npm install

# Set up local environment
cp apps/back-end/.env.example apps/back-end/.env
cp apps/front-end/.env.example apps/front-end/.env

# Start development servers
npm run dev
```

### Production (Live):

- Use the deployment guides above
- Monitor performance and errors
- Set up regular backups
- Configure proper security measures

---

## 🎯 Quick Deployment Summary

**Fastest Option**: Railway

1. Sign up at Railway.app
2. Connect GitHub repository
3. Deploy backend (with PostgreSQL addon)
4. Deploy frontend
5. Configure environment variables
6. Test your live application

**Total Time**: ~15-30 minutes

Your Logistics website will be live and production-ready! 🚀
