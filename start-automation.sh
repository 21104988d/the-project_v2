#!/bin/bash

# 橋接和代幣自動化系統啟動腳本

echo "🚀 啟動橋接和代幣自動化系統..."

# 檢查Node.js版本
node_version=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$node_version" -lt 16 ]; then
    echo "❌ 需要Node.js 16或更高版本，當前版本: $(node -v)"
    exit 1
fi

# 檢查是否在正確的目錄
if [ ! -f "package.json" ]; then
    echo "❌ 請在項目根目錄執行此腳本"
    exit 1
fi

echo "📦 安裝前端依賴..."
npm install

echo "🏗️ 構建前端..."
npm run build

echo "📦 安裝後端依賴..."
cd backend
npm install

echo "🌐 啟動後端自動化系統..."
echo "📊 前端界面: http://localhost:3001"
echo "🔧 API端點: http://localhost:3001/api/health"
echo "📝 實時日志: http://localhost:3001/api/automation/logs"
echo ""
echo "⏹️ 按 Ctrl+C 停止服務"
echo ""

# 啟動後端API服務器（包含自動化調度器）
npm start
