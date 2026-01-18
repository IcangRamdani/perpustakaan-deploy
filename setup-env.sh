#!/bin/bash
# Script untuk setup Railway environment variables

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}Railway Environment Setup${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

# Ask for inputs
read -p "Enter Railway Backend Service URL (e.g., something.railway.app): " BACKEND_URL
read -p "Enter MySQL Host (dari Railway Connect tab): " DB_HOST
read -p "Enter MySQL User (default: root): " DB_USER
read -sp "Enter MySQL Password: " DB_PASSWORD
echo ""
read -p "Enter MySQL Database Name (default: railway): " DB_NAME
read -sp "Enter JWT Secret (buat random strong password): " JWT_SECRET
echo ""

# Set defaults
DB_USER=${DB_USER:-root}
DB_NAME=${DB_NAME:-railway}
BACKEND_URL=${BACKEND_URL:-your-backend.railway.app}

# Create .env file
cat > .env << EOF
NODE_ENV=production
PORT=3000
DB_HOST=$DB_HOST
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASSWORD
DB_NAME=$DB_NAME
JWT_SECRET=$JWT_SECRET
CORS_ORIGIN=https://$BACKEND_URL
EOF

echo -e "${GREEN}✅ .env file created successfully!${NC}"
echo ""
echo -e "${BLUE}Environment Variables Set:${NC}"
echo "- DB_HOST: $DB_HOST"
echo "- DB_USER: $DB_USER"
echo "- DB_NAME: $DB_NAME"
echo "- BACKEND_URL: https://$BACKEND_URL"
echo ""
echo -e "${BLUE}⚠️  IMPORTANT:${NC}"
echo "- JANGAN commit .env ke GitHub!"
echo "- Set yang sama di Railway dashboard Variables"
echo "- Untuk testing lokal, gunakan .env"
echo "- Untuk production, gunakan Railway Variables"
echo ""
