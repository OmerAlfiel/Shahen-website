#!/bin/bash

echo "🚀 Starting Shahen Logistics Manual Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Please run this script from the project root directory${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Pre-deployment checklist:${NC}"
echo "1. ✅ Update environment variables for production"
echo "2. ✅ Test locally first"
echo "3. ✅ Commit and push latest changes"
echo ""

# Ask for deployment platform
echo -e "${YELLOW}🔧 Choose your deployment platform:${NC}"
echo "1. Railway (Recommended)"
echo "2. Vercel + Railway"
echo "3. Render"
echo "4. Manual server deployment"
echo ""
read -p "Enter your choice (1-4): " platform_choice

case $platform_choice in
    1)
        echo -e "${GREEN}🚂 Railway Deployment Selected${NC}"
        echo ""
        echo "📝 Follow these steps:"
        echo "1. Visit https://railway.app and sign up with GitHub"
        echo "2. Click 'New Project' → 'Deploy from GitHub repo'"
        echo "3. Select your Shahen-website repository"
        echo ""
        echo "🗄️ For Backend Service:"
        echo "  - Root Directory: apps/back-end"
        echo "  - Build Command: npm install && npm run build"
        echo "  - Start Command: npm start"
        echo "  - Add PostgreSQL database addon"
        echo ""
        echo "🎨 For Frontend Service:"
        echo "  - Root Directory: apps/front-end"
        echo "  - Build Command: npm install && npm run build"
        echo "  - Start Command: npx serve -s build -l 3000"
        echo ""
        echo "⚙️ Environment Variables to set:"
        echo "Backend:"
        echo "  NODE_ENV=production"
        echo "  FRONTEND_URL=https://your-frontend.railway.app"
        echo "  JWT_SECRET=your-secure-jwt-secret"
        echo "  SESSION_SECRET=your-secure-session-secret"
        echo ""
        echo "Frontend:"
        echo "  REACT_APP_API_BASE_URL=https://your-backend.railway.app/api"
        echo "  NODE_ENV=production"
        ;;
        
    2)
        echo -e "${GREEN}⚡ Vercel + Railway Deployment Selected${NC}"
        echo ""
        echo "🗄️ Step 1 - Deploy Backend to Railway:"
        echo "1. Visit https://railway.app and deploy backend only"
        echo "2. Add PostgreSQL database"
        echo "3. Note your backend URL"
        echo ""
        echo "🎨 Step 2 - Deploy Frontend to Vercel:"
        echo "1. Visit https://vercel.com and sign up with GitHub"
        echo "2. Import project → Select repository"
        echo "3. Configure:"
        echo "   - Framework: Create React App"
        echo "   - Root Directory: apps/front-end"
        echo "   - Build Command: npm run build"
        echo "   - Output Directory: build"
        echo ""
        echo "⚙️ Environment Variables:"
        echo "  REACT_APP_API_BASE_URL=https://your-backend.railway.app/api"
        echo "  NODE_ENV=production"
        ;;
        
    3)
        echo -e "${GREEN}🎭 Render Deployment Selected${NC}"
        echo ""
        echo "📝 Follow these steps:"
        echo "1. Visit https://render.com and sign up"
        echo "2. Create PostgreSQL database first"
        echo ""
        echo "🗄️ Backend Web Service:"
        echo "  - Connect GitHub repo"
        echo "  - Root Directory: apps/back-end"
        echo "  - Build Command: npm install && npm run build"
        echo "  - Start Command: npm start"
        echo "  - Environment: Node.js"
        echo ""
        echo "🎨 Frontend Static Site:"
        echo "  - Connect GitHub repo"
        echo "  - Root Directory: apps/front-end"
        echo "  - Build Command: npm install && npm run build"
        echo "  - Publish Directory: build"
        ;;
        
    4)
        echo -e "${GREEN}🖥️ Manual Server Deployment Selected${NC}"
        echo ""
        echo "📋 Prerequisites on your server:"
        echo "1. Node.js 18+ installed"
        echo "2. PostgreSQL installed and running"
        echo "3. PM2 process manager: npm install -g pm2"
        echo "4. Nginx for reverse proxy"
        echo ""
        echo "🚀 Deployment steps:"
        echo "1. Clone repository on server"
        echo "2. Install dependencies: npm run install:all"
        echo "3. Build backend: cd apps/back-end && npm run build"
        echo "4. Build frontend: cd apps/front-end && npm run build"
        echo "5. Configure environment variables"
        echo "6. Start with PM2: pm2 start ecosystem.config.js"
        echo "7. Configure Nginx reverse proxy"
        echo "8. Set up SSL with Let's Encrypt"
        ;;
        
    *)
        echo -e "${RED}❌ Invalid choice. Please run the script again.${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${YELLOW}🔐 Security Reminders:${NC}"
echo "1. Use strong, unique passwords for database"
echo "2. Set secure JWT and session secrets"
echo "3. Enable HTTPS/SSL certificates"
echo "4. Configure CORS for production domains only"
echo "5. Set NODE_ENV=production"
echo ""

echo -e "${YELLOW}📊 Post-deployment checklist:${NC}"
echo "1. Test all API endpoints"
echo "2. Verify contact form submissions"
echo "3. Check quote request functionality"
echo "4. Test responsive design on mobile"
echo "5. Monitor logs for errors"
echo "6. Set up monitoring/alerts"
echo ""

echo -e "${GREEN}✅ Deployment guide complete!${NC}"
echo -e "${GREEN}🌐 Your Shahen Logistics website will be live soon!${NC}"

# Option to open relevant URLs
read -p "Would you like to open the deployment platform? (y/n): " open_platform

if [ "$open_platform" = "y" ] || [ "$open_platform" = "Y" ]; then
    case $platform_choice in
        1)
            echo "Opening Railway..."
            if command -v xdg-open > /dev/null; then
                xdg-open "https://railway.app"
            elif command -v open > /dev/null; then
                open "https://railway.app"
            else
                echo "Please visit: https://railway.app"
            fi
            ;;
        2)
            echo "Opening Vercel and Railway..."
            if command -v xdg-open > /dev/null; then
                xdg-open "https://vercel.com"
                xdg-open "https://railway.app"
            elif command -v open > /dev/null; then
                open "https://vercel.com"
                open "https://railway.app"
            else
                echo "Please visit: https://vercel.com and https://railway.app"
            fi
            ;;
        3)
            echo "Opening Render..."
            if command -v xdg-open > /dev/null; then
                xdg-open "https://render.com"
            elif command -v open > /dev/null; then
                open "https://render.com"
            else
                echo "Please visit: https://render.com"
            fi
            ;;
    esac
fi