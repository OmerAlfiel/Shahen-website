#!/bin/bash

echo "🚀 Starting Shahen Logistics deployment..."

# Build and deploy
docker-compose -f docker-compose.production.yml down
docker-compose -f docker-compose.production.yml pull
docker-compose -f docker-compose.production.yml build --no-cache
docker-compose -f docker-compose.production.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Check if services are running
if docker-compose -f docker-compose.production.yml ps | grep -q "Up"; then
    echo "✅ Deployment successful!"
    echo "🌐 Frontend: https://yourdomain.com"
    echo "🔌 Backend API: https://api.yourdomain.com"
else
    echo "❌ Deployment failed!"
    docker-compose -f docker-compose.production.yml logs
    exit 1
fi