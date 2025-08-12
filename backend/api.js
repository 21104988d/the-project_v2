const express = require('express');
const cors = require('cors');
const path = require('path');
const AutomationScheduler = require('./automationScheduler');

class AutomationAPI {
  constructor(port = 3001) {
    this.app = express();
    this.port = port;
    this.scheduler = new AutomationScheduler();
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, '../dist')));
  }

  setupRoutes() {
    // 健康檢查
    this.app.get('/api/health', (req, res) => {
      res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      });
    });

    // 獲取自動化狀態
    this.app.get('/api/automation/status', (req, res) => {
      try {
        const status = this.scheduler.getStatus();
        res.json(status);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // 手動觸發橋接協議自動化
    this.app.post('/api/automation/bridges/run', async (req, res) => {
      try {
        await this.scheduler.runBridgeAutomation();
        res.json({ message: '橋接協議自動化已觸發', timestamp: new Date().toISOString() });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // 手動觸發代幣自動化
    this.app.post('/api/automation/tokens/run', async (req, res) => {
      try {
        await this.scheduler.runTokenAutomation();
        res.json({ message: '代幣自動化已觸發', timestamp: new Date().toISOString() });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // 手動觸發完整自動化
    this.app.post('/api/automation/run', async (req, res) => {
      try {
        await this.scheduler.runFullAutomation();
        res.json({ message: '完整自動化已觸發', timestamp: new Date().toISOString() });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // 更新配置
    this.app.put('/api/automation/config', async (req, res) => {
      try {
        await this.scheduler.updateConfig(req.body);
        res.json({ message: '配置已更新', timestamp: new Date().toISOString() });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // 獲取報告列表
    this.app.get('/api/automation/reports', async (req, res) => {
      try {
        const fs = require('fs').promises;
        const reportsDir = path.join(__dirname, 'reports');
        
        try {
          const files = await fs.readdir(reportsDir);
          const reports = files
            .filter(f => f.endsWith('.json'))
            .sort((a, b) => b.localeCompare(a)) // 最新的在前
            .slice(0, 50); // 最多返回50個報告
          
          res.json(reports);
        } catch (error) {
          res.json([]); // 如果reports目錄不存在，返回空陣列
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // 獲取特定報告
    this.app.get('/api/automation/reports/:filename', async (req, res) => {
      try {
        const fs = require('fs').promises;
        const filename = req.params.filename;
        const reportPath = path.join(__dirname, 'reports', filename);
        
        const reportContent = await fs.readFile(reportPath, 'utf8');
        const report = JSON.parse(reportContent);
        
        res.json(report);
      } catch (error) {
        if (error.code === 'ENOENT') {
          res.status(404).json({ error: '報告未找到' });
        } else {
          res.status(500).json({ error: error.message });
        }
      }
    });

    // 獲取實時日志
    this.app.get('/api/automation/logs', (req, res) => {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
      });

      // 發送初始連接消息
      res.write(`data: ${JSON.stringify({
        type: 'connection',
        message: '日志流已連接',
        timestamp: new Date().toISOString()
      })}\n\n`);

      // 保存原始的console.log
      const originalLog = console.log;
      
      // 重寫console.log來發送到SSE
      console.log = function(...args) {
        originalLog.apply(console, args);
        res.write(`data: ${JSON.stringify({
          type: 'log',
          message: args.join(' '),
          timestamp: new Date().toISOString()
        })}\n\n`);
      };

      // 當連接關閉時恢復原始console.log
      req.on('close', () => {
        console.log = originalLog;
      });
    });

    // 前端路由（SPA支援）
    this.app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
  }

  start() {
    this.server = this.app.listen(this.port, async () => {
      console.log(`🚀 自動化API服務器啟動在端口 ${this.port}`);
      console.log(`📊 API文檔: http://localhost:${this.port}/api/health`);
      console.log(`🌐 前端界面: http://localhost:${this.port}`);
      
      // 載入配置並啟動調度器
      await this.scheduler.loadConfig();
      this.scheduler.startScheduler();
    });

    return this.server;
  }

  stop() {
    if (this.server) {
      this.server.close();
      console.log('🛑 自動化API服務器已停止');
    }
  }
}

// 如果直接執行此文件，啟動API服務器
if (require.main === module) {
  const api = new AutomationAPI();
  
  // 處理優雅關閉
  process.on('SIGINT', () => {
    console.log('\n🛑 收到關閉信號，正在關閉API服務器...');
    api.stop();
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    console.log('\n🛑 收到終止信號，正在關閉API服務器...');
    api.stop();
    process.exit(0);
  });
  
  api.start();
}

module.exports = AutomationAPI;
