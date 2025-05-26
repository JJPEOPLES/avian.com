#!/bin/bash
# Script to set up GitHub repository for Avian OS website

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up GitHub repository for Avian OS website${NC}"
echo

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install git first."
    exit 1
fi

# Check if GitHub CLI is installed
if command -v gh &> /dev/null; then
    USE_GH=true
    echo -e "${GREEN}GitHub CLI detected. We'll use it to create the repository.${NC}"
else
    USE_GH=false
    echo "GitHub CLI not detected. We'll provide manual instructions."
fi

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

# Confirm repository name
read -p "Enter repository name [avian.com]: " REPO_NAME
REPO_NAME=${REPO_NAME:-avian.com}

# Set up git config if needed
if [ -z "$(git config --get user.name)" ]; then
    read -p "Enter your name for git config: " GIT_NAME
    git config user.name "$GIT_NAME"
fi

if [ -z "$(git config --get user.email)" ]; then
    read -p "Enter your email for git config: " GIT_EMAIL
    git config user.email "$GIT_EMAIL"
fi

# Initialize repository if not already done
if [ ! -d ".git" ]; then
    echo -e "${BLUE}Initializing git repository...${NC}"
    git init
    git branch -m main
fi

# Add all files if not already done
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${BLUE}Adding files to repository...${NC}"
    git add .
    git commit -m "Initial commit of Avian OS website"
fi

# Create GitHub repository and push
if [ "$USE_GH" = true ]; then
    echo -e "${BLUE}Creating GitHub repository using GitHub CLI...${NC}"
    gh repo create "$GITHUB_USERNAME/$REPO_NAME" --public --source=. --remote=origin --push
    
    echo -e "${GREEN}Repository created and code pushed successfully!${NC}"
    echo -e "View your repository at: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
else
    echo -e "${BLUE}Manual GitHub repository setup:${NC}"
    echo "1. Go to https://github.com/new"
    echo "2. Create a new repository named: $REPO_NAME"
    echo "3. Make it public"
    echo "4. Do not initialize with README, .gitignore, or license"
    echo "5. Click 'Create repository'"
    echo
    echo "After creating the repository, run these commands:"
    echo -e "${GREEN}git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git${NC}"
    echo -e "${GREEN}git push -u origin main${NC}"
fi

# Netlify setup instructions
echo
echo -e "${BLUE}Netlify Setup Instructions:${NC}"
echo "1. Go to https://app.netlify.com/"
echo "2. Click 'Add new site' > 'Import an existing project'"
echo "3. Select GitHub and authorize Netlify"
echo "4. Select the '$REPO_NAME' repository"
echo "5. Configure build settings (or leave defaults as specified in netlify.toml)"
echo "6. Click 'Deploy site'"
echo
echo -e "${GREEN}Your Avian OS website is now ready to be deployed on Netlify!${NC}"