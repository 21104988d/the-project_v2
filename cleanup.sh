#!/bin/bash

echo "🧹 Cleaning up unused files and folders..."

# Remove smart contract directories (not needed for aggregator)
echo "Removing smart contract directories..."
rm -rf contracts/
rm -rf scripts/

# Remove unused documentation
echo "Removing unused documentation..."
rm -f technical_paper.md
rm -f VERSION_CHANGELOG.md

# Remove environment template (not needed for frontend-only app)
rm -f .env.example

# Remove any build artifacts
echo "Removing build artifacts..."
rm -rf dist/
rm -rf node_modules/.cache/

# Remove any IDE-specific files
echo "Removing IDE files..."
rm -rf .vscode/
rm -rf .idea/

# Remove any deployment or build scripts that reference contracts
echo "Removing contract-related files..."
rm -f deploy.js
rm -f hardhat.config.js
rm -f truffle-config.js
rm -f foundry.toml
rm -f anchor.toml

# Create directories that are needed
echo "Creating required directories..."
mkdir -p public/icons/
mkdir -p services/
mkdir -p components/

echo "✅ Cleanup completed!"
echo "📁 Current project structure (excluding node_modules and .git):"
find . -type d -not -path './node_modules*' -not -path './.git*' | sort

echo ""
echo "🚀 Next steps:"
echo "1. Run: chmod +x cleanup.sh && ./cleanup.sh"
echo "2. Download icons to public/icons/ (see public/icons/README.md)"
echo "3. Run: npm install"
echo "4. Run: npx vite"
