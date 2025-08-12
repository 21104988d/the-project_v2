# 橋接和代幣自動化後端系統

這是一個全自動的後端系統，用於自動發現和添加新的跨鏈橋接協議和代幣支援。

## 🚀 功能特點

### 🌉 橋接協議自動化
- **自動發現**: 從DeFiLlama等數據源自動發現新的橋接協議
- **智能篩選**: 只添加TVL > 1M的高質量橋接協議
- **自動集成**: 自動更新constants.tsx和Icons.tsx文件
- **詳細配置**: 包含網路支援、費用、時間估計等完整信息

### 💰 代幣自動化
- **多源數據**: 從CoinGecko、DeFi協議等多個來源獲取代幣信息
- **市值篩選**: 只添加市值 > 100M的主流代幣
- **分類管理**: 自動分類為DeFi、Layer2、DEX等類別
- **多鏈支援**: 支援Ethereum、BSC、Polygon、Arbitrum等多條鏈

### ⚙️ 自動化調度
- **定時執行**: 橋接協議24小時檢查一次，代幣12小時檢查一次
- **並行處理**: 橋接和代幣自動化可以並行執行
- **錯誤處理**: 完善的錯誤處理和重試機制
- **通知系統**: 支援webhook通知

### 📊 API和監控
- **RESTful API**: 完整的API來控制和監控自動化流程
- **實時日志**: 支援Server-Sent Events的實時日志流
- **報告系統**: 詳細的執行報告和統計信息
- **狀態監控**: 實時監控自動化服務狀態

## 📁 文件結構

```
backend/
├── api.js                    # API服務器和路由
├── automationScheduler.js    # 主要調度器
├── package.json             # 依賴管理
├── config.json              # 配置文件（自動生成）
├── services/
│   ├── bridgeAutomation.js  # 橋接協議自動化服務
│   └── tokenAutomation.js   # 代幣自動化服務
└── reports/                 # 執行報告目錄（自動生成）
```

## 🛠️ 安裝和設置

### 1. 安裝依賴
```bash
cd backend
npm install
```

### 2. 啟動API服務器（推薦）
```bash
npm start
```
這會啟動API服務器在端口3001，並自動開始調度自動化任務。

### 3. 僅啟動調度器
```bash
npm run scheduler
```

### 4. 手動執行自動化
```bash
# 執行橋接協議自動化
npm run bridge-automation

# 執行代幣自動化
npm run token-automation
```

## 🔧 配置

系統會自動生成`config.json`文件，包含以下配置：

```json
{
  "bridgeAutomation": {
    "enabled": true,
    "interval": 86400000,
    "maxNewBridges": 5
  },
  "tokenAutomation": {
    "enabled": true,
    "interval": 43200000,
    "maxNewTokens": 10
  },
  "notifications": {
    "enabled": true,
    "webhook": null
  }
}
```

### 配置說明
- `interval`: 執行間隔（毫秒）
- `maxNewBridges/maxNewTokens`: 單次執行最大新增數量
- `webhook`: 通知webhook URL（可選）

## 🌐 API端點

### 基本信息
- `GET /api/health` - 健康檢查
- `GET /api/automation/status` - 獲取自動化狀態

### 手動控制
- `POST /api/automation/run` - 觸發完整自動化
- `POST /api/automation/bridges/run` - 觸發橋接協議自動化
- `POST /api/automation/tokens/run` - 觸發代幣自動化

### 配置管理
- `PUT /api/automation/config` - 更新配置

### 報告和日志
- `GET /api/automation/reports` - 獲取報告列表
- `GET /api/automation/reports/:filename` - 獲取特定報告
- `GET /api/automation/logs` - 實時日志流（SSE）

## 📊 監控和報告

### 執行報告
每次自動化執行都會生成詳細報告，包含：
- 發現的新橋接/代幣數量
- 成功添加的數量
- 詳細的橋接/代幣信息
- 執行時間戳

### 實時監控
API提供實時狀態監控，包括：
- 下次執行時間
- 服務運行時間
- 當前配置狀態

## 🔍 數據源

### 橋接協議數據源
1. **DeFiLlama Bridges API**: 獲取實時TVL和交易量數據
2. **生態系統掃描**: 手動維護的重要橋接協議列表

### 代幣數據源
1. **CoinGecko API**: 獲取市值排名前100的代幣
2. **DeFi協議**: 重要的DeFi協議代幣
3. **多鏈代幣**: Layer2和各鏈生態重要代幣

## ⚠️ 注意事項

1. **API限制**: 請注意外部API的請求限制
2. **文件備份**: 自動化會修改前端文件，建議定期備份
3. **質量控制**: 系統已內建質量篩選，但建議定期檢查添加的內容
4. **網路要求**: 需要穩定的網路連接來獲取外部數據

## 🚦 啟動順序

1. 確保前端構建完成（`npm run build`）
2. 啟動後端服務（`cd backend && npm start`）
3. 訪問 http://localhost:3001 查看前端界面
4. 訪問 http://localhost:3001/api/health 檢查API狀態

## 🔄 自動化流程

### 橋接協議自動化流程
1. 從多個數據源獲取橋接協議信息
2. 篩選TVL > 1M的協議
3. 檢查是否已存在於系統中
4. 自動生成配置和圖標
5. 更新constants.tsx和Icons.tsx文件
6. 生成執行報告

### 代幣自動化流程
1. 從多個數據源獲取代幣信息
2. 篩選市值 > 100M的代幣
3. 自動分類和網路檢測
4. 檢查是否已存在於系統中
5. 更新constants.tsx文件
6. 生成執行報告

## 🎯 未來規劃

- [ ] 支援更多數據源
- [ ] 機器學習模型來預測潛在的重要橋接/代幣
- [ ] 更智能的質量評估系統
- [ ] 自動化測試和驗證
- [ ] 用戶反饋集成
- [ ] 社區投票機制

這個自動化系統確保您的跨鏈橋聚合器始終保持最新的橋接協議和代幣支援，無需手動維護！
